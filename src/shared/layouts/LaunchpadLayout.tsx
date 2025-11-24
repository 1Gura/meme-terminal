import { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/shared/components/ui/sidebar";

import { LayoutDashboard, PlusCircle, User } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/router";
import { MobileHeader } from "@/shared/components/MobileHeader";
import SpotlightCursor from "@/shared/components/SpootlightCursor";
import { LiveTokensListener } from "@/shared/components/LiveTokenListener";

export function LaunchpadLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <SidebarProvider>
      <MobileHeader />
      <div className="grid-background" />
      <SpotlightCursor />
      <div className="flex w-full h-screen bg-[#0a0f1a] text-zinc-100">
        <Sidebar className="bg-[#111827]">
          {/* HEADER */}
          <SidebarGroup>
            <div className="flex items-center gap-3 px-4 py-4">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-3 rounded-xl shadow-lg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <path d="M12 2L2 7l10 5 10-5-10-5zm0 8L2 15l10 5 10-5-10-5z" />
                </svg>
              </div>

              <div>
                <div className="text-xl font-bold text-orange-300">Launch Meme</div>
                <div className="text-xs text-orange-200/60">Meme Terminal v0.0.1</div>
              </div>
            </div>
          </SidebarGroup>

          <SidebarSeparator className="my-2 opacity-10" />

          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {/* Terminal */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("/terminal")}
                    className={
                      isActive("/terminal")
                        ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                        : "hover:bg-orange-500/30 hover:text-white"
                    }
                  >
                    <Link href="/terminal">
                      <LayoutDashboard />
                      <span>Terminal</span>
                      {isActive("/terminal") && (
                        <span className="ml-auto w-2 h-2 bg-orange-200 rounded-full" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Create Token */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("/create-token")}
                    className={
                      isActive("/create-token")
                        ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                        : "hover:bg-orange-500/30 hover:text-white"
                    }
                  >
                    <Link href="/create-token">
                      <PlusCircle />
                      <span>Create Meme</span>
                      {isActive("/create-token") && (
                        <span className="ml-auto w-2 h-2 bg-orange-200 rounded-full" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Profile */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("/profile")}
                    className={
                      isActive("/profile")
                        ? "bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                        : "hover:bg-orange-500/30 hover:text-white"
                    }
                  >
                    <Link href="/profile">
                      <User />
                      <span>Profile</span>
                      {isActive("/profile") && (
                        <span className="ml-auto w-2 h-2 bg-orange-200 rounded-full" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          {/* BOTTOM AUTH SECTION */}
          <SidebarSeparator className="my-4 opacity-10 mt-auto" />

          {/*<PumpfunMintFeed />*/}
          <div className="px-6 py-6">
            <LiveTokensListener />
          </div>

          <SidebarSeparator className="my-4 opacity-10 mt-auto" />

          <SidebarGroup className="px-4 pb-6">
            <SidebarMenu>
              {/* Sign In */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="
                    hover:bg-orange-500/30
                    hover:text-white
                    transition-colors
                "
                >
                  <Link href="/auth/sign-in">
                    <User />
                    <span>Sign In</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Sign Up */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="
                    bg-gradient-to-r from-orange-400 to-orange-600
                    text-white
                    shadow-lg shadow-orange-600/30
                    mt-2
                "
                >
                  <Link href="/auth/sign-up">
                    <PlusCircle />
                    <span>Sign Up</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </Sidebar>

        {/* MAIN CONTENT */}
        <main className="w-full flex-1 overflow-y-auto px-8 py-6 card pt-[80px] md:pt-6 fade-page-enter fade-page-enter-active">
          <div key={router.asPath} className="fade-page">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
