<div class="space-y-3">
    @foreach ($services as $service)
    <a href="{{ route('services.show', $service) }}" wire:navigate class="block group">
        <div class="sn-card p-4 flex items-center justify-between gap-4 transition duration-200">
            <div class="flex items-center gap-3 min-w-0">
                <div class="flex items-center justify-center size-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 shrink-0">
                    <svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                    </svg>
                </div>
                <div class="truncate">
                    <div class="text-sm font-bold text-white group-hover:text-cyan-300 transition truncate">
                        {{ $service->label }}
                    </div>
                    <div class="text-xs text-slate-400 truncate">
                        {{ $service->product->name }}
                        @if($service->expires_at)
                        &bull; Renews {{ $service->expires_at->format('M d, Y') }}
                        @endif
                    </div>
                </div>
            </div>

            <!-- Status Pill -->
            <div class="shrink-0">
                @if ($service->status == 'active')
                    <span class="sn-badge sn-badge-success">
                        <span class="sn-status-dot"></span>
                        <span>Running</span>
                    </span>
                @elseif ($service->status == 'suspended')
                    <span class="sn-badge sn-badge-danger">
                        <span class="sn-status-dot"></span>
                        <span>Suspended</span>
                    </span>
                @else
                    <span class="sn-badge sn-badge-warning">
                        <span class="sn-status-dot"></span>
                        <span>Pending</span>
                    </span>
                @endif
            </div>
        </div>
    </a>
    @endforeach
</div>
