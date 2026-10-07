#!/bin/sh
set -e

# Ensure SQLite database file exists
mkdir -p /var/www/html/database
touch /var/www/html/database/database.sqlite
chmod -R 777 /var/www/html/database
chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache

# Run Migrations & Clear Caches
php artisan migrate --force || true
php artisan db:seed --class=CustomPropertySeeder --force || true
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# Execute CMD (Apache)
exec "$@"
