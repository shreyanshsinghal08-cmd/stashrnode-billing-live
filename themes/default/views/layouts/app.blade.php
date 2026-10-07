<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @if(in_array(app()->getLocale(), config('app.rtl_locales'))) dir="rtl" @endif class="dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>
        {{ config('app.name', 'StashrNode') }}
        @isset($title)
        - {{ $title }}
        @endisset
    </title>
    @livewireStyles
    @vite(['themes/' . config('settings.theme') . '/js/app.js', 'themes/' . config('settings.theme') . '/css/app.css'], config('settings.theme'))
    @include('layouts.colors')

    @if (config('settings.favicon'))
    <link rel="icon" href="{{ Storage::url(config('settings.favicon')) }}">
    @endif
    @isset($title)
    <meta content="{{ isset($title) ? config('app.name', 'StashrNode') . ' - ' . $title : config('app.name', 'StashrNode') }}" property="og:title">
    <meta content="{{ isset($title) ? config('app.name', 'StashrNode') . ' - ' . $title : config('app.name', 'StashrNode') }}" name="title">
    @endisset
    @isset($description)
    <meta content="{{ $description }}" property="og:description">
    <meta content="{{ $description }}" name="description">
    @endisset
    @isset($image)
    <meta content="{{ $image }}" property="og:image">
    <meta content="{{ $image }}" name="image">
    @endisset

    <meta name="theme-color" content="#0B0E14">

    {!! hook('head') !!}

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

<body class="w-full text-slate-100 min-h-screen flex flex-col antialiased dark font-sans"
    x-cloak
    x-data="{
        theme: $persist('dark').as('theme_mode'),
        systemDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
        init() {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                this.systemDark = e.matches;
            });
        },
        get isDark() {
            return true;
        }
    }"
    :class="{'dark': true}"
>
    {!! hook('body') !!}
    <x-navigation />
    <div class="w-full flex flex-grow min-h-screen">
        @if (isset($sidebar) && $sidebar)
        <x-navigation.sidebar title="$title" />
        @endif
        <div class="flex flex-col flex-grow min-w-0 transition-all duration-300 w-full">
            <main class="mt-16 grow pb-12">
                {{ $slot }}
            </main>
            <x-notification />
            <x-confirmation />
            <div class="flex">
                <x-navigation.footer />
            </div>
        </div>
        <x-impersonating />
    </div>
    @livewireScriptConfig
    {!! hook('footer') !!}
    <script src="{{ asset('js/stashrnode-glass.js') }}?v={{ time() }}" defer></script>
</body>

</html>
