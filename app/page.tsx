"use client";
import { useState, type CSSProperties } from "react";
import { Menu, X } from "lucide-react";
import { SideNav } from "./components/SideNav";
import { Workbench, type Stage } from "./components/Workbench";
import { RightDetails } from "./components/RightDetails";
import { getPersona, type NavKey, type PersonaId } from "./data/personas";
import { getConversationScenario, type ConversationResource } from "./data/conversations";

export default function Page() {
  const [stage, setStage] = useState<Stage>(1);
  const [personaId, setPersonaId] = useState<PersonaId>("claire");
  const [section, setSection] = useState<NavKey>("assistant");
  const [conversationMode, setConversationMode] = useState<"home" | "new" | "chat" | "demo">("home");
  const [conversationPrompt, setConversationPrompt] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ConversationResource | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const persona = getPersona(personaId);
  const hasConversation = section === "assistant" && (conversationMode === "chat" || conversationMode === "demo");
  const isNewChat = section === "assistant" && conversationMode === "new";
  // Full-bleed centre (no outer max-width / page padding) so destination headers align with conversation.
  const fullBleedWorkspace = hasConversation || isNewChat || section === "requests" || section === "learning" || section === "help";

  const openPrimaryEvidence = (id: PersonaId) => {
    const resource = getConversationScenario(id).resources[0] ?? null;
    setSelectedResource(resource);
    setDetailsOpen(Boolean(resource));
  };

  const switchPersona = (id: PersonaId, keepConversation = false) => {
    setPersonaId(id);
    setSection("assistant");
    if (!keepConversation) {
      setConversationMode("home");
      setConversationPrompt("");
      setStage(1);
      setSelectedResource(null);
      setDetailsOpen(false);
    } else {
      openPrimaryEvidence(id);
    }
    setMenuOpen(false);
    setMobileOpen(false);
  };

  const startNewChat = () => {
    setSection("assistant");
    setConversationMode("new");
    setConversationPrompt("");
    setStage(1);
    setSelectedResource(null);
    setDetailsOpen(false);
    setMobileOpen(false);
  };

  const startChat = (prompt: string) => {
    setSection("assistant");
    setConversationMode("chat");
    setConversationPrompt(prompt);
    openPrimaryEvidence(personaId);
    setMobileOpen(false);
  };

  const startDemo = () => {
    setSection("assistant");
    setConversationMode("demo");
    setConversationPrompt("");
    setStage(1);
    openPrimaryEvidence("claire");
    setMobileOpen(false);
  };

  const goHome = () => {
    setSection("assistant");
    setConversationMode("home");
    setConversationPrompt("");
    setStage(1);
    setSelectedResource(null);
    setDetailsOpen(false);
    setMenuOpen(false);
    setMobileOpen(false);
  };

  const renderNav = () => (
    <SideNav
      section={section}
      persona={persona}
      collapsed={collapsed}
      menuOpen={menuOpen}
      onToggle={() => setCollapsed((v) => !v)}
      onMenu={() => setMenuOpen((v) => !v)}
      onPersona={switchPersona}
      onNewChat={startNewChat}
      onHome={goHome}
      onSection={(s) => {
        setSection(s);
        setConversationMode("home");
        setStage(s === "operations" ? 9 : s === "controls" ? 11 : s === "requests" ? 10 : 1);
        setSelectedResource(null);
        setDetailsOpen(false);
        setMobileOpen(false);
      }}
    />
  );

  return (
    <main
      style={{ "--workspace-left": collapsed ? "76px" : "264px", "--workspace-right": detailsOpen ? "400px" : "0px" } as CSSProperties}
      className="flex h-dvh min-h-0 overflow-hidden bg-[var(--canvas)]"
    >
      <div className="hidden h-full min-h-0 md:block">{renderNav()}</div>
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-4 md:hidden">
        <button aria-label="Open navigation" onClick={() => setMobileOpen(true)} className="rounded-lg p-2 hover:bg-zinc-100"><Menu size={20} /></button>
        <button aria-label="Return to landing page" onClick={goHome} className="rounded-lg p-1 hover:bg-zinc-100"><img src="/logo_dark.svg" alt="Société Générale" className="h-6 w-auto" /></button>
      </div>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <button aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="flex-1 bg-black/40" />
          <div className="h-full">
            <button aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="absolute left-[260px] top-3 rounded bg-white p-2 text-zinc-900"><X size={17} /></button>
            {renderNav()}
          </div>
        </div>
      )}
      <div className={`workspace-scroll min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain pt-14 md:pt-0 ${fullBleedWorkspace ? "bg-white" : ""}`}>
        <div className={fullBleedWorkspace ? "min-h-full w-full" : "mx-auto min-h-full max-w-[1600px] px-5 py-6 md:px-10 md:py-8 lg:px-14"}>
          <Workbench
            stage={stage}
            setStage={setStage}
            section={section}
            persona={persona}
            switchPersona={switchPersona}
            mode={conversationMode}
            conversationPrompt={conversationPrompt}
            onStartChat={startChat}
            onStartDemo={startDemo}
            onOpenResource={(resource) => {
              setSelectedResource(resource);
              setDetailsOpen(true);
            }}
          />
        </div>
      </div>
      {hasConversation && <RightDetails open={detailsOpen} resource={selectedResource} onClose={() => setDetailsOpen(false)} />}
    </main>
  );
}
