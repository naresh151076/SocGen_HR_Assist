"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Bot, Ellipsis } from "lucide-react";

type MenuItem = {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
};

type Props = {
  title: string;
  tags?: string[];
  /** Quiet trailing control — prefer menu items over a solid primary CTA in the header. */
  menuItems?: MenuItem[];
  menuLabel?: string;
  actions?: ReactNode;
};

/** Compact destination header aligned with the conversation header treatment. */
export function WorkspaceHeader({ title, tags = [], menuItems, menuLabel = "Page options", actions }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="flex h-[var(--panel-header-height)] w-full shrink-0 items-center justify-between gap-3 border-b border-zinc-200 px-5 md:px-8">
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold text-zinc-900">{title}</h1>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        {tags.length > 0 && (
          <div className="hidden items-center gap-1.5 md:flex">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--line)] bg-[var(--surface-subtle)] px-2 py-0.5 text-[11px] font-medium text-[var(--muted)]">
                {tag}
              </span>
            ))}
          </div>
        )}
        {actions}
        {menuItems && menuItems.length > 0 && (
          <div className="relative" ref={menuRef}>
            <button
              aria-label={menuLabel}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
              className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            >
              <Ellipsis size={16} />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-10 z-40 w-56 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-[0_16px_40px_rgba(15,23,42,.12)]">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      item.onClick();
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
                  >
                    {item.icon ?? <Bot size={15} className="text-[var(--sg-red)]" />}
                    {item.label}
                  </button>
                ))}
                {tags.length > 0 && (
                  <p className="border-t border-zinc-100 px-3 py-2 text-[11px] leading-4 text-zinc-500 md:hidden">{tags.join(" · ")}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
