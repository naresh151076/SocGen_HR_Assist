"use client";
import { useState } from "react";
import { SideNav } from "./components/SideNav";
import { Workbench } from "./components/Workbench";
export default function Page(){ const [step,setStep]=useState<1|2|3|4|5|6>(1); const [section,setSection]=useState<"assistant"|"operations">("assistant"); const [collapsed,setCollapsed]=useState(false); return <main className="flex min-h-screen"><SideNav collapsed={collapsed} onToggle={()=>setCollapsed(!collapsed)} section={section} onSection={s=>{setSection(s); if(s==="assistant"&&step===6)setStep(1)}}/><div className="min-w-0 flex-1"><div className="mx-auto max-w-[1450px] px-5 py-8 md:px-10 lg:px-14"><Workbench step={step} setStep={setStep} section={section}/></div></div></main> }
