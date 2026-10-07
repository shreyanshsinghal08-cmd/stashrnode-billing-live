<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'StashrNode') }} - Minecraft Hosting Portal</title>

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
<body class="min-h-screen text-base antialiased flex flex-col justify-center items-center p-6 text-slate-100">
    <div class="mb-8 text-center flex flex-col items-center">
        <div class="flex items-center justify-center size-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 shadow-[0_0_20px_rgba(0,184,255,0.4)] mb-3">
            <svg class="size-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" fill="rgba(0,184,255,0.3)"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
            </svg>
        </div>
        <span class="sn-brand-title text-2xl tracking-tight">StashrNode</span>
        <div class="text-sm text-cyan-400 font-medium mt-1">Minecraft Hosting Portal</div>
    </div>

    <div class="w-full sm:max-w-md sn-card p-8">
        {{ $slot ?? '' }}
        @yield('content')
    </div>
    <script src="{{ asset('js/stashrnode-glass.js') }}?v={{ time() }}" defer></script>
</body>
</html>
