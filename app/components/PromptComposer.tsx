"use client";
import { useState } from "react";
import { Mic, Paperclip, Send } from "lucide-react";

export function PromptComposer({ onSend, placeholder = "Describe the learning operation you want to complete…" }: { onSend: (prompt: string) => void; placeholder?: string }) {
  const [prompt, setPrompt] = useState("");
  const submit = () => { const value = prompt.trim(); if (value) { onSend(value); setPrompt(""); } };
  return (
    <div className="prompt-composer rounded-2xl border border-zinc-300 bg-white px-3 py-2.5 shadow-[0_12px_35px_rgba(31,31,31,.06)]">
      <div className="flex items-end gap-2">
        <button title="Attach a document" aria-label="Attach a document" className="mb-1 rounded-lg p-2 text-zinc-500 hover:bg-zinc-100"><Paperclip size={18} /></button>
        <label className="sr-only" htmlFor="operation-prompt">Learning operation request</label>
        <textarea
          id="operation-prompt"
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
          placeholder={placeholder}
          className="min-h-[44px] w-full resize-none border-0 bg-transparent py-2.5 text-[15px] leading-6 outline-none placeholder:text-zinc-400"
        />
        <button title="Voice input" aria-label="Voice input" className="mb-1 rounded-lg p-2 text-zinc-500 hover:bg-zinc-100"><Mic size={18} /></button>
        <button onClick={submit} aria-label="Send request" className="mb-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--sg-red)] text-white hover:bg-[#c70419]"><Send size={16} /></button>
      </div>
    </div>
  );
}
