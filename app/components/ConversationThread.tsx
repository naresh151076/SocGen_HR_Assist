"use client";
import { FileText, FileCheck2, ShieldCheck } from "lucide-react";
import { getConversationScenario, type ConversationResource } from "../data/conversations";
import type { Persona } from "../data/personas";

export function ConversationThread({persona,prompt,onOpenResource}:{persona:Persona;prompt:string;onOpenResource:(resource:ConversationResource)=>void}){
  const scenario=getConversationScenario(persona.id);
  return <div className="mx-auto max-w-3xl pt-10">
    <div className="rounded-2xl bg-zinc-900 px-5 py-4 text-sm leading-6 text-white">{prompt}</div>
    <article className="mt-5 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-[0_8px_28px_rgba(20,20,20,.035)]">
      <h1 className="text-2xl font-bold">{scenario.title}</h1>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{scenario.response}</p>
      <p className="mt-4 flex items-start gap-2 text-sm font-semibold text-zinc-700"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-emerald-600"/>{scenario.nextStep}</p>
      <div className="mt-5 border-t border-zinc-100 pt-4">
        <p className="text-xs font-bold uppercase tracking-[.14em] text-zinc-500">Supporting material</p>
        <div className="mt-3 grid gap-2">{scenario.resources.map(resource=><button key={resource.id} onClick={()=>onOpenResource(resource)} className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-left transition hover:border-red-200 hover:bg-red-50/40"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-[var(--sg-red)] shadow-sm"><FileText size={18}/></span><span className="min-w-0 flex-1"><span className="block text-sm font-bold">{resource.title}</span><span className="mt-0.5 block text-xs text-zinc-600">{resource.kind} · {resource.summary}</span></span><FileCheck2 size={17} className="shrink-0 text-zinc-400 transition-transform duration-200 ease-out motion-reduce:transition-none group-hover:translate-x-0.5 group-hover:text-[var(--sg-red)]"/></button>)}</div>
      </div>
    </article>
  </div>
}
