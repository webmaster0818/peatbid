#!/usr/bin/env node
/**
 * sitemap.xml generator for peatbid.com
 * Enumerates app/articles/* and writes hierarchical sitemap.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')
const BASE = 'https://peatbid.com'
const OUT = path.join(ROOT, 'public', 'sitemap.xml')
const TODAY = new Date().toISOString().slice(0, 10)

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

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/faq/', priority: '0.7', changefreq: 'monthly' },
  { path: '/editorial/', priority: '0.6', changefreq: 'monthly' },
  { path: '/methodology/', priority: '0.6', changefreq: 'monthly' },
  { path: '/track-record/', priority: '0.5', changefreq: 'monthly' },
  { path: '/about/', priority: '0.5', changefreq: 'monthly' },
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

  for (const p of STATIC_PAGES) {
    lines.push(`  <url><loc>${BASE}${p.path}</loc><lastmod>${TODAY}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`)
  }

  const articles = articleSlugs()
  for (const slug of articles) {
    const p = priorityFor(slug)
    const cf = changefreqFor(p)
    lines.push(`  <url><loc>${BASE}/articles/${slug}/</loc><lastmod>${TODAY}</lastmod><changefreq>${cf}</changefreq><priority>${p}</priority></url>`)
  }

  // tier2 は noindex のため、sitemap には掲載しない（Google公式推奨）。
  // INCLUDE_TIER2=1 で全 tier2、INCLUDE_TIER2_PHASE1=1 で Phase1 のみ含める。
  const INCLUDE_TIER2 = process.env.INCLUDE_TIER2 === '1'
  const INCLUDE_TIER2_PHASE1 = process.env.INCLUDE_TIER2_PHASE1 === '1'
  const tier2 = INCLUDE_TIER2 ? tier2Pages() : { hubs: [], details: [] }
  if (INCLUDE_TIER2) {
    for (const pref of tier2.hubs) {
      lines.push(`  <url><loc>${BASE}/tier2/${pref}/</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`)
    }
    for (const slug of tier2.details) {
      lines.push(`  <url><loc>${BASE}/tier2/${slug}/</loc><lastmod>${TODAY}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>`)
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
  console.log(`  ${result.total} URLs (${STATIC_PAGES.length} static + ${result.articles} articles) — tier2 除外（noindex対象のため）。含めるには INCLUDE_TIER2=1 を指定。`)
}
