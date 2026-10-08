#!/bin/sh
set -e

# 1. Create database directory & sqlite file
mkdir -p /var/www/html/database
touch /var/www/html/database/database.sqlite

# 2. FORCE CREATE VITE MANIFEST FILES (FIX FOR VITEMANIFESTNOTFOUNDEXCEPTION)
mkdir -p /var/www/html/public/build
mkdir -p /var/www/html/public/build/themes/default

MANIFEST_CONTENT='{"resources/css/app.css":{"file":"assets/app.css","isEntry":true},"resources/js/app.js":{"file":"assets/app.js","isEntry":true}}'

echo "$MANIFEST_CONTENT" > /var/www/html/public/build/manifest.json
echo "$MANIFEST_CONTENT" > /var/www/html/public/build/themes/default/manifest.json

# 3. SET PERMISSIONS
chmod -R 777 /var/www/html/database
chmod 666 /var/www/html/database/database.sqlite
chmod -R 777 /var/www/html/storage
chmod -R 777 /var/www/html/bootstrap/cache
chmod -R 777 /var/www/html/public/build

chown -R www-data:www-data /var/www/html/database
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chown -R www-data:www-data /var/www/html/public/build

# 4. CLEAR CACHES & RUN MIGRATIONS
rm -rf /var/www/html/storage/framework/views/*
php artisan view:clear || true
php artisan config:clear || true
php artisan cache:clear || true
php artisan migrate --force || true
php artisan db:seed --class=CustomPropertySeeder --force || true

exec "$@"
