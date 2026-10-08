<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class ErrorHandler extends Handler
{
    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $e
     * @return void
     *
     * @throws \Throwable
     */
    public function report(\Throwable $e)
    {
        try {
            $logPath = storage_path('logs/latest_error.txt');
            $logDir = dirname($logPath);
            if (!is_dir($logDir)) {
                @mkdir($logDir, 0777, true);
            }
            $timestamp = date('Y-m-d H:i:s');
            $logMessage = "[{$timestamp}] Exception: {$e->getMessage()} in {$e->getFile()} on line {$e->getLine()}";
            @file_put_contents($logPath, $logMessage . PHP_EOL);
        } catch (\Throwable $ex) {
            // Silently avoid breaking error reporting
        }

        parent::report($e);
    }

    // We are overriding this method to change the view namespace separator from '::' to '.' (so themes can override error views)
    /**
     * Get the view used to render HTTP exceptions.
     *
     * @return string|null
     */
    protected function getHttpExceptionView(HttpExceptionInterface $e)
    {
        $view = 'errors.' . $e->getStatusCode();

        if (view()->exists($view)) {
            return $view;
        }

        $view = substr($view, 0, -2) . 'xx';

        if (view()->exists($view)) {
            return $view;
        }

        return null;
    }
}
