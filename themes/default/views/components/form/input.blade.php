@props(['name', 'label' => null, 'required' => false, 'divClass' => null, 'class' => null,'placeholder' => null, 'id' => null, 'type' => null, 'hideRequiredIndicator' => false, 'dirty' => false])
<fieldset class="flex flex-col w-full {{ $divClass ?? '' }}">
    @if ($label)
        <label for="{{ $id ?? $name }}" class="mb-1.5 text-xs font-semibold text-slate-300">
            {{ $label }}
            @if ($required && !$hideRequiredIndicator)
                <span class="text-rose-400">*</span>
            @endif
        </label>
    @endif
    <input type="{{ $type ?? 'text' }}" id="{{ $id ?? $name }}" name="{{ $name }}"
        class="block w-full text-sm text-white bg-[#0A101C]/85 border border-cyan-500/20 rounded-xl shadow-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-200 disabled:bg-[#0A101C]/40 disabled:cursor-not-allowed {{ $class ?? '' }} @if ($type !== 'color') px-3.5 py-2.5 @endif"
        placeholder="{{ $placeholder ?? ($label ?? '') }}"
        @if ($dirty && isset($attributes['wire:model'])) wire:dirty.class="!border-amber-500" @endif
        {{ $attributes->except(['placeholder', 'label', 'id', 'name', 'type', 'class', 'divClass', 'required', 'hideRequiredIndicator', 'dirty']) }} @required($required) />
    @error($name)
        <p class="text-rose-400 text-xs mt-1">{{ $message }}</p>
    @enderror
</fieldset>
