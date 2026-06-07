"use client";
import { useState } from "react";
import { TopBar } from "./top-bar";
import { SideRail } from "./side-rail";
import { CopilotDrawer } from "./copilot/drawer";
import { CommandMenu } from "./command-menu";
import { useHotkey } from "@/lib/hooks/use-hotkey";
import { Sparkles } from "lucide-react";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [copilotOpen, setCopilotOpen] = useState(true);
  const [cmdOpen, setCmdOpen] = useState(false);

  useHotkey("mod+j", () => setCopilotOpen((v) => !v));
  useHotkey("mod+k", () => setCmdOpen(true));

  return (
    <div className="grid h-screen grid-rows-[56px_1fr]">
      <TopBar onOpenCommandMenu={() => setCmdOpen(true)} />

      <div
        className={`grid min-h-0 ${
          copilotOpen ? "grid-cols-[56px_1fr_420px]" : "grid-cols-[56px_1fr]"
        } max-lg:grid-cols-[56px_1fr] max-sm:grid-cols-1`}
      >
        <SideRail />

        {/* Main content scroll area, with bottom padding for mobile dock */}
        <main className="overflow-auto pb-20 sm:pb-0">{children}</main>

        {copilotOpen && <CopilotDrawer onClose={() => setCopilotOpen(false)} />}
      </div>

      {/* Floating copilot toggle (when closed) */}
      {!copilotOpen && (
        <button
          onClick={() => setCopilotOpen(true)}
          className="fixed bottom-20 right-4 z-30 inline-flex items-center gap-2 rounded-full grad-aurora px-4 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(61,91,255,0.45)] transition hover:-translate-y-0.5 sm:bottom-4"
          aria-label="Open Lumen copilot"
          title="Open Lumen  ⌘J"
        >
          <Sparkles size={14} />
          Ask Lumen
        </button>
      )}

      <CommandMenu open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  );
}
