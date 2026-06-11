"use client";

import { useState } from "react";

const TYPES = [
  "広告出稿・タイアップのご相談",
  "相互リンク・記事掲載のご相談",
  "買取業者様の掲載希望",
  "記事内容に関するご指摘",
  "その他",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="bg-cream/40 border border-amber/30 rounded-xl p-8 text-center">
        <p className="font-bold text-lg mb-2">送信が完了しました</p>
        <p className="text-sm text-warm-gray">
          お問い合わせありがとうございます。内容を確認のうえ、通常2〜3営業日以内にメールでご返信いたします。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 not-prose">
      <div>
        <label htmlFor="company" className="block text-sm font-bold mb-1.5">
          会社名・サイト名 <span className="text-warm-gray font-normal">(任意)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          maxLength={100}
          className="w-full border border-amber/40 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-amber-dark"
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-bold mb-1.5">
          お名前 <span className="text-burgundy">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={60}
          className="w-full border border-amber/40 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-amber-dark"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-bold mb-1.5">
          メールアドレス <span className="text-burgundy">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          className="w-full border border-amber/40 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-amber-dark"
        />
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-bold mb-1.5">
          お問い合わせ種別 <span className="text-burgundy">*</span>
        </label>
        <select
          id="type"
          name="type"
          required
          className="w-full border border-amber/40 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-amber-dark"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-bold mb-1.5">
          お問い合わせ内容 <span className="text-burgundy">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={8}
          className="w-full border border-amber/40 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-amber-dark"
        />
      </div>
      {/* honeypot: 人間には見えない。入力されていたらbotとして弾く */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-amber-dark text-cream font-bold rounded-lg px-8 py-3 text-sm hover:bg-burgundy transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "送信中…" : "送信する"}
      </button>
      {status === "error" && (
        <p className="text-sm text-burgundy">
          送信に失敗しました。時間をおいて再度お試しいただくか、しばらく経っても解決しない場合は恐れ入りますが再度ご確認ください。
        </p>
      )}
    </form>
  );
}
