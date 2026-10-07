<nav class="w-full px-4 lg:px-6 bg-[#0F121C]/45 backdrop-blur-2xl border-b border-white/10 md:h-16 flex md:flex-row flex-col justify-between fixed top-0 z-20 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
    <div
        x-data="{ 
            slideOverOpen: false,
            hasAside: !!document.getElementById('main-aside')
        }"
        x-init="$watch('slideOverOpen', value => { document.documentElement.style.overflow = value ? 'hidden' : '' }); $nextTick(() => { hasAside = !!document.getElementById('main-aside') })"
        class="relative z-50 w-full h-auto">
        <div class="flex flex-row items-center justify-between h-16 w-full gap-4">

            <!-- Left / Center Section: Hamburger + Logo + Search -->
            <div class="flex flex-row items-center gap-3 sm:gap-4 flex-1">
                <!-- Floating Hamburger Button -->
                <button type="button" id="sn-hamburger-btn" class="sn-hamburger-toggle shrink-0" aria-label="Toggle Navigation Menu" title="Toggle Navigation" onclick="window.snToggleSidebar()">
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>

                <!-- Brand logo with proper left spacing -->
                <div class="sn-brand-header-container flex flex-row items-center ml-2 sm:ml-4 pl-1">
                    <a href="{{ route('home') }}" class="flex flex-row items-center h-10 gap-2.5 group" wire:navigate>
                        <div class="flex items-center justify-center size-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 shadow-[0_0_12px_rgba(0,184,255,0.35)]">
                            <svg class="size-4.5 drop-shadow-[0_0_6px_rgba(0,184,255,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m14 7 3-3 4 4-3 3"/>
                                <path d="m5 19 8-8"/>
                                <path d="m10 9 2 2"/>
                                <path d="m2 22 3-3"/>
                            </svg>
                        </div>
                        <span class="sn-brand-title text-lg tracking-tight text-white font-extrabold group-hover:text-cyan-300 transition duration-200">StashrNode</span>
                    </a>
                </div>

                <!-- Floating Frosted Search Bar -->
                <div class="hidden md:flex items-center flex-1 max-w-md ml-2">
                    <div class="sn-search-bar w-full !bg-white/[0.05] !border-white/15 !backdrop-blur-md">
                        <svg class="size-4 text-cyan-400/80 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" placeholder="Search anything..." readonly onclick="window.dispatchEvent(new CustomEvent('open-global-search'))" class="cursor-pointer" />
                        <span class="sn-shortcut-badge !bg-white/10 !text-slate-300 !border-white/10">#K</span>
                    </div>
                </div>

                <!-- Quick Action Buttons -->
                <div class="hidden xl:flex items-center gap-2">
                    <a href="{{ route('home') }}" wire:navigate class="flex items-center justify-center size-8 rounded-xl bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,184,255,0.35)] transition" title="Add Service">
                        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </a>
                    @if(auth()->check() && auth()->user()->role_id !== null)
                    <a href="{{ route('filament.admin.pages.dashboard') }}" class="flex items-center justify-center size-8 rounded-xl bg-white/[0.05] border border-white/15 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/30 hover:bg-white/[0.08] transition" title="Admin Portal">
                        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                        </svg>
                    </a>
                    @endif
                </div>

                <!-- Navigation Links (when no sidebar) -->
                <div :class="hasAside ? 'hidden' : 'hidden md:flex'" class="flex-row items-center ml-4 gap-1">
                    @foreach (\App\Classes\Navigation::getLinks() as $nav)
                    @if (isset($nav['children']) && count($nav['children']) > 0)
                    <div class="relative">
                        <x-dropdown>
                            <x-slot:trigger>
                                <div class="flex flex-col">
                                    <span class="flex flex-row items-center px-3 py-2 text-sm font-medium whitespace-nowrap text-slate-200 hover:text-white hover:bg-white/[0.08] rounded-xl transition">
                                        {{ $nav['name'] }}
                                    </span>
                                </div>
                            </x-slot:trigger>
                            <x-slot:content>
                                @foreach ($nav['children'] as $child)
                                <x-navigation.link
                                    :href="$child['url']"
                                    :spa="isset($child['spa']) ? $nav['spa'] : true">
                                    {{ $child['name'] }}
                                </x-navigation.link>
                                @endforeach
                            </x-slot:content>
                        </x-dropdown>
                    </div>
                    @else
                    <x-navigation.link
                        :href="$nav['url']"
                        :spa="isset($nav['spa']) ? $nav['spa'] : true"
                        class="px-3 py-2 rounded-xl text-sm font-medium">
                        {{ $nav['name'] }}
                    </x-navigation.link>
                    @endif
                    @endforeach
                </div>
            </div>

            <!-- Right Controls: Cart, Notifications, Steve Avatar Profile -->
            <div class="flex flex-row items-center gap-3">
                <livewire:components.cart />

                <div class="items-center hidden sm:flex gap-1">
                    <livewire:components.locale-switch />
                </div>

                @if(auth()->check())
                <div class="flex items-center">
                    <livewire:components.notifications />
                </div>

                <!-- User Profile Glass Capsule -->
                <div class="hidden lg:flex items-center">
                    <x-dropdown :showArrow="false">
                        <x-slot:trigger>
                            <div class="flex items-center gap-2.5 px-2.5 py-1.5 rounded-full bg-white/[0.05] border border-white/15 hover:border-cyan-400/40 hover:bg-white/[0.09] backdrop-blur-md transition duration-200 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                                <div class="relative size-7 rounded-lg overflow-hidden border border-cyan-400/40 bg-slate-900 shadow-[0_0_8px_rgba(0,184,255,0.3)] shrink-0">
                                    <img src="{{ auth()->user()->avatar }}" class="size-full object-cover" alt="{{ auth()->user()->name }}" 
                                         onerror="this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 32 32\'><rect width=\'32\' height=\'32\' fill=\'%2300B8FF\'/><rect x=\'8\' y=\'10\' width=\'4\' height=\'4\' fill=\'%23fff\'/><rect x=\'20\' y=\'10\' width=\'4\' height=\'4\' fill=\'%23fff\'/><rect x=\'10\' y=\'10\' width=\'2\' height=\'4\' fill=\'%230B0E14\'/><rect x=\'20\' y=\'10\' width=\'2\' height=\'4\' fill=\'%230B0E14\'/><rect x=\'12\' y=\'18\' width=\'8\' height=\'3\' fill=\'%23fff\'/></svg>'" />
                                </div>
                                <span class="text-sm font-semibold text-slate-200 pr-1 max-w-[120px] truncate">{{ auth()->user()->name }}</span>
                                <svg class="size-3.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        </x-slot:trigger>
                        <x-slot:content>
                            <div class="flex flex-col p-3 border-b border-white/10">
                                <span class="text-sm font-bold text-white break-words">{{ auth()->user()->name }}</span>
                                <span class="text-xs text-slate-300 break-words mt-0.5">{{ auth()->user()->email }}</span>
                            </div>
                            <div class="py-1">
                                @foreach (\App\Classes\Navigation::getAccountDropdownLinks() as $nav)
                                <x-navigation.link :href="$nav['url']" :spa="isset($nav['spa']) ? $nav['spa'] : true">
                                    {{ $nav['name'] }}
                                </x-navigation.link>
                                @endforeach
                            </div>
                            <div class="pt-1 border-t border-white/10">
                                <livewire:auth.logout />
                            </div>
                        </x-slot:content>
                    </x-dropdown>
                </div>
                @else
                <div class="hidden lg:flex flex-row items-center gap-2.5">
                    <a href="{{ route('login') }}" wire:navigate>
                        <button class="sn-btn sn-btn-secondary !py-1.5 !px-3.5 text-sm !bg-white/[0.06] !border-white/15 !backdrop-blur-md">
                            {{ __('navigation.login') }}
                        </button>
                    </a>
                    @if(!config('settings.registration_disabled', false))
                    <a href="{{ route('register') }}" wire:navigate>
                        <button class="sn-btn sn-btn-primary !py-1.5 !px-3.5 text-sm">
                            {{ __('navigation.register') }}
                        </button>
                    </a>
                    @endif
                </div>
                @endif

                <!-- Mobile Menu Button -->
                <button
                    @click="slideOverOpen = !slideOverOpen"
                    class="relative size-9 flex lg:hidden items-center justify-center rounded-xl bg-white/[0.06] border border-white/15 text-slate-200 hover:text-cyan-400 transition"
                    aria-label="Toggle Menu">
                    <span x-show="!slideOverOpen">
                        <x-ri-menu-fill class="size-5" />
                    </span>
                    <span x-show="slideOverOpen">
                        <x-ri-close-fill class="size-5" />
                    </span>
                </button>
            </div>
        </div>

        <!-- Mobile Drawer in Frosted Glass -->
        <template x-teleport="body">
            <div
                x-show="slideOverOpen"
                @keydown.window.escape="slideOverOpen=false"
                x-cloak
                class="fixed left-0 right-0 top-16 w-full z-[99]"
                style="height:calc(100dvh - 4rem);"
                aria-modal="true"
                tabindex="-1">
                <div
                    x-show="slideOverOpen"
                    @click.away="slideOverOpen = false"
                    x-transition.opacity.duration.300ms
                    class="absolute inset-0 bg-[#0F0F19]/90 backdrop-blur-2xl border-t border-white/10 shadow-2xl overflow-y-auto flex flex-col">

                    <div class="flex flex-col h-full p-4">
                        <div class="flex-1 min-h-0 overflow-y-auto">
                            <x-navigation.sidebar-links />
                        </div>
                        <div class="mt-5 pt-4 border-t border-white/10">
                            @if(auth()->check())
                            <div class="flex items-center gap-3 p-3 rounded-xl bg-white/[0.05] border border-white/15 mb-3">
                                <img src="{{ auth()->user()->avatar }}" class="size-10 rounded-lg border border-cyan-400/40" alt="avatar" />
                                <div class="flex flex-col">
                                    <span class="font-bold text-sm text-white">{{ auth()->user()->name }}</span>
                                    <span class="text-xs text-slate-300">{{ auth()->user()->email }}</span>
                                </div>
                            </div>
                            <div class="flex flex-col gap-1">
                                @foreach (\App\Classes\Navigation::getAccountDropdownLinks() as $nav)
                                <x-navigation.link :href="$nav['url']" :spa="isset($nav['spa']) ? $nav['spa'] : true">
                                    {{ $nav['name'] }}
                                </x-navigation.link>
                                @endforeach
                                <livewire:auth.logout />
                            </div>
                            @else
                            <div class="flex flex-col gap-2.5">
                                <a href="{{ route('login') }}" wire:navigate>
                                    <button class="sn-btn sn-btn-secondary w-full !bg-white/[0.06]">{{ __('navigation.login') }}</button>
                                </a>
                                @if(!config('settings.registration_disabled', false))
                                <a href="{{ route('register') }}" wire:navigate>
                                    <button class="sn-btn sn-btn-primary w-full">{{ __('navigation.register') }}</button>
                                </a>
                                @endif
                            </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</nav>
