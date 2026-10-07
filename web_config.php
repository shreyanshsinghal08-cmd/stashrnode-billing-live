<?php
/**
 * StashrNode / Paymenter - Server Configuration & Deployment Diagnostic File
 * Domain Target: https://webfluxdesign.in/billing/public
 * Target Environment: cPanel Shared Hosting (Apache + PHP 8.2 / 8.3 + MySQL)
 */

return [
    'app' => [
        'name'        => 'StashrNode',
        'env'         => 'production',
        'debug'       => false,
        'url'         => 'https://webfluxdesign.in/billing/public',
        'asset_url'   => 'https://webfluxdesign.in/billing/public',
        'subfolder'   => '/billing/public',
        'timezone'    => 'UTC',
    ],

    'server' => [
        'required_php_version' => '8.2.0',
        'required_extensions'  => [
            'bcmath',
            'ctype',
            'curl',
            'dom',
            'fileinfo',
            'gd',
            'json',
            'mbstring',
            'openssl',
            'pcre',
            'pdo',
            'pdo_mysql',
            'tokenizer',
            'xml',
        ],
        'writable_directories' => [
            'storage',
            'storage/app',
            'storage/framework',
            'storage/framework/cache',
            'storage/framework/sessions',
            'storage/framework/views',
            'storage/logs',
            'bootstrap/cache',
        ],
        'cron_command' => '* * * * * cd /home/USERNAME/public_html/billing && php artisan schedule:run >> /dev/null 2>&1',
    ],

    'cpanel_instructions' => [
        'upload_path'  => 'public_html/billing (or your subdomain directory)',
        'database_sql' => 'database.sql (import via phpMyAdmin)',
        'file_permissions' => [
            'folders' => '0755',
            'files'   => '0644',
            'storage' => '0775 or 0755 (must be writable by web server)',
        ],
    ],
];
