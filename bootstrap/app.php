<?php

use App\Http\Middleware\Api\AdminApi;
use App\Http\Middleware\CheckoutParameterMiddleware;
use App\Http\Middleware\EnsureUserHasPermissions;
use App\Http\Middleware\ImpersonateMiddleware;
use App\Http\Middleware\LockSession;
use App\Http\Middleware\ProxyMiddleware;
use App\Http\Middleware\ResolveUserSession;
use App\Http\Middleware\SetLocale;
use App\Models\DebugLog;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Passport\Http\Middleware\CheckTokenForAnyScope;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        // channels: __DIR__.'/../routes/channels.php',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append(ProxyMiddleware::class);
        $middleware->alias([
            'has' => EnsureUserHasPermissions::class,
            'scope' => CheckTokenForAnyScope::class,
            'api.admin' => AdminApi::class,
            'checkout' => CheckoutParameterMiddleware::class,
        ]);
        $middleware->web([
            ResolveUserSession::class,
            LockSession::class,
            ImpersonateMiddleware::class,
            SetLocale::class,
        ]);
    })
    ->withEvents(discover: [
        __DIR__ . '/../app/Extensions',
        __DIR__ . '/../app/Listeners',
    ])
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->report(function (\Throwable $exception) {
            try {
                $logPath = storage_path('logs/latest_error.txt');
                $logDir = dirname($logPath);
                if (!is_dir($logDir)) {
                    @mkdir($logDir, 0777, true);
                }
                $timestamp = date('Y-m-d H:i:s');
                $logMessage = "[{$timestamp}] Exception: {$exception->getMessage()} in {$exception->getFile()} on line {$exception->getLine()}";
                @file_put_contents($logPath, $logMessage . PHP_EOL);
            } catch (\Throwable $e) {
                // Silently avoid breaking error reporting
            }

            try {
                if (!config('settings.debug', false)) {
                    return;
                }
                DebugLog::create([
                    'type' => 'exception',
                    'context' => [
                        'message' => $exception->getMessage(),
                        'file' => $exception->getFile(),
                        'line' => $exception->getLine(),
                        'trace' => $exception->getTraceAsString(),
                    ],
                ]);
            } catch (Exception $e) {
                // Do nothing
                throw $e;
            }
        });
    })->create();
