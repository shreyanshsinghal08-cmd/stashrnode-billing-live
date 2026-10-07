<div class="flex flex-col gap-1.5">
    {{-- Mobile-only links --}}
    <div class="flex flex-col gap-1.5 md:hidden">
        @foreach (\App\Classes\Navigation::getLinks() as $nav)
        @if (!empty($nav['children']))
        <div x-data="{ activeAccordion: {{ $nav['active'] ? 'true' : 'false' }} }"
            class="relative w-full mx-auto overflow-hidden text-sm font-normal">
            <div class="cursor-pointer">
                <button @click="activeAccordion = !activeAccordion"
                    class="flex items-center justify-between w-full p-2.5 text-sm font-semibold whitespace-nowrap rounded-xl transition duration-200 {{ $nav['active'] ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_18px_rgba(0,184,255,0.3)] backdrop-blur-md' : 'text-slate-300 hover:text-white hover:bg-white/[0.09] hover:backdrop-blur-md hover:border-white/15' }}">
                    <div class="flex flex-row items-center gap-2.5">
                        @isset($nav['icon'])
                            <x-dynamic-component :component="$nav['icon']"
                            class="size-5 {{ $nav['active'] ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,184,255,0.6)]' : 'text-slate-300' }}" />
                        @endisset
                        <span>{{ $nav['name'] }}</span>
                    </div>
                    <x-ri-arrow-down-s-line x-bind:class="{ 'rotate-180': activeAccordion }"
                        class="size-4 text-slate-300 ease-out duration-300" />
                </button>
                <div x-show="activeAccordion" x-collapse x-cloak>
                    <div class="p-3 pl-6 flex flex-col gap-1 border-l border-cyan-400/20 ml-4 my-1">
                        @foreach ($nav['children'] as $child)
                        <x-navigation.link :href="$child['url']"
                            :spa="$child['spa'] ?? true"
                            class="{{ $child['active'] ? '!text-cyan-400 font-semibold' : '!text-slate-300 hover:!text-white' }} text-sm py-1.5 px-2 rounded-lg">
                            {{ $child['name'] }}
                        </x-navigation.link>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
        @else
        <div class="flex items-center">
            <a href="{{ $nav['url'] }}" 
                @if($nav['spa'] ?? true) wire:navigate @endif
                class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition duration-200 {{ $nav['active'] ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_18px_rgba(0,184,255,0.3)] backdrop-blur-md font-semibold' : 'text-slate-300 hover:text-white hover:bg-white/[0.09] hover:backdrop-blur-md hover:border-white/15 border border-transparent' }}">
                @isset($nav['icon'])
                    <x-dynamic-component :component="$nav['icon']"
                        class="size-5 {{ $nav['active'] ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,184,255,0.6)]' : 'text-slate-300' }}" />
                @endisset
                <span>{{ $nav['name'] }}</span>
            </a>
        </div>
        @endif
        @isset($nav['separator'])
        <div class="h-px w-full bg-white/10 my-2"></div>
        @endisset
        @endforeach
    </div>

    {{-- Dashboard & Client links --}}
    <div class="flex flex-col gap-1.5">
        @foreach (\App\Classes\Navigation::getDashboardLinks() as $nav)
        @if (!empty($nav['children']))
        <div x-data="{ activeAccordion: {{ $nav['active'] ? 'true' : 'false' }} }"
            class="relative w-full mx-auto overflow-hidden text-sm font-normal">
            <div class="cursor-pointer">
                <button @click="activeAccordion = !activeAccordion"
                    class="flex items-center justify-between w-full px-3.5 py-2.5 text-sm font-semibold whitespace-nowrap rounded-xl transition duration-200 {{ $nav['active'] ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_18px_rgba(0,184,255,0.3)] backdrop-blur-md' : 'text-slate-300 hover:text-white hover:bg-white/[0.09] hover:backdrop-blur-md hover:border-white/15' }}">
                    <div class="flex flex-row items-center gap-3">
                        @isset($nav['icon'])
                            <x-dynamic-component :component="$nav['icon']"
                                class="size-5 {{ $nav['active'] ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,184,255,0.6)]' : 'text-slate-300' }}" />
                        @endisset
                        <span>{{ $nav['name'] }}</span>
                    </div>
                    <x-ri-arrow-down-s-line x-bind:class="{ 'rotate-180': activeAccordion }"
                        class="size-4 text-slate-300 ease-out duration-300" />
                </button>
                <div x-show="activeAccordion" x-collapse x-cloak>
                    <div class="p-2 pl-4 flex flex-col gap-1 border-l border-cyan-400/20 ml-5 my-1">
                        @foreach ($nav['children'] as $child)
                            @if ($child['condition'] ?? true)
                            <x-navigation.link :href="$child['url']"
                                :spa="$child['spa'] ?? true"
                                class="{{ $child['active'] ? '!text-cyan-400 font-semibold' : '!text-slate-300 hover:!text-white' }} text-sm py-1.5 px-2 rounded-lg">
                                {{ $child['name'] }}
                            </x-navigation.link>
                            @endif
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
        @else
        <div class="flex items-center">
            <a href="{{ $nav['url'] }}" 
                @if($nav['spa'] ?? true) wire:navigate @endif
                class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition duration-200 {{ $nav['active'] ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_18px_rgba(0,184,255,0.3)] backdrop-blur-md font-semibold' : 'text-slate-300 hover:text-white hover:bg-white/[0.09] hover:backdrop-blur-md hover:border-white/15 border border-transparent' }}">
                @isset($nav['icon'])
                    <x-dynamic-component :component="$nav['icon']"
                        class="size-5 {{ $nav['active'] ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,184,255,0.6)]' : 'text-slate-300' }}" />
                @endisset
                <span>{{ $nav['name'] }}</span>
            </a>
        </div>
        @endif
        @isset($nav['separator'])
        <div class="h-px w-full bg-white/10 my-2"></div>
        @endisset
        @endforeach

        <div class="flex flex-row items-center mt-4 justify-between md:hidden px-2 pt-2 border-t border-white/10">
            <livewire:components.locale-switch />
            <x-theme-toggle />
        </div>
    </div>
</div>
