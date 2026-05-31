"use client";

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import MobileBottomNav from "./MobileBottomNav";
import MobileDrawer from "./MobileDrawer";

interface AppLayoutProps {
  activeTab: string;
  mobileDrawerOpen: boolean;
  onCloseDrawer: () => void;
  onNavigate: (tab: string) => void;
  children: ReactNode;
}

export default function AppLayout({ activeTab, mobileDrawerOpen, onCloseDrawer, onNavigate, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#102b6b_0%,#050b1f_35%,#020617_100%)] text-white">
      <div className="flex min-h-screen">
        <Sidebar activeTab={activeTab} onNavigate={onNavigate} />
        <main className="min-w-0 flex-1 pb-24 lg:pb-0">
          {children}
        </main>
      </div>
      <MobileDrawer open={mobileDrawerOpen} activeTab={activeTab} onClose={onCloseDrawer} onNavigate={onNavigate} />
      <MobileBottomNav activeTab={activeTab} onNavigate={onNavigate} />
    </div>
  );
}
