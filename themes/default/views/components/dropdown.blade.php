@props([
    'width' => null,
    'content' => null,
    'trigger' => null,
    'showArrow' => true,
])
<div class="relative" x-data="{ open: false, adjustWidth: 0 }" x-init="$watch('open', value => {
    if (value) {
        adjustWidth = 0;
        $nextTick(() => {
            let dropdown = $refs.dropdown;
            let rect = dropdown.getBoundingClientRect();
            let windowWidth = window.innerWidth;
            adjustWidth = rect.right > windowWidth ? rect.width - 40 : 0;
        });
    }
})">

    <button
        class="flex flex-row items-center px-2 py-1 text-sm font-semibold whitespace-nowrap text-slate-200 hover:text-white"
        x-on:click="open = !open">
        {{ $trigger }}
        @if($showArrow)
        <x-ri-arrow-down-s-line x-bind:class="{ '-rotate-180' : open }"
            class="md:block hidden size-4 text-cyan-400 ease-out duration-300 ml-1" />
        @endif
    </button>

    <div x-ref="dropdown"
        class="absolute mt-2 {{ $width ?? 'w-56' }} p-1.5 bg-[#0D1526]/95 backdrop-blur-2xl rounded-xl shadow-2xl z-50 border border-cyan-500/20"
        x-bind:style="{
            left: `-${adjustWidth}px`,
        }"
        x-show="open"
        x-transition:enter="transition ease-out duration-150" x-transition:enter-start="opacity-0 scale-95"
        x-transition:enter-end="opacity-100 scale-100" x-transition:leave="transition ease-in duration-75"
        x-transition:leave-start="opacity-100 scale-100" x-transition:leave-end="opacity-0 scale-95"
        x-on:click.outside="open = false" x-cloak>
        {{ $content }}
    </div>
</div>