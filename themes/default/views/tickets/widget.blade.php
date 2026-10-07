<div class="space-y-3">
    @foreach ($tickets as $ticket)
    <a href="{{ route('tickets.show', $ticket) }}" wire:navigate class="block group">
        <div class="sn-card p-4 flex items-center justify-between gap-4 transition duration-200">
            <div class="flex items-center gap-3 min-w-0">
                <div class="flex items-center justify-center size-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 shrink-0">
                    <svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                </div>
                <div class="truncate">
                    <div class="text-sm font-bold text-white group-hover:text-cyan-300 transition truncate">
                        #{{ $ticket->id }} - {{ $ticket->subject }}
                    </div>
                    <div class="text-xs text-slate-400 truncate">
                        {{ __('ticket.last_activity') }}
                        {{ $ticket->messages()->orderBy('created_at', 'desc')->first()?->created_at->diffForHumans() }}
                        {{ $ticket->department ? ' &bull; ' . $ticket->department : '' }}
                    </div>
                </div>
            </div>

            <div class="shrink-0">
                @if ($ticket->status == 'open')
                    <span class="sn-badge sn-badge-success">
                        <span class="sn-status-dot"></span>
                        <span>Open</span>
                    </span>
                @elseif ($ticket->status == 'closed')
                    <span class="sn-badge sn-badge-danger">
                        <span class="sn-status-dot"></span>
                        <span>Closed</span>
                    </span>
                @else
                    <span class="sn-badge sn-badge-cyan">
                        <span class="sn-status-dot"></span>
                        <span>{{ ucfirst($ticket->status) }}</span>
                    </span>
                @endif
            </div>
        </div>
    </a>
    @endforeach
</div>
