"use client";
import { useState } from "react";
import { PanelRightOpen } from "lucide-react";
import { SideNav } from "./components/SideNav";
import { Workbench } from "./components/Workbench";
import { RightDetails } from "./components/RightDetails";
export default function Page(){ const [step,setStep]=useState<1|2|3|4|5|6>(1); const [section,setSection]=useState<"assistant"|"operations">("assistant"); const [collapsed,setCollapsed]=useState(false); const [detailsOpen,setDetailsOpen]=useState(false); return <main className="flex min-h-screen overflow-hidden"><SideNav collapsed={collapsed} onToggle={()=>setCollapsed(value=>!value)} section={section} onSection={s=>{setSection(s); if(s==="assistant"&&step===6)setStep(1)}}/><div className="min-w-0 flex-1 overflow-y-auto"><div className="mx-auto max-w-[1450px] px-5 py-8 md:px-10 lg:px-14"><div className="mb-3 flex justify-end"><button onClick={()=>setDetailsOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-bold text-zinc-700 hover:bg-zinc-50"><PanelRightOpen size={16}/> Details</button></div><Workbench step={step} setStep={setStep} section={section}/></div></div><RightDetails open={detailsOpen} onClose={()=>setDetailsOpen(false)}/></main> }
