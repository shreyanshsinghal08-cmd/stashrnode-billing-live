@php
    $user = Auth::user();
    $activeServersCount = $user->services()->where('status', 'active')->count();
    $totalCredit = $user->credits->first()?->formattedAmount ?? (new \App\Classes\Price)->format(0);
    
    // Calculate monthly or pending cost
    $pendingInvoices = $user->invoices()->where('status', 'pending')->get();
    $pendingTotal = $pendingInvoices->sum(fn($i) => $i->total);
    $formattedMonthlyCost = (new \App\Classes\Price)->format($pendingTotal > 0 ? $pendingTotal : 0);

    // Calculate nearest due date
    $nearestPending = $pendingInvoices->sortBy('due_at')->first();
    $nearestDueDate = $nearestPending?->due_at;
    $dueDiffDays = $nearestDueDate ? (int) now()->diffInDays($nearestDueDate, false) : null;
@endphp

<div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
    <!-- Breadcrumb -->
    <x-navigation.breadcrumb />

    <!-- Page Header (Matching Image 2) -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
            <h1 class="text-3xl font-extrabold text-white tracking-tight">Invoices</h1>
            <p class="text-sm text-slate-400 mt-1">Manage your invoices and billing history</p>
        </div>

        @if($pendingInvoices->isNotEmpty())
        <a href="{{ route('invoices.show', $pendingInvoices->first()) }}" wire:navigate 
           class="sn-btn sn-btn-primary self-start sm:self-auto !px-4 !py-2 shadow-[0_0_15px_rgba(0,184,255,0.35)]">
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Pay Invoice</span>
        </a>
        @endif
    </div>

    <!-- 4 Summary Stat Cards Across Top (Matching Image 2) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- TOTAL CREDIT -->
        <div class="sn-stat-card p-5 flex flex-col justify-between">
            <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TOTAL CREDIT</span>
                <!-- Diamond Gem Icon -->
                <div class="flex items-center justify-center size-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    <svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="6 3 18 3 22 9 12 22 2 9 6 3"></polygon>
                    </svg>
                </div>
            </div>
            <div class="my-3">
                <span class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{{ $totalCredit }}</span>
            </div>
            <div class="flex items-center justify-between text-xs pt-2 border-t border-cyan-500/10">
                <span class="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <span class="size-1.5 rounded-full bg-emerald-400"></span>
                    Active &gt;
                </span>
            </div>
        </div>

        <!-- ACTIVE SERVERS -->
        <div class="sn-stat-card p-5 flex flex-col justify-between">
            <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ACTIVE SERVERS</span>
                <!-- Grass / Server Cube Icon -->
                <div class="flex items-center justify-center size-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    <svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                    </svg>
                </div>
            </div>
            <div class="my-3">
                <span class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{{ $activeServersCount }}</span>
            </div>
            <div class="flex items-center justify-between text-xs pt-2 border-t border-cyan-500/10 text-slate-400">
                <span>Operational</span>
            </div>
        </div>

        <!-- MONTHLY COST / PENDING -->
        <div class="sn-stat-card p-5 flex flex-col justify-between">
            <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">MONTHLY COST</span>
                <!-- Gold Ingot Icon -->
                <div class="flex items-center justify-center size-8 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                    <svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l8 4v12l-8 4-8-4V6l8-4z"></path>
                    </svg>
                </div>
            </div>
            <div class="my-3">
                <span class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{{ $formattedMonthlyCost }}</span>
            </div>
            <div class="flex items-center justify-between text-xs pt-2 border-t border-cyan-500/10 text-slate-400">
                <span>{{ $pendingInvoices->count() }} pending</span>
            </div>
        </div>

        <!-- NEXT DUE DATE -->
        <div class="sn-stat-card p-5 flex flex-col justify-between">
            <div class="flex items-center justify-between">
                <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">NEXT DUE DATE</span>
                <!-- Clock Icon -->
                <div class="flex items-center justify-center size-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(0,184,255,0.3)]">
                    <svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 14 14"></polyline>
                    </svg>
                </div>
            </div>
            <div class="my-3">
                <span class="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {{ $nearestDueDate ? $nearestDueDate->format('d M Y') : 'Up to date' }}
                </span>
            </div>
            <div class="flex items-center justify-between text-xs pt-2 border-t border-cyan-500/10">
                @if($nearestDueDate)
                <span class="text-cyan-400 font-semibold">
                    {{ $dueDiffDays !== null && $dueDiffDays >= 0 ? "Due in {$dueDiffDays} days >" : 'Overdue >' }}
                </span>
                @else
                <span class="text-emerald-400 font-semibold">All caught up &gt;</span>
                @endif
            </div>
        </div>
    </div>

    <!-- Main Content Grid (Table + Right Help Cards) -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <!-- Main Invoices Table Card (3 Columns wide) -->
        <div class="lg:col-span-3 sn-card overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr>
                            <th scope="col">INVOICE ID</th>
                            <th scope="col">SERVICE</th>
                            <th scope="col">AMOUNT</th>
                            <th scope="col">STATUS</th>
                            <th scope="col">CREATED</th>
                            <th scope="col">DUE DATE</th>
                            <th scope="col" class="text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/[0.04]">
                        @forelse ($invoices as $invoice)
                        <tr class="hover:bg-cyan-500/[0.03] transition duration-150">
                            <!-- Invoice ID -->
                            <td class="whitespace-nowrap font-mono font-bold text-white text-xs">
                                <a href="{{ route('invoices.show', $invoice) }}" wire:navigate class="hover:text-cyan-400 transition">
                                    #INV-{{ $invoice->number ?: str_pad($invoice->id, 5, '0', STR_PAD_LEFT) }}
                                </a>
                            </td>

                            <!-- Service / Items Description -->
                            <td class="font-medium text-slate-200">
                                <div class="max-w-[200px] truncate" title="{{ $invoice->items->first()?->description ?? 'Service' }}">
                                    {{ $invoice->items->first()?->description ?? 'Game Server Hosting' }}
                                </div>
                            </td>

                            <!-- Amount -->
                            <td class="whitespace-nowrap font-bold text-white">
                                {{ $invoice->formattedTotal }}
                            </td>

                            <!-- Status Pill (Matching Image 2) -->
                            <td class="whitespace-nowrap">
                                @if ($invoice->status == 'paid')
                                    <span class="sn-badge sn-badge-success">
                                        <span class="sn-status-dot"></span>
                                        <span>Paid</span>
                                    </span>
                                @elseif ($invoice->status == 'pending')
                                    <span class="sn-badge sn-badge-warning">
                                        <span class="sn-status-dot"></span>
                                        <span>Pending</span>
                                    </span>
                                @elseif ($invoice->status == 'cancelled')
                                    <span class="sn-badge sn-badge-danger">
                                        <span class="sn-status-dot"></span>
                                        <span>Cancelled</span>
                                    </span>
                                @else
                                    <span class="sn-badge sn-badge-danger">
                                        <span class="sn-status-dot"></span>
                                        <span>Overdue</span>
                                    </span>
                                @endif
                            </td>

                            <!-- Created Date -->
                            <td class="whitespace-nowrap text-xs text-slate-400">
                                {{ $invoice->created_at->format('d M Y') }}
                            </td>

                            <!-- Due Date -->
                            <td class="whitespace-nowrap text-xs text-slate-400">
                                {{ $invoice->due_at ? $invoice->due_at->format('d M Y') : $invoice->created_at->addDays(14)->format('d M Y') }}
                            </td>

                            <!-- Actions (Pay Now pill / View) -->
                            <td class="whitespace-nowrap text-right space-x-2">
                                @if ($invoice->status == 'pending')
                                <a href="{{ route('invoices.show', $invoice) }}" wire:navigate
                                   class="sn-btn sn-btn-primary sn-btn-pill !py-1 !px-2.5 text-xs shadow-[0_0_10px_rgba(0,184,255,0.3)]">
                                    <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    <span>Pay Now</span>
                                </a>
                                @endif

                                <a href="{{ route('invoices.show', $invoice) }}" wire:navigate
                                   class="sn-btn sn-btn-secondary sn-btn-pill !py-1 !px-2.5 text-xs">
                                    <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    <span>View</span>
                                </a>
                            </td>
                        </tr>
                        @empty
                        <tr>
                            <td colspan="7" class="p-8 text-center text-slate-400 text-sm">
                                {{ __('invoices.no_invoices') }}
                            </td>
                        </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            <!-- Table Footer with Pagination (Matching Image 2) -->
            <div class="p-4 border-t border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span class="text-xs text-slate-400">
                    Showing {{ $invoices->firstItem() ?? 0 }} to {{ $invoices->lastItem() ?? 0 }} of {{ $invoices->total() ?? 0 }} invoices
                </span>

                <div>
                    {{ $invoices->links() }}
                </div>
            </div>
        </div>

        <!-- Right Side Helper Cards (Matching Image 2) -->
        <div class="space-y-5">
            <!-- Billing Help & Support Links -->
            <div class="sn-card p-5 space-y-3">
                <!-- Billing Help -->
                <div class="flex items-center justify-between p-3 rounded-xl bg-[#091120]/80 border border-cyan-500/15 hover:border-cyan-500/35 transition cursor-pointer">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center size-8 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/25">
                            <svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <div>
                            <div class="text-xs font-bold text-white">Billing Help</div>
                            <div class="text-[11px] text-slate-400">View billing guides</div>
                        </div>
                    </div>
                    <svg class="size-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>

                <!-- Contact Support -->
                @if(!config('settings.tickets_disabled', false))
                <a href="{{ route('tickets.create') }}" wire:navigate 
                   class="flex items-center justify-between p-3 rounded-xl bg-[#091120]/80 border border-cyan-500/15 hover:border-cyan-500/35 transition">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center size-8 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                            <svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <div>
                            <div class="text-xs font-bold text-white">Contact Support</div>
                            <div class="text-[11px] text-slate-400">Create a ticket</div>
                        </div>
                    </div>
                    <svg class="size-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </a>
                @endif

                <!-- Knowledgebase -->
                <a href="{{ route('tickets') }}" wire:navigate 
                   class="flex items-center justify-between p-3 rounded-xl bg-[#091120]/80 border border-cyan-500/15 hover:border-cyan-500/35 transition">
                    <div class="flex items-center gap-3">
                        <div class="flex items-center justify-center size-8 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                            <svg class="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                        </div>
                        <div>
                            <div class="text-xs font-bold text-white">Knowledgebase</div>
                            <div class="text-[11px] text-slate-400">Browse articles</div>
                        </div>
                    </div>
                    <svg class="size-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </a>
            </div>

            <!-- StashrNode Protection & Guarantee Banner (Matching Image 2) -->
            <div class="sn-card p-5 relative overflow-hidden bg-gradient-to-b from-[#0B1526] to-[#080E1A]">
                <div class="flex items-center justify-between mb-4">
                    <span class="sn-brand-title text-sm tracking-wider font-extrabold text-white uppercase">STASHRNODE</span>
                    <div class="size-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        <!-- Creeper face icon SVG -->
                        <svg class="size-4" viewBox="0 0 16 16" fill="currentColor">
                            <rect width="16" height="16" rx="2" fill="none"/>
                            <rect x="2" y="3" width="3" height="4" fill="currentColor"/>
                            <rect x="11" y="3" width="3" height="4" fill="currentColor"/>
                            <rect x="6" y="6" width="4" height="4" fill="currentColor"/>
                            <rect x="4" y="9" width="8" height="4" fill="currentColor"/>
                            <rect x="4" y="12" width="2" height="2" fill="currentColor"/>
                            <rect x="10" y="12" width="2" height="2" fill="currentColor"/>
                        </svg>
                    </div>
                </div>

                <div class="space-y-3 mb-4 text-xs">
                    <div class="flex items-center gap-2.5 text-slate-300">
                        <svg class="size-4 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                        <span>Free DDoS Protection Included</span>
                    </div>

                    <div class="flex items-center gap-2.5 text-slate-300">
                        <svg class="size-4 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="8 17 12 21 16 17"></polyline>
                            <line x1="12" y1="12" x2="12" y2="21"></line>
                            <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>
                        </svg>
                        <span>Daily Backups Included</span>
                    </div>
                </div>

                <a href="{{ route('home') }}" wire:navigate class="w-full sn-btn sn-btn-secondary !py-2 text-xs">
                    <span>View Benefits</span>
                    <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>
