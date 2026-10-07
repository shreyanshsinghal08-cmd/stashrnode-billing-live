#!/bin/sh
set -e

export DB_CONNECTION=sqlite

# Create database directory if not exists
mkdir -p /var/www/html/database

# Create the sqlite file if not exists
touch /var/www/html/database/database.sqlite

# FORCE 777 PERMISSIONS (Read/Write/Execute for everyone)
chmod -R 777 /var/www/html/database
chmod 666 /var/www/html/database/database.sqlite
chmod -R 777 /var/www/html/storage
chmod -R 777 /var/www/html/bootstrap/cache

# Fix ownership to web server user
chown -R www-data:www-data /var/www/html/database
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache

# Run Migrations
php artisan migrate --force || true
php artisan db:seed --class=CustomPropertySeeder --force || true

# Re-apply ownership and permissions after migrations (in case artisan ran as root)
chown -R www-data:www-data /var/www/html/database /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 777 /var/www/html/database /var/www/html/storage /var/www/html/bootstrap/cache
chmod 666 /var/www/html/database/database.sqlite

# Clear Caches
php artisan config:clear
php artisan cache:clear

exec "$@"
