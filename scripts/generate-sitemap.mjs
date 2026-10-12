#!/usr/bin/env node
/**
 * sitemap.xml generator for peatbid.com
 * Enumerates app/articles/* and writes hierarchical sitemap.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const BASE = 'https://peatbid.com'
const OUT = path.join(ROOT, 'public', 'sitemap.xml')
// ローカル（JST）基準の日付。toISOString()はUTCのため深夜〜朝は前日になる
const TODAY = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)

// ⚠️ lastmod は「そのページの中身が最後に変わった日」（2026-10-12 成長ルーチン）。
//    以前は全URLをビルド日にしていたため、Google が lastmod を当てにせず、
//    新規・更新ページ（ヒカカク受け皿）が「Google が認識していない」まま再クロールされなかった。
//    ページのディレクトリと、そのページが import する @/data の最終コミット日の最大値。未コミットの変更があれば当日。
const FILE_DATES = (() => {
  const m = new Map()
  let date = ''
  const log = execFileSync('git', ['log', '--format=@%cs', '--name-only', '--', 'app', 'data'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 })
  for (const line of log.split('\n')) {
    if (line.startsWith('@')) date = line.slice(1)
    else if (line && !m.has(line)) m.set(line, date)
  }
  const dirty = execFileSync('git', ['status', '--porcelain', '--', 'app', 'data'], { cwd: ROOT, encoding: 'utf8' })
  for (const line of dirty.split('\n')) if (line) m.set(line.slice(3).trim(), TODAY)
  return m
})()

// ディレクトリ → その配下で最も新しい日付（3,000URL分を毎回全走査しないため先に集計）
const DIR_DATES = (() => {
  const m = new Map()
  for (const [f, d] of FILE_DATES) {
    const parts = f.split('/')
    for (let i = 1; i <= parts.length; i++) {
      const k = parts.slice(0, i).join('/')
      if (!m.has(k) || m.get(k) < d) m.set(k, d)
    }
  }
  return m
})()

function dataDeps(pageFile) {
  let src = ''
  try { src = fs.readFileSync(path.join(ROOT, pageFile), 'utf8') } catch { return [] }
  return [...src.matchAll(/from\s+["']@\/data\/([^"']+)["']/g)].map((m) => `data/${m[1]}`)
}

function lastmodOf(dir, pageFile) {
  let best = DIR_DATES.get(dir) || ''
  for (const dep of dataDeps(pageFile)) {
    for (const k of [dep, dep + '.ts', dep + '.json']) {
      const d = DIR_DATES.get(k)
      if (d && d > best) best = d
    }
  }
  return best || TODAY
}

// Tier priorities by article slug pattern
function priorityFor(slug) {
  // Hub articles
  if (slug === 'whisky-kaitori-souba') return '0.9'
  if (slug === 'whisky-takaku-uru') return '0.9'
  if (['yamazaki-kaitori', 'hibiki-kaitori', 'hakushu-kaitori', 'macallan-kaitori'].includes(slug)) return '0.9'

  // brand-souba pages (brand-kaitori basic profile)
  if (slug.endsWith('-kaitori')) {
    if (slug.match(/^(yamazaki|hibiki|hakushu)-(18|25|55|30)-kaitori$/)) return '0.9'  // top-tier brand variants
    if (slug.match(/^(macallan)-(25|30|fine-rare)-kaitori$/)) return '0.9'
    if (slug.match(/^(karuizawa|hanyu|ichirosu-card|chichibu)/)) return '0.9'  // ultra rare
    return '0.7'
  }

  // angle pages
  if (slug.includes('-takaku-uru')) return '0.7'
  if (slug.includes('-ranking')) return '0.7'
  if (slug.includes('-nisemono-mikata')) return '0.6'
  if (slug.includes('-rekishi')) return '0.6'
  if (slug.includes('-kihaku')) return '0.6'
  if (slug.includes('-auction-suii')) return '0.6'
  if (slug.includes('-kaifu-zumi')) return '0.5'
  if (slug.includes('-hako-nashi')) return '0.5'
  if (slug.includes('-label-yogore')) return '0.5'

  return '0.5'
}

function changefreqFor(priority) {
  const p = parseFloat(priority)
  if (p >= 0.9) return 'weekly'
  if (p >= 0.7) return 'weekly'
  if (p >= 0.5) return 'monthly'
  return 'monthly'
}

// /souba-report/ の lastmod はデータ内の最新週（data/souba-report.json の updated）
function soubaReportLastmod() {
  try {
    const d = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'souba-report.json'), 'utf-8'))
    if (typeof d.updated === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d.updated)) return d.updated
  } catch { /* fall through */ }
  return TODAY
}

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/articles/', priority: '0.9', changefreq: 'weekly' },
  { path: '/tier2/', priority: '0.8', changefreq: 'weekly' },
  { path: '/souba-ranking/', priority: '0.8', changefreq: 'weekly' },
  { path: '/souba-index/', priority: '0.8', changefreq: 'weekly' },
  { path: '/souba-hakusho/', priority: '0.8', changefreq: 'weekly' },
  { path: '/souba-report/', priority: '0.8', changefreq: 'weekly', lastmod: soubaReportLastmod() },
  { path: '/faq/', priority: '0.7', changefreq: 'monthly' },
  { path: '/editorial/', priority: '0.6', changefreq: 'monthly' },
  { path: '/methodology/', priority: '0.6', changefreq: 'monthly' },
  { path: '/author/', priority: '0.5', changefreq: 'monthly' },
  { path: '/content-policy/', priority: '0.5', changefreq: 'monthly' },
  { path: '/track-record/', priority: '0.5', changefreq: 'monthly' },
  { path: '/about/', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.4', changefreq: 'monthly' },
  { path: '/privacy-policy/', priority: '0.3', changefreq: 'monthly' },
  { path: '/terms-of-service/', priority: '0.3', changefreq: 'monthly' },
]

function articleSlugs() {
  const dir = path.join(ROOT, 'app', 'articles')
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('_') && !e.name.startsWith('['))
    .map((e) => e.name)
    .sort()
}

function tier2Pages() {
  const dir = path.join(ROOT, 'app', 'tier2')
  if (!fs.existsSync(dir)) return { hubs: [], details: [] }
  const hubs = []
  const details = []
  for (const pref of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!pref.isDirectory()) continue
    hubs.push(pref.name)
    const prefDir = path.join(dir, pref.name)
    for (const brand of fs.readdirSync(prefDir, { withFileTypes: true })) {
      if (!brand.isDirectory()) continue
      details.push(`${pref.name}/${brand.name}`)
    }
  }
  return { hubs: hubs.sort(), details: details.sort() }
}

function build() {
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']

  const articles = articleSlugs()
  const articleDates = new Map(articles.map((slug) => [slug, lastmodOf(`app/articles/${slug}`, `app/articles/${slug}/page.tsx`)]))
  // TOP と記事一覧は記事のリストを載せるので、いちばん新しい記事の日付
  const newestArticle = [...articleDates.values()].sort().at(-1) || TODAY

  for (const p of STATIC_PAGES) {
    const isTop = p.path === '/'
    const dir = isTop ? 'app/page.tsx' : `app${p.path.replace(/\/$/, '')}`
    const own = isTop ? lastmodOf(dir, dir) : lastmodOf(dir, `${dir}/page.tsx`)
    const lastmod = p.lastmod || ((isTop || p.path === '/articles/') && newestArticle > own ? newestArticle : own)
    lines.push(`  <url><loc>${BASE}${p.path}</loc><lastmod>${lastmod}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`)
  }

  for (const slug of articles) {
    const p = priorityFor(slug)
    const cf = changefreqFor(p)
    lines.push(`  <url><loc>${BASE}/articles/${slug}/</loc><lastmod>${articleDates.get(slug)}</lastmod><changefreq>${cf}</changefreq><priority>${p}</priority></url>`)
  }

  // tier2 は noindex のため、sitemap には掲載しない（Google公式推奨）。
  // tier2 は robots index:true（インデックス対象）のため既定で sitemap に含める。
  // 除外したい場合のみ INCLUDE_TIER2=0 を指定。INCLUDE_TIER2_PHASE1=1 で Phase1 のみ。
  const INCLUDE_TIER2 = process.env.INCLUDE_TIER2 !== '0'
  const INCLUDE_TIER2_PHASE1 = process.env.INCLUDE_TIER2_PHASE1 === '1'
  const tier2 = INCLUDE_TIER2 ? tier2Pages() : { hubs: [], details: [] }
  if (INCLUDE_TIER2) {
    for (const pref of tier2.hubs) {
      lines.push(`  <url><loc>${BASE}/tier2/${pref}/</loc><lastmod>${lastmodOf(`app/tier2/${pref}`, `app/tier2/${pref}/page.tsx`)}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`)
    }
    for (const slug of tier2.details) {
      lines.push(`  <url><loc>${BASE}/tier2/${slug}/</loc><lastmod>${lastmodOf(`app/tier2/${slug}`, `app/tier2/${slug}/page.tsx`)}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`)
    }
  }
  // Plan C Phase1: TOP3銘柄 × 主要10都道府県 = 30URL（noindex 解除済の段階公開対象）
  let phase1Count = 0
  if (!INCLUDE_TIER2 && INCLUDE_TIER2_PHASE1) {
    const phase1Path = path.join(ROOT, 'data', 'tier2-phase1.json')
    if (fs.existsSync(phase1Path)) {
      const phase1 = JSON.parse(fs.readFileSync(phase1Path, 'utf-8'))
      const urls = phase1.urls || []
      for (const rel of urls) {
        lines.push(`  <url><loc>${BASE}/${rel}/</loc><lastmod>${TODAY}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>`)
      }
      phase1Count = urls.length
    }
  }

  lines.push('</urlset>', '')
  const tier2Count = tier2.hubs.length + tier2.details.length + phase1Count
  return { xml: lines.join('\n'), total: STATIC_PAGES.length + articles.length + tier2Count, articles: articles.length, tier2: tier2Count, tier2Hubs: tier2.hubs.length, tier2Details: tier2.details.length, includeTier2: INCLUDE_TIER2 }
}

const result = build()
fs.writeFileSync(OUT, result.xml)
console.log(`✓ Wrote ${OUT}`)
if (result.includeTier2) {
  console.log(`  ${result.total} URLs (${STATIC_PAGES.length} static + ${result.articles} articles + ${result.tier2} tier2 [${result.tier2Hubs} hubs + ${result.tier2Details} details])`)
} else {
  console.log(`  ${result.total} URLs (${STATIC_PAGES.length} static + ${result.articles} articles) — tier2 除外中（INCLUDE_TIER2=0 指定時）。`)
}
