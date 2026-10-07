@php
    $user = Auth::user();
    $activeServices = $user->services()->where('status', 'active')->with(['product', 'plan'])->get();
    $activeServicesCount = $activeServices->count();
    $unpaidInvoices = $user->invoices()->where('status', 'pending')->get();
    $unpaidInvoicesCount = $unpaidInvoices->count();
    $openTicketsCount = !config('settings.tickets_disabled', false) ? $user->tickets()->where('status', '!=', 'closed')->count() : 0;
    $userCredit = $user->credits->first()?->formattedAmount ?? (new \App\Classes\Price)->format(0);
    $primaryService = $activeServices->first();
@endphp

<div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
    <!-- Top Welcome Header & Quick Stats (Matching Image 1) -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
        <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Welcome back, {{ $user->first_name ?: $user->name }}
            </h1>
            <p class="text-sm sm:text-base text-slate-400 mt-1">
                Here's what's happening with your servers.
            </p>
        </div>

        <!-- Header Quick Stat Chips (Right side of Image 1) -->
        <div class="flex flex-wrap items-center gap-3">
            <!-- Running Servers Chip -->
            <div class="sn-stat-card px-4 py-2.5 flex flex-col justify-center min-w-[130px]">
                <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Running Servers</span>
                <div class="flex items-center gap-2 mt-1">
                    <div class="flex items-center justify-center size-5 rounded bg-emerald-500/10 text-emerald-400">
                        <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                            <line x1="6" y1="6" x2="6.01" y2="6"></line>
                            <line x1="6" y1="18" x2="6.01" y2="18"></line>
                        </svg>
                    </div>
                    <span class="text-xl font-bold text-emerald-400 leading-none">{{ $activeServicesCount }}</span>
                </div>
            </div>

            <!-- Current Tickets / Players Chip -->
            <div class="sn-stat-card px-4 py-2.5 flex flex-col justify-center min-w-[130px]">
                <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {{ !config('settings.tickets_disabled', false) ? 'Open Tickets' : 'Active Nodes' }}
                </span>
                <div class="flex items-center gap-2 mt-1">
                    <div class="flex items-center justify-center size-5 rounded bg-cyan-500/10 text-cyan-400">
                        <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                    </div>
                    <span class="text-xl font-bold text-cyan-400 leading-none">
                        {{ !config('settings.tickets_disabled', false) ? $openTicketsCount : $activeServicesCount }}
                    </span>
                </div>
            </div>

            <!-- This Month's Cost / Balance Chip -->
            <div class="sn-stat-card px-4 py-2.5 flex flex-col justify-center min-w-[140px]">
                <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Credit Balance</span>
                <div class="flex items-center gap-2 mt-1">
                    <div class="flex items-center justify-center size-5 rounded bg-cyan-500/10 text-cyan-400">
                        <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                    </div>
                    <span class="text-xl font-bold text-cyan-400 leading-none">{{ $userCredit }}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Row 1: Top Metrics Cards (Matching Image 1) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Card 1: Your Servers -->
        <div class="sn-card p-6 flex flex-col justify-between relative overflow-hidden group">
            <div class="flex items-center gap-3">
                <div class="flex items-center justify-center size-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 shadow-[0_0_12px_rgba(0,184,255,0.25)]">
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" fill="rgba(0,184,255,0.2)"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                    </svg>
                </div>
                <h3 class="text-base font-bold text-white tracking-tight">Your Servers</h3>
            </div>

            <div class="my-4">
                <div class="flex items-baseline gap-2">
                    <span class="text-4xl font-extrabold text-white tracking-tight">{{ $activeServicesCount }}</span>
                    <span class="text-sm font-medium text-slate-400">running</span>
                </div>
            </div>

            <div class="flex items-center gap-2 pt-2 border-t border-cyan-500/10 text-xs font-semibold text-emerald-400">
                <svg class="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{{ $activeServicesCount > 0 ? 'All systems operational' : 'Ready to deploy first server' }}</span>
            </div>
        </div>

        <!-- Card 2: % CPU Usage (With Glowing Particle Progress Bar) -->
        <div class="sn-card p-6 flex flex-col justify-between relative overflow-hidden group">
            <div class="flex items-center gap-3">
                <div class="flex items-center justify-center size-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.25)]">
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                </div>
                <h3 class="text-base font-bold text-white tracking-tight">CPU Usage</h3>
            </div>

            <div class="my-3">
                <div class="text-4xl font-extrabold text-emerald-400 tracking-tight leading-none mb-3">
                    {{ $activeServicesCount > 0 ? '32%' : '0%' }}
                </div>
                <!-- Glowing Progress Bar with Particle Sparkle -->
                <div class="sn-progress-container">
                    <div class="sn-progress-fill" style="width: {{ $activeServicesCount > 0 ? '32%' : '4%' }};"></div>
                </div>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-cyan-500/10 text-xs text-slate-400">
                <span>{{ $activeServicesCount > 0 ? '32%' : '0%' }}</span>
                <span>Optimized Performance</span>
            </div>
        </div>

        <!-- Card 3: RAM Usage (With Glowing Particle Progress Bar) -->
        <div class="sn-card p-6 flex flex-col justify-between relative overflow-hidden group">
            <div class="flex items-center gap-3">
                <div class="flex items-center justify-center size-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 shadow-[0_0_12px_rgba(0,184,255,0.25)]">
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 2v20M18 2v20M2 6h20M2 18h20"></path>
                    </svg>
                </div>
                <h3 class="text-base font-bold text-white tracking-tight">RAM Usage</h3>
            </div>

            <div class="my-3">
                <div class="text-4xl font-extrabold text-cyan-400 tracking-tight leading-none mb-3">
                    {{ $activeServicesCount > 0 ? '58%' : '0%' }}
                </div>
                <!-- Glowing Progress Bar with Particle Sparkle -->
                <div class="sn-progress-container">
                    <div class="sn-progress-fill" style="width: {{ $activeServicesCount > 0 ? '58%' : '4%' }};"></div>
                </div>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-cyan-500/10 text-xs text-slate-400">
                <span>{{ $activeServicesCount > 0 ? '5.8 GB / 10 GB' : '0 GB / 0 GB' }}</span>
                <span>DDR5 High-Speed</span>
            </div>
        </div>
    </div>

    <!-- Row 2: Middle Section Grid (Matching Image 1) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

        <!-- Column 1: Network Overview (Image 1 Left) -->
        <div class="sn-card p-6 flex flex-col justify-between h-full min-h-[380px] relative overflow-hidden">
            <!-- Header with Refresh -->
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2.5">
                    <div class="flex items-center justify-center size-8 rounded-lg bg-cyan-500/10 text-cyan-400">
                        <svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                    </div>
                    <h3 class="text-base font-bold text-white tracking-tight">Network Overview</h3>
                </div>
                <button type="button" class="text-slate-400 hover:text-cyan-300 transition" title="Refresh metrics" onclick="location.reload();">
                    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <polyline points="1 20 1 14 7 14"></polyline>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                    </svg>
                </button>
            </div>

            <!-- Biome / Cyber Network Illustration Container -->
            <div class="relative rounded-xl overflow-hidden border border-cyan-500/15 bg-gradient-to-b from-[#091524] to-[#040810] p-4 my-2 flex-1 flex flex-col justify-between min-h-[200px]">
                <div class="absolute inset-0 opacity-20 pointer-events-none" style="background-image: radial-gradient(#00B8FF 1px, transparent 1px); background-size: 16px 16px;"></div>
                
                <!-- Badge on Map -->
                <div class="relative z-10 self-start inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                    <span class="size-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                    <span>Your Network</span>
                </div>

                <!-- Network Metric Badges Floating -->
                <div class="relative z-10 space-y-2 mt-auto pt-6">
                    <div class="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0A0F1A]/85 border border-cyan-500/15 backdrop-blur-md">
                        <span class="text-xs text-slate-400 flex items-center gap-1.5">
                            <svg class="size-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 14 14"></polyline>
                            </svg>
                            Latency
                        </span>
                        <span class="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <span class="size-1.5 rounded-full bg-emerald-400"></span>
                            28 ms
                        </span>
                    </div>

                    <div class="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0A0F1A]/85 border border-cyan-500/15 backdrop-blur-md">
                        <span class="text-xs text-slate-400 flex items-center gap-1.5">
                            <svg class="size-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                            </svg>
                            Packet Loss
                        </span>
                        <span class="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <span class="size-1.5 rounded-full bg-emerald-400"></span>
                            0%
                        </span>
                    </div>

                    <div class="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0A0F1A]/85 border border-cyan-500/15 backdrop-blur-md">
                        <span class="text-xs text-slate-400 flex items-center gap-1.5">
                            <svg class="size-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                <polyline points="17 6 23 6 23 12"></polyline>
                            </svg>
                            Bandwidth
                        </span>
                        <span class="text-xs font-bold text-cyan-400 flex items-center gap-1">
                            <span class="size-1.5 rounded-full bg-cyan-400"></span>
                            12.4 GB/s
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Column 2: Server Activity & Centerpiece 3D Cyber-Block (Image 1 Center) -->
        <div class="sn-card p-6 flex flex-col justify-between h-full min-h-[380px] relative overflow-hidden">
            <div class="flex items-center justify-between mb-2">
                <h3 class="text-base font-bold text-white tracking-tight">Server Activity</h3>
                <span class="size-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00B8FF] animate-pulse"></span>
            </div>

            <!-- Floating Server Status Tooltip / Badge Card -->
            <div class="my-2 p-3.5 rounded-xl bg-[#091322]/90 border border-cyan-500/30 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <div class="flex items-center gap-3">
                    <div class="flex items-center justify-center size-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                            <polyline points="2 17 12 22 22 17"/>
                            <polyline points="2 12 12 17 22 12"/>
                        </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-bold text-sm text-white truncate">
                            {{ $primaryService ? $primaryService->label : 'Cyber Node Alpha' }}
                        </div>
                        <div class="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                            <span class="size-1.5 rounded-full bg-emerald-400"></span>
                            <span>{{ $primaryService ? 'Operational & Running' : 'Ready to Launch' }}</span>
                        </div>
                    </div>
                </div>

                <!-- Mini Progress Bars in Tooltip -->
                <div class="mt-3 space-y-1.5">
                    <div class="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Load</span>
                        <span class="text-cyan-400 font-semibold">45%</span>
                    </div>
                    <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div class="h-full bg-cyan-400 rounded-full" style="width: 45%;"></div>
                    </div>

                    <div class="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>Allocated</span>
                        <span class="text-emerald-400 font-semibold">6.2 GB / 10 GB</span>
                    </div>
                    <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div class="h-full bg-emerald-400 rounded-full" style="width: 62%;"></div>
                    </div>
                </div>
            </div>

            <!-- 3D Isometric Obsidian-Diamond Cyber Cube Centerpiece -->
            <div class="sn-cube-wrapper my-2 flex items-center justify-center">
                <div class="sn-energy-beam"></div>
                <svg class="sn-cube-svg size-36" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Top Face (Diamond Cyan Rune Core) -->
                    <polygon points="100 20, 175 62, 100 104, 25 62" fill="#0D1A2E" stroke="#00B8FF" stroke-width="2.5" />
                    <!-- Top Rune Insets -->
                    <polygon points="100 40, 145 65, 100 90, 55 65" fill="#091424" stroke="#22D3EE" stroke-width="1.5" />
                    <circle cx="100" cy="65" r="7" fill="#00B8FF" filter="drop-shadow(0 0 8px #00B8FF)" />
                    <circle cx="80" cy="55" r="3" fill="#22D3EE" />
                    <circle cx="120" cy="75" r="3" fill="#22D3EE" />
                    
                    <!-- Left Face (Dark Obsidian with Emerald Cyber Lines) -->
                    <polygon points="25 62, 100 104, 100 185, 25 143" fill="#0A111C" stroke="#00B8FF" stroke-width="2.5" />
                    <!-- Left Rune Circuits -->
                    <rect x="42" y="85" width="18" height="28" fill="#059669" opacity="0.85" rx="3" stroke="#34D399" stroke-width="1" />
                    <rect x="68" y="125" width="18" height="24" fill="#00B8FF" opacity="0.85" rx="3" stroke="#22D3EE" stroke-width="1" />
                    <line x1="60" y1="99" x2="68" y2="137" stroke="#34D399" stroke-width="2" />

                    <!-- Right Face (Obsidian with Cyan Power Slots) -->
                    <polygon points="100 104, 175 62, 175 143, 100 185" fill="#070C14" stroke="#00B8FF" stroke-width="2.5" />
                    <!-- Right Rune Glows -->
                    <rect x="120" y="115" width="22" height="30" fill="#00B8FF" opacity="0.9" rx="3" stroke="#22D3EE" stroke-width="1.5" filter="drop-shadow(0 0 6px #00B8FF)" />
                    <rect x="148" y="85" width="16" height="20" fill="#10B981" opacity="0.8" rx="2" stroke="#34D399" stroke-width="1" />
                    <line x1="131" y1="130" x2="156" y2="95" stroke="#00B8FF" stroke-width="2" />
                </svg>
            </div>

            <!-- Hotbar Action Icons at Bottom of Centerpiece (Image 1) -->
            <div class="flex items-center justify-center gap-2 pt-2 border-t border-cyan-500/10">
                <a href="{{ route('services') }}" wire:navigate class="p-2 rounded-lg bg-[#0A101E] border border-cyan-500/20 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 transition" title="Servers">
                    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                    </svg>
                </a>
                <a href="{{ route('invoices') }}" wire:navigate class="p-2 rounded-lg bg-[#0A101E] border border-cyan-500/20 text-slate-400 hover:text-cyan-300 hover:border-cyan-400 transition" title="Invoices">
                    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                </a>
                <a href="{{ route('home') }}" wire:navigate class="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.4)] transition" title="Deploy New">
                    <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </a>
            </div>
        </div>

        <!-- Column 3: Servers List & Recent Activity (Image 1 Right) -->
        <div class="space-y-5">
            <!-- Active Servers List Card (Matching Image 1) -->
            <div class="sn-card p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-base font-bold text-white tracking-tight">Servers</h3>
                    <a href="{{ route('services') }}" wire:navigate class="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition">
                        View all
                    </a>
                </div>

                <div class="space-y-2.5">
                    @forelse($activeServices->take(4) as $index => $service)
                    <a href="{{ route('services.show', $service) }}" wire:navigate 
                       class="flex items-center justify-between p-2.5 rounded-xl bg-[#091120]/80 border border-cyan-500/15 hover:border-cyan-500/35 hover:bg-[#0D182E] transition duration-200 group">
                        <div class="flex items-center gap-3 min-w-0">
                            <!-- Minecraft Cube Icon with alternating color accents -->
                            <div class="flex items-center justify-center size-8 rounded-lg {{ $index % 2 == 0 ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25' }} shrink-0">
                                <svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                                    <polyline points="2 17 12 22 22 17"/>
                                    <polyline points="2 12 12 17 22 12"/>
                                </svg>
                            </div>
                            <div class="truncate">
                                <span class="text-sm font-semibold text-white group-hover:text-cyan-300 transition block truncate">
                                    {{ $service->label }}
                                </span>
                                <span class="text-[11px] text-slate-400 truncate block">
                                    {{ $service->product->name }}
                                </span>
                            </div>
                        </div>

                        <!-- Status IP Pill (Matching Image 1) -->
                        <div class="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-semibold text-emerald-400 shrink-0 flex items-center gap-1.5 shadow-[0_0_8px_rgba(16,185,129,0.15)]">
                            <span class="size-1.5 rounded-full bg-emerald-400"></span>
                            <span>Online</span>
                        </div>
                    </a>
                    @empty
                    <div class="p-4 rounded-xl bg-[#091120]/60 border border-cyan-500/10 text-center">
                        <p class="text-xs text-slate-400">No active servers running.</p>
                        <a href="{{ route('home') }}" wire:navigate class="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                            <span>+ Deploy your first server</span>
                        </a>
                    </div>
                    @endforelse
                </div>

                <!-- Add Server Button at bottom of servers list -->
                <div class="mt-3 pt-3 border-t border-cyan-500/10 flex justify-end">
                    <a href="{{ route('home') }}" wire:navigate 
                       class="flex items-center justify-center size-8 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/40 hover:shadow-[0_0_12px_rgba(0,184,255,0.3)] transition"
                       title="Order new server">
                        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </a>
                </div>
            </div>

            <!-- Recent Activity Feed Card (Matching Image 1) -->
            <div class="sn-card p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-base font-bold text-white tracking-tight">Recent Activity</h3>
                </div>

                <div class="space-y-3">
                    @php
                        $recentInvoices = $user->invoices()->latest()->take(2)->get();
                        $recentServices = $user->services()->latest()->take(2)->get();
                    @endphp

                    @forelse($recentServices as $srv)
                    <div class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="flex items-center justify-center size-8 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 shrink-0">
                                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <div class="truncate">
                                <div class="text-xs font-bold text-white truncate">Server Deployed</div>
                                <div class="text-[11px] text-slate-400 truncate">{{ $srv->label }}</div>
                            </div>
                        </div>
                        <span class="text-[11px] text-slate-500 shrink-0 font-medium">
                            {{ $srv->created_at->diffForHumans(null, true, true) }}
                        </span>
                    </div>
                    @empty
                    @endforelse

                    @forelse($recentInvoices as $inv)
                    <div class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="flex items-center justify-center size-8 rounded-lg {{ $inv->status == 'paid' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'bg-amber-500/15 text-amber-400 border border-amber-500/25' }} shrink-0">
                                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                            </div>
                            <div class="truncate">
                                <div class="text-xs font-bold text-white truncate">
                                    {{ $inv->status == 'paid' ? 'Invoice Paid' : 'Invoice Pending' }}
                                </div>
                                <div class="text-[11px] text-slate-400 truncate">
                                    #INV-{{ $inv->number ?: $inv->id }} ({{ $inv->formattedTotal }})
                                </div>
                            </div>
                        </div>
                        <span class="text-[11px] text-slate-500 shrink-0 font-medium">
                            {{ $inv->created_at->diffForHumans(null, true, true) }}
                        </span>
                    </div>
                    @empty
                    @endforelse

                    @if($recentServices->isEmpty() && $recentInvoices->isEmpty())
                    <div class="p-3 rounded-lg bg-[#091120]/40 text-center text-xs text-slate-400">
                        No recent activity recorded.
                    </div>
                    @endif
                </div>
            </div>
        </div>

    </div>

    <!-- Hooks & Additional Panels -->
    {!! hook('pages.dashboard') !!}
</div>
