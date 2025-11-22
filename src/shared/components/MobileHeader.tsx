import { Menu } from "lucide-react";
import { useSidebar } from "@/shared/components/ui/sidebar";

export function MobileHeader() {
  const { setOpenMobile } = useSidebar();

  return (
    <header
      className="md:hidden fixed top-0 left-0 right-0 z-40 h-14
                           bg-[#111827]/80 backdrop-blur-lg border-b border-white/5
                           flex items-center px-4"
    >
      <button onClick={() => setOpenMobile(true)} className="text-white">
        <Menu size={26} />
      </button>

      <span className="ml-4 text-lg font-semibold text-orange-300">LaunchPad</span>
    </header>
  );
}
