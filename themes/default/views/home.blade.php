<div class="space-y-8">
    <div class="flex flex-col gap-6">
        <!-- Hero Section -->
        <div class="w-full sn-card p-8 sm:p-14 border-b border-cyan-500/15 relative overflow-hidden bg-gradient-to-b from-[#0D1526]/90 via-[#0B101C]/80 to-[#080C14]">
            <div class="absolute -top-24 -left-24 size-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
            <div class="absolute -bottom-24 -right-24 size-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
            
            <div class="container mx-auto relative z-10">
                <article class="prose dark:prose-invert max-w-full text-slate-200">
                    {!! Str::markdown(theme('home_page_text', 'Welcome to StashrNode'), [
                    'allow_unsafe_links' => false,
                    'renderer' => [
                    'soft_break' => "<br>"
                    ]]) !!}
                </article>
            </div>
        </div>

        <!-- Services / Categories Section -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 mt-2 flex flex-col gap-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="text-2xl font-extrabold text-white tracking-tight">Game Server Categories</h2>
                    <p class="text-sm text-slate-400 mt-1">High-performance hosting powered by modern hardware</p>
                </div>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                @foreach ($categories as $category)
                <div class="flex flex-col sn-card p-5 group hover:border-cyan-500/40 transition duration-300">
                    @if(theme('small_images', false))
                    <div class="flex gap-x-3 items-center">
                    @endif
                        @if ($category->image)
                        <div class="relative overflow-hidden rounded-xl mb-4 border border-cyan-500/15 group-hover:border-cyan-500/30 transition">
                            <img src="{{ Storage::url($category->image) }}" alt="{{ $category->name }}"
                                class="aspect-video rounded-xl {{ theme('small_images', false) ? 'w-14 h-fit' : 'w-full object-cover object-center group-hover:scale-105 transition duration-300' }}">
                        </div>
                        @else
                        <div class="aspect-video rounded-xl mb-4 bg-gradient-to-br from-[#0E1A30] to-[#070D18] border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,184,255,0.25)] transition">
                            <svg class="size-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                                <polyline points="2 17 12 22 22 17"/>
                                <polyline points="2 12 12 17 22 12"/>
                            </svg>
                        </div>
                        @endif
                        
                        <div class="flex justify-between items-center mb-1">
                            <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition">{{ $category->name }}</h3>
                        </div>

                    @if(theme('small_images', false))
                    </div>
                    @endif

                    @if(theme('show_category_description', true))
                    <article class="prose dark:prose-invert text-xs text-slate-400 line-clamp-2 mb-4">
                        {!! $category->description !!}
                    </article>
                    @endif

                    <a href="{{ route('category.show', ['category' => $category->slug]) }}" wire:navigate class="mt-auto pt-2">
                        <x-button.primary>
                            <span>{{ __('common.button.view_all') }}</span>
                            <x-ri-arrow-right-fill class="size-4" />
                        </x-button.primary>
                    </a>
                </div>
                @endforeach
            </div>
        </div>
    </div>
    {!! hook('pages.home') !!}
</div>
