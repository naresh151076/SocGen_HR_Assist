"use client";
import { useState } from "react";
import { ImagePlus, Paperclip, Send, ShieldCheck } from "lucide-react";

export function PromptComposer({ onSend, placeholder = "Describe the learning operation you want to complete…" }: { onSend: (prompt: string) => void; placeholder?: string }) {
  const [prompt, setPrompt] = useState("");
  const submit = () => { if (prompt.trim()) onSend(prompt.trim()); };
  return <div className="rounded-2xl border border-zinc-300 bg-white p-3 shadow-[0_12px_35px_rgba(31,31,31,.06)]">
    <label className="sr-only" htmlFor="operation-prompt">Learning operation request</label>
    <textarea id="operation-prompt" rows={3} value={prompt} onChange={e=>setPrompt(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();submit();}}} placeholder={placeholder} className="w-full resize-none border-0 bg-transparent px-2 py-1 text-base leading-6 outline-none placeholder:text-zinc-400" />
    <div className="flex items-center justify-between gap-3 pt-2">
      <div className="flex items-center gap-1"><button title="Attach a document" aria-label="Attach a document" className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100"><Paperclip size={18}/></button><button title="Add an image" aria-label="Add an image" className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100"><ImagePlus size={18}/></button><span className="ml-1 hidden items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 sm:flex"><ShieldCheck size={13}/> Governed workflow</span></div>
      <button onClick={submit} aria-label="Send request" className="grid h-10 w-10 place-items-center rounded-full bg-[var(--sg-red)] text-white hover:bg-[#c70419]"><Send size={17}/></button>
    </div>
  </div>
}
