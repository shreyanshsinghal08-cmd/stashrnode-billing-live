<div class="ring-1 ring-cyan-500/10">
</div>

<div class="flex flex-col gap-1 p-3 mt-auto">
    <div class="flex items-center gap-2">
        <span class="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00B8FF]"></span>
        <span class="sn-brand-title text-xs tracking-tight">StashrNode</span>
    </div>
    <span class="text-[11px] text-slate-400 font-medium">Cyber-Minecraft Admin &copy; {{ date('Y') }}</span>
</div>

<ul class="fi-sidebar-nav-groups -mx-2 flex flex-col gap-y-7">
    <li class="fi-sidebar-group flex flex-col gap-y-1">
        <ul class="fi-sidebar-group-items flex flex-col gap-y-1">
            <li class="fi-sidebar-item">
                <a href="https://github.com/sponsors/Paymenter" target="_blank" class="fi-sidebar-item-button relative flex items-center justify-center gap-x-3 rounded-lg px-2 py-2 outline-none transition duration-75 hover:bg-cyan-500/10 focus-visible:bg-cyan-500/10">
                    <x-ri-service-fill class="fi-sidebar-item-icon h-5 w-5 sponsor" />
                    <span class="fi-sidebar-item-label flex-1 truncate text-xs font-medium text-slate-300">
                        Sponsor
                    </span>
                </a>
            </li>
            <li class="fi-sidebar-item">
                <a href="https://github.com/Paymenter/Paymenter" target="_blank" class="fi-sidebar-item-button relative flex items-center justify-center gap-x-3 rounded-lg px-2 py-2 outline-none transition duration-75 hover:bg-cyan-500/10 focus-visible:bg-cyan-500/10">
                    <x-ri-star-fill class="fi-sidebar-item-icon h-5 w-5 star-git" />
                    <span class="fi-sidebar-item-label flex-1 truncate text-xs font-medium text-slate-300">
                        Star us on GitHub
                    </span>
                </a>
            </li>
            <li class="fi-sidebar-item">
                <a href="https://paymenter.org/docs/getting-started/introduction" target="_blank" class="fi-sidebar-item-button relative flex items-center justify-center gap-x-3 rounded-lg px-2 py-2 outline-none transition duration-75 hover:bg-cyan-500/10 focus-visible:bg-cyan-500/10">
                    <x-ri-book-2-line class="fi-sidebar-item-icon h-5 w-5 text-cyan-400" />
                    <span class="fi-sidebar-item-label flex-1 truncate text-xs font-medium text-slate-300">
                        Documentation
                    </span>
                </a>
            </li>
        </ul>
    </li>
</ul>

<style>
    .sponsor {
        fill: #DB61A2;
    }

    .star-git {
        fill: #E3B341;
    }
</style>
