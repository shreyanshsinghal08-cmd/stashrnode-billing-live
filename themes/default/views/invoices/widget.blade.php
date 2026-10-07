<div class="space-y-3">
    @foreach ($invoices as $invoice)
    <a href="{{ route('invoices.show', $invoice) }}" wire:navigate class="block group">
        <div class="sn-card p-4 flex items-center justify-between gap-4 transition duration-200">
            <div class="flex items-center gap-3 min-w-0">
                <div class="flex items-center justify-center size-9 rounded-xl {{ $invoice->status == 'paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-amber-500/10 text-amber-400 border border-amber-500/25' }} shrink-0">
                    <svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                </div>
                <div class="truncate">
                    <div class="text-sm font-bold text-white group-hover:text-cyan-300 transition truncate">
                        #INV-{{ $invoice->number ?: $invoice->id }}
                    </div>
                    <div class="text-xs text-slate-400 truncate">
                        {{ $invoice->created_at->format('d M Y') }} &bull; {{ $invoice->formattedTotal }}
                    </div>
                </div>
            </div>

            <div class="shrink-0">
                @if ($invoice->status == 'paid')
                    <span class="sn-badge sn-badge-success">
                        <span class="sn-status-dot"></span>
                        <span>Paid</span>
                    </span>
                @elseif ($invoice->status == 'cancelled')
                    <span class="sn-badge sn-badge-danger">
                        <span class="sn-status-dot"></span>
                        <span>Cancelled</span>
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
