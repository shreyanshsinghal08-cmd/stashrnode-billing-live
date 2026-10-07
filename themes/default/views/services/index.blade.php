<div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
    <x-navigation.breadcrumb />

    <!-- Page Title -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
            <h1 class="text-3xl font-extrabold text-white tracking-tight">Game Servers & Services</h1>
            <p class="text-sm text-slate-400 mt-1">Manage and access your live instances</p>
        </div>

        <a href="{{ route('home') }}" wire:navigate class="sn-btn sn-btn-primary self-start sm:self-auto !px-4 !py-2 shadow-[0_0_15px_rgba(0,184,255,0.35)]">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Deploy Server</span>
        </a>
    </div>

    <!-- Server Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        @forelse ($services as $service)
        <a href="{{ route('services.show', $service) }}" wire:navigate class="block group">
            <div class="sn-card p-6 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300">
                <!-- Top Row: Server Name & Status Pill -->
                <div class="flex items-center justify-between gap-4 mb-4">
                    <div class="flex items-center gap-3.5 min-w-0">
                        <div class="flex items-center justify-center size-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(0,184,255,0.25)] group-hover:shadow-[0_0_20px_rgba(0,184,255,0.4)] group-hover:scale-105 transition-all">
                            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                                <polyline points="2 17 12 22 22 17"/>
                                <polyline points="2 12 12 17 22 12"/>
                            </svg>
                        </div>
                        <div class="min-w-0">
                            <h3 class="text-base font-bold text-white group-hover:text-cyan-300 transition truncate">
                                {{ $service->label }}
                            </h3>
                            <span class="text-xs text-slate-400 truncate block">
                                {{ $service->product->name }}
                            </span>
                        </div>
                    </div>

                    <!-- Status Pill Badge -->
                    <div class="shrink-0">
                        @if ($service->status == 'active')
                            <span class="sn-badge sn-badge-success">
                                <span class="sn-status-dot"></span>
                                <span>Running</span>
                            </span>
                        @elseif ($service->status == 'suspended' || $service->status == 'cancelled')
                            <span class="sn-badge sn-badge-danger">
                                <span class="sn-status-dot"></span>
                                <span>{{ ucfirst($service->status) }}</span>
                            </span>
                        @else
                            <span class="sn-badge sn-badge-warning">
                                <span class="sn-status-dot"></span>
                                <span>Pending</span>
                            </span>
                        @endif
                    </div>
                </div>

                <!-- Billing & Renewal Info -->
                <div class="pt-4 border-t border-cyan-500/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                    <div>
                        {{ in_array($service->plan->type, ['recurring']) ? __('services.every_period', [
                            'period' => $service->plan->billing_period > 1 ? $service->plan->billing_period : '',
                            'unit' => trans_choice(__('services.billing_cycles.' . $service->plan->billing_unit), $service->plan->billing_period)
                        ]) : 'One-time' }}

                        @if($service->expires_at && $service->expires_at > now())
                        <span class="text-cyan-400 font-medium ml-1">
                            &bull; Renews in {{ $service->expires_at->diffForHumans(null, true) }}
                        </span>
                        @endif
                    </div>

                    <div class="flex items-center gap-1 text-cyan-400 font-semibold group-hover:translate-x-1 transition duration-200">
                        <span>Manage</span>
                        <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        </a>
        @empty
        <div class="col-span-full sn-card p-12 text-center">
            <div class="flex items-center justify-center size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto mb-4">
                <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                </svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-1">{{ __('services.no_services') }}</h3>
            <p class="text-sm text-slate-400 mb-6">You don't have any active servers or services deployed yet.</p>
            <a href="{{ route('home') }}" wire:navigate class="sn-btn sn-btn-primary">
                Deploy Server Now
            </a>
        </div>
        @endforelse
    </div>

    <!-- Pagination -->
    <div>
        {{ $services->links() }}
    </div>
</div>
