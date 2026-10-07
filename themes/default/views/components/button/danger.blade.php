<button 
    {{ $attributes->merge(['class' => 'sn-btn sn-btn-danger flex items-center gap-2 justify-center text-sm font-bold py-2.5 px-4 rounded-xl w-full duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50']) }}>
    @if (isset($type) && $type === 'submit')
        <div role="status" wire:loading>
            <x-ri-loader-5-fill aria-hidden="true" class="size-5 me-2 fill-current animate-spin" />
            <span class="sr-only">Loading...</span>
        </div>
        <div wire:loading.remove>
            {{ $slot }}
        </div>
    @else
        {{ $slot }}
    @endif
</button>