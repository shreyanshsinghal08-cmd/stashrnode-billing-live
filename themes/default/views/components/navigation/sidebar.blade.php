<aside id="main-aside" class="sn-sidebar-floating w-64 md:w-[17rem] flex flex-col justify-between fixed top-6 left-6 bottom-6 h-[calc(100vh-3rem)] rounded-[24px] z-[100] border border-white/12 bg-[#0A0F1C]/48 backdrop-blur-[30px] shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_30px_rgba(0,184,255,0.12)]">
    <!-- Top Branding & Close Button -->
    <div class="h-16 px-5 flex items-center justify-between border-b border-white/10 shrink-0">
        <a href="{{ route('home') }}" class="flex items-center gap-2.5 group" wire:navigate>
            <div class="flex items-center justify-center size-9 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 shadow-[0_0_15px_rgba(0,184,255,0.35)] group-hover:shadow-[0_0_24px_rgba(0,184,255,0.55)] group-hover:scale-105 transition duration-200">
                <!-- Diamond Pickaxe Icon -->
                <svg class="size-5 drop-shadow-[0_0_8px_rgba(0,184,255,0.7)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m14 7 3-3 4 4-3 3"/>
                    <path d="m5 19 8-8"/>
                    <path d="m10 9 2 2"/>
                    <path d="m2 22 3-3"/>
                    <path d="M15 4c2.5-1 5 1.5 4 4L11 20l-7-7L15 4z" stroke-dasharray="0" opacity="0.3" fill="currentColor"/>
                </svg>
            </div>
            <span class="sn-brand-title text-lg tracking-tight text-white font-extrabold group-hover:text-cyan-300 transition duration-200">StashrNode</span>
        </a>

        <!-- Close Sidebar Button -->
        <button type="button" class="sn-sidebar-close-btn flex items-center justify-center size-8 rounded-lg bg-white/[0.06] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.12] transition" title="Close Sidebar" onclick="window.snToggleSidebar(false)">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    </div>

    <!-- Navigation Links -->
    <div class="flex-1 overflow-y-auto px-4 py-6">
        <x-navigation.sidebar-links />
    </div>

    <!-- Bottom Status & Collapse -->
    <div class="p-4 border-t border-white/10 shrink-0 flex items-center justify-between gap-2">
        <div class="sn-status-pill flex-1 flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
            <div class="flex items-center gap-2.5">
                <div class="flex items-center justify-center size-6 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <svg class="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                </div>
                <span class="text-xs font-semibold text-slate-200">Status</span>
            </div>
            <div class="flex items-center gap-1.5">
                <span class="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse"></span>
            </div>
        </div>

        <button type="button" 
            class="flex items-center justify-center size-9 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-white/[0.08] transition duration-200"
            title="Toggle Sidebar"
            onclick="document.getElementById('main-aside').classList.toggle('w-20');">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
        </button>
    </div>
</aside>
