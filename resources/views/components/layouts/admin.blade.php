<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'StashrNode') }} Admin - Minecraft Hosting Portal</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/stashrnode-premium.css') }}?v={{ time() }}">
    <link rel="stylesheet" href="{{ asset('css/stashrnode-glass.css') }}?v={{ time() }}">
    <style>
      body {
        background-image: linear-gradient(rgba(10, 14, 23, 0.42), rgba(10, 14, 23, 0.42)), url('{{ asset('images/bg-main.jpg') }}') !important;
      }
    </style>
</head>
<body class="min-h-screen text-base antialiased text-slate-100">
    <header class="p-4 flex items-center justify-between border-b border-white/10 bg-[#0F121C]/45 backdrop-blur-2xl">
        <div class="flex items-center gap-3">
            <button type="button" id="sn-hamburger-btn" class="sn-hamburger-toggle shrink-0" aria-label="Toggle Navigation" title="Toggle Navigation" onclick="window.snToggleSidebar()">
                <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
            </button>
            <div class="sn-brand-header-container flex items-center gap-3 ml-1">
                <div class="flex items-center justify-center size-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 shadow-[0_0_12px_rgba(0,184,255,0.3)]">
                    <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" fill="rgba(0,184,255,0.3)"/>
                        <polyline points="2 17 12 22 22 17"/>
                        <polyline points="2 12 12 17 22 12"/>
                    </svg>
                </div>
                <div class="flex flex-col">
                    <span class="sn-brand-title text-lg tracking-tight">StashrNode</span>
                    <span class="text-xs text-cyan-400 font-medium">Admin Portal</span>
                </div>
            </div>
        </div>
    </header>

    <main class="p-6 max-w-7xl mx-auto">
        {{ $slot ?? '' }}
        @yield('content')
    </main>
    <script src="{{ asset('js/stashrnode-glass.js') }}?v={{ time() }}" defer></script>
</body>
</html>
