@props(['href', 'spa' => true])
<a href="{{ $href }}" 
    {{ $attributes->merge(['class' => 'flex flex-row items-center px-3 py-2 gap-2 text-sm font-medium transition duration-200 ' . ($href === request()->url() ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white hover:bg-white/[0.04]')]) }} 
    @if($spa) wire:navigate @endif>
    {{ $slot }}
</a>