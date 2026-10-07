#!/bin/sh
set -e

# Create database directory if not exists
mkdir -p /var/www/html/database

# Create the sqlite file if not exists
touch /var/www/html/database/database.sqlite

# FORCE PERMISSIONS
chmod -R 777 /var/www/html/database
chmod 666 /var/www/html/database/database.sqlite
chmod -R 777 /var/www/html/storage
chmod -R 777 /var/www/html/bootstrap/cache

# Fix ownership
chown -R www-data:www-data /var/www/html/database
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache

# CLEAR COMPILED BLADE VIEWS AND FRAMEWORK CACHES (CRITICAL FIX)
rm -rf /var/www/html/storage/framework/views/*
php artisan view:clear
php artisan config:clear
php artisan cache:clear
php artisan route:clear

# Run Migrations & Seeds
php artisan migrate --force || true
php artisan db:seed --class=CustomPropertySeeder --force || true

exec "$@"
