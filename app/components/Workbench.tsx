"use client";
import { useEffect, useState } from "react";
import { ArrowRight, FileCheck2, Route } from "lucide-react";
import { scenario } from "../data/scenario";
import { PromptComposer } from "./PromptComposer";
import { type NavKey, type Persona } from "../data/personas";
import { ClaireRequests } from "./ClaireRequests";
import { ClaireLearning } from "./ClaireLearning";
import { ClaireHelp } from "./ClaireHelp";
import { RaduOperations } from "./RaduOperations";
import { RaduReadiness } from "./RaduReadiness";
import { RaduHelp } from "./RaduHelp";
import { AmeliePlans } from "./AmeliePlans";
import { AmelieCapacity } from "./AmelieCapacity";
import { AmelieHelp } from "./AmelieHelp";
import { ElenaControls } from "./ElenaControls";
import { ElenaHealth } from "./ElenaHealth";
import { ElenaHelp } from "./ElenaHelp";
import { AlertCard, AssistantAvatar, ConversationHeader, ConversationThread, UserMessage, VerificationCard } from "./ConversationThread";
import { NewChatLanding } from "./NewChatLanding";
import { getConversationScenario, type ConversationResource } from "../data/conversations";
import { ActivityChart } from "./ActivityChart";

export type Stage = 1|2|3|4|5|6|7|8|9|10|11|12|13;
type Props={stage:Stage;setStage:(stage:Stage)=>void;section:NavKey;persona:Persona;switchPersona:(id:Persona["id"],keepConversation?:boolean)=>void;mode:"home"|"new"|"chat"|"demo";conversationPrompt:string;onStartChat:(prompt:string)=>void;onStartDemo:()=>void;onOpenResource:(resource:ConversationResource)=>void};
function timeGreeting(name:string){const hour=new Date().getHours();const greeting=hour<12?"Good morning":hour<18?"Good afternoon":"Good evening";return `${greeting}, ${name.split(" ")[0]}.`;}
function HomeGreeting({name}:{name:string}){const [greeting]=useState(()=>timeGreeting(name));return <h1 suppressHydrationWarning className="text-3xl font-bold tracking-tight md:text-4xl">{greeting}</h1>}
type GuidedTurn={persona:string;initials:string;user:string;assistant:string;question?:string;action?:string;nextPersona?:Persona["id"]};
const guidedTurns:GuidedTurn[]=[
  {persona:"Claire",initials:"C",user:"I have 12 new managers in Paris who need New Manager Foundations before 30 September. We prefer a classroom session and Victor Laurent if available.",assistant:"I’ve captured the cohort, deadline and preferences. I’ll ask Training Coordination to validate a feasible session before anyone is registered.",question:"Would you like me to prepare the proposed plan?",action:"Prepare the plan",nextPersona:"amelie"},
  {persona:"Amélie",initials:"AM",user:"Please prepare a compliant plan for Claire’s cohort.",assistant:"I found a viable classroom session: Friday, 18 September in Paris, with Victor Laurent and 16 available seats. The plan meets the requested deadline.",question:"Do you approve this session plan for Learning Operations?",action:"Approve the session plan",nextPersona:"radu"},
  {persona:"Radu",initials:"R",user:"Please check the 12 people against the approved session.",assistant:"The checks are complete. Ten people meet eligibility and availability requirements. Priya has a calendar conflict and Thomas starts after the session date.",question:"Shall I ask Claire to decide the two business trade-offs?",action:"Ask Claire to decide",nextPersona:"claire"},
  {persona:"Claire",initials:"C",user:"Show me the choices for Priya and Thomas.",assistant:"Priya can attend the comparable 22 September session. Thomas’s earliest suitable option is 9 October, after the deadline. I recommend confirming 10 people on 18 September, Priya on 22 September, and keeping Thomas as a follow-up.",question:"Does that plan meet your team’s need?",action:"Confirm the 11-person plan",nextPersona:"radu"},
  {persona:"Radu",initials:"R",user:"Proceed with the 11-person plan and keep Thomas open.",assistant:"I have prepared 11 registrations and 11 invitations. No records or communications have been created yet; approval is required before the simulated action runs.",question:"Do you approve the registrations and invitations?",action:"Approve and publish",nextPersona:"radu"},
  {persona:"Radu",initials:"R",user:"Approve and publish the prepared work.",assistant:"Completed in this prototype: 11 registrations and 11 invitations are recorded as confirmed. Thomas remains a follow-up for Claire. The decision and rule evidence are retained.",question:"Would you like Elena’s weekly invitation control to review the outcome?",action:"Open the control review",nextPersona:"elena"},
  {persona:"Elena",initials:"E",user:"Review the invitation control for this cohort.",assistant:"INV-04 found one confirmed registration without a current invitation after a session change. The registration is correct; one contained invitation remediation is ready.",question:"Do you approve sending the replacement invitation and re-checking the control?",action:"Approve remediation",nextPersona:"elena"},
  {persona:"Elena",initials:"E",user:"Approve the remediation.",assistant:"The replacement invitation is recorded as delivered in this prototype and INV-04 now passes. The original evidence and the remediation decision remain in the audit history."}
];
type GuidedReply={afterStage:number;text:string};
const handoffNames:Record<Persona["id"],string>={radu:"Radu",amelie:"Amélie",claire:"Claire",elena:"Elena"};
const guidedMeta:Record<number,{title:string;meta:string;verification?:{id:string;detail:string;badge:string};alert?:{title:string;detail:string}}>={
  1:{title:"New manager learning request",meta:"12 hires · Paris classroom · before 30 September",verification:{id:"REQ-NMF-042",detail:"Cohort, deadline and classroom preference captured for New Manager Foundations.",badge:"Need captured"},alert:{title:"Business decisions only",detail:"Claire owns the cohort and acceptable trade-offs. Planning and registration stay with Amélie and Radu."}},
  2:{title:"Paris new-manager programme",meta:"12 learners · classroom · before 30 September",verification:{id:scenario.sessionRef,detail:`${scenario.mainDate} · ${scenario.location} · ${scenario.trainer}`,badge:"Plan verified"},alert:{title:"Registration not started",detail:"Approving the plan creates Radu’s work package only. No invitations are sent yet."}},
  3:{title:"Registration check · Paris",meta:"12 requested · 10 ready · 2 need a decision",verification:{id:scenario.sessionRef,detail:"10 people meet eligibility and availability. Capacity remains available.",badge:"Session verified"},alert:{title:"Two registration exceptions",detail:"Priya has a calendar conflict and Thomas starts after the session date."}},
  4:{title:"Business trade-off",meta:"10 ready · Priya alternative · Thomas follow-up",verification:{id:"NMF-042",detail:"Recommended outcome keeps 11 managers on a learning route before escalation.",badge:"Plan ready"},alert:{title:"Deadline trade-off",detail:"Thomas’s earliest option is 9 October, after Claire’s requested deadline."}},
  5:{title:"Approve and publish",meta:"11 registrations · 11 invitations · 1 follow-up",verification:{id:"ML-REG-DRAFT",detail:"11 registrations and invitations are prepared. Nothing is written until Radu approves.",badge:"Draft ready"},alert:{title:"Human approval boundary",detail:"Publishing will create the simulated MyLearning and Outlook actions and retain the audit trail."}},
  6:{title:"Completion and proof",meta:"11 confirmed · 1 follow-up · evidence retained",verification:{id:"OUT-INV-3021",detail:"11 registrations confirmed and 11 invitations recorded as sent in this prototype.",badge:"Published"},alert:{title:"Open follow-up",detail:"Thomas remains awaiting Claire’s later-session decision."}},
  7:{title:"Weekly invitation controls",meta:"INV-04 · 1 participant · remediation pending",verification:{id:"INV-04",detail:"One confirmed registration has no matching current Outlook invitation.",badge:"Control matched"},alert:{title:"Remediation requires approval",detail:"Elena must approve the contained invitation repair before anything is sent."}},
  8:{title:"Control complete",meta:"Invitation delivered · INV-04 passed",verification:{id:"INV-04",detail:"Replacement invitation delivered and the control re-check now passes.",badge:"Passed"},alert:{title:"Audit preserved",detail:"Detection, decision, action and re-check remain in the append-only evidence history."}},
};
function GuidedConversation({stage,replies,onAdvance,switchPersona,onOpenResource}:{stage:Stage;replies:GuidedReply[];onAdvance:()=>void;switchPersona:(id:Persona["id"],keepConversation?:boolean)=>void;onOpenResource:(resource:ConversationResource)=>void}){
  const turn=guidedTurns[Math.min(stage-1,guidedTurns.length-1)];
  const personaId=turn.nextPersona===undefined?"elena":stage===1?"claire":stage===2?"amelie":stage===3||stage===5||stage===6?"radu":stage===4?"claire":"elena";
  const resource=getConversationScenario(personaId).resources[0];
  const prior=getConversationScenario(personaId).priorTurns;
  const repliesForTurn=replies.filter(reply=>reply.afterStage===stage);
  const nextName=turn.nextPersona?handoffNames[turn.nextPersona]:null;
  const meta=guidedMeta[Math.min(stage,8)] ?? guidedMeta[1];
  return <div className="flex w-full flex-col">
    <ConversationHeader title={meta.title} meta={meta.meta} onOpenEvidence={()=>onOpenResource(resource)}/>
    <div className="w-full space-y-6 px-5 py-6 md:px-8">
      {prior.map((item,index)=>item.role==="user"
        ? <UserMessage key={`${item.stamp}-${index}`} text={item.text} initials={turn.initials} stamp={item.stamp}/>
        : <div key={`${item.stamp}-${index}`} className="flex items-start gap-3"><AssistantAvatar/><div className="min-w-0 max-w-4xl flex-1"><p className="text-xs font-bold uppercase tracking-[.12em] text-zinc-400">Assistant</p><p className="mt-2 text-[15px] leading-7 text-zinc-800">{item.text}</p><p className="mt-2 text-[11px] font-semibold text-zinc-400">{item.stamp}</p></div></div>)}
      <UserMessage text={turn.user} initials={turn.initials} stamp={`${turn.persona} · just now`}/>
      <div className="flex items-start gap-3">
        <AssistantAvatar/>
        <div className="min-w-0 max-w-4xl flex-1 space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.12em] text-zinc-400">Assistant</p>
            <p className="mt-2 text-[15px] leading-7 text-zinc-800">{turn.assistant}</p>
          </div>
          {meta.verification&&<VerificationCard id={meta.verification.id} detail={meta.verification.detail} badge={meta.verification.badge}/>}
          {meta.alert&&<AlertCard title={meta.alert.title} detail={meta.alert.detail}/>}
          <div className="flex flex-wrap gap-2.5">
            {turn.action&&<button onClick={()=>{if(turn.nextPersona)switchPersona(turn.nextPersona,true);onAdvance();}} className="inline-flex items-center gap-2 rounded-lg bg-[var(--sg-red)] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#c70419]">{turn.action}<ArrowRight size={15}/></button>}
            <button onClick={()=>onOpenResource(resource)} className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-bold text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"><FileCheck2 size={15} className="text-[var(--sg-red)]"/>Open source evidence</button>
          </div>
          {turn.question&&<p className="text-sm font-semibold text-zinc-700">{turn.question}{nextName?` On confirmation, this hands to ${nextName}.`:""}</p>}
        </div>
      </div>
      {repliesForTurn.map((reply,index)=><div key={`${reply.text}-${index}`} className="space-y-4">
        <UserMessage text={reply.text} initials={turn.initials} stamp={`${turn.persona} · just now`}/>
        <div className="flex items-start gap-3"><AssistantAvatar/><div className="min-w-0 max-w-4xl flex-1"><p className="text-xs font-bold uppercase tracking-[.12em] text-zinc-400">Assistant</p><p className="mt-2 text-[15px] leading-7 text-zinc-800">Thanks — I’ve noted that in this request. You can continue with the decision when you’re ready.</p></div></div>
      </div>)}
    </div>
  </div>;
}

function PersonaHelp({ persona, onAskAssistant }: { persona: Persona; onAskAssistant: (prompt: string) => void }) {
  if (persona.id === "radu") return <RaduHelp onAskAssistant={onAskAssistant} />;
  if (persona.id === "amelie") return <AmelieHelp onAskAssistant={onAskAssistant} />;
  if (persona.id === "elena") return <ElenaHelp onAskAssistant={onAskAssistant} />;
  return <ClaireHelp onAskAssistant={onAskAssistant} />;
}

export function Workbench({stage,setStage,section,persona,switchPersona,mode,conversationPrompt,onStartChat,onStartDemo,onOpenResource}:Props){
  const [demoReplies,setDemoReplies]=useState<GuidedReply[]>([]);
  useEffect(()=>{if(mode!=="demo")setDemoReplies([])},[mode]);
  useEffect(()=>{document.querySelector<HTMLElement>(".workspace-scroll")?.scrollTo({top:0,behavior:"smooth"})},[stage,persona.id,section]);
  const advanceDemo=()=>setStage(Math.min(stage+1,guidedTurns.length) as Stage);
  function shell(content:React.ReactNode,showComposer=false,fullWidth=false){const conversationShell=mode==="chat"||mode==="demo"||fullWidth;return <div className={`${conversationShell?"w-full":"mx-auto max-w-5xl"} pb-[160px]`}>{content}{showComposer ? (<div className="conversation-composer fixed bottom-4 z-30 lg:bottom-5"><PromptComposer onSend={(prompt)=>{if(mode==="demo"){setDemoReplies(replies=>[...replies,{afterStage:stage,text:prompt}]);}else onStartChat(prompt)}} placeholder={mode==="demo"?"Reply to the assistant…":"Ask a follow-up about this request…"}/></div>) : null}</div>}
  if(section==="assistant"&&mode==="home") return <div className="mx-auto max-w-5xl pt-4 md:pt-8"><header className="flex flex-wrap items-start justify-between gap-4"><HomeGreeting name={persona.name}/><button onClick={onStartDemo} className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-bold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50"><Route size={16}/>Open example request</button></header><div className="mt-6"><ActivityChart/></div></div>;
  if(section==="assistant"&&mode==="new") return <NewChatLanding persona={persona} onStartChat={onStartChat} onStartDemo={onStartDemo}/>;
  if(section==="assistant"&&mode==="chat") return shell(<ConversationThread persona={persona} prompt={conversationPrompt} onOpenResource={onOpenResource}/>,true);
  if(mode==="demo") return shell(<GuidedConversation stage={stage} replies={demoReplies} onAdvance={advanceDemo} switchPersona={switchPersona} onOpenResource={onOpenResource}/>,true);
  if(section==="requests") return <ClaireRequests onAskAssistant={onStartChat}/>;
  if(section==="learning") return <ClaireLearning onAskAssistant={onStartChat}/>;
  if(section==="operations") return <RaduOperations onAskAssistant={onStartChat}/>;
  if(section==="readiness") return <RaduReadiness onAskAssistant={onStartChat}/>;
  if(section==="plans") return <AmeliePlans onAskAssistant={onStartChat}/>;
  if(section==="capacity") return <AmelieCapacity onAskAssistant={onStartChat}/>;
  if(section==="controls") return <ElenaControls onAskAssistant={onStartChat}/>;
  if(section==="health") return <ElenaHealth onAskAssistant={onStartChat}/>;
  if(section==="help") return <PersonaHelp persona={persona} onAskAssistant={onStartChat}/>;
  return <div className="mx-auto max-w-5xl pt-4 md:pt-8"><HomeGreeting name={persona.name}/></div>;
}
