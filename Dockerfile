FROM php:8.2-apache

# Install System Dependencies & PHP Extensions (Including libicu-dev for intl)
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libonig-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd zip bcmath intl mbstring

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set Apache Document Root to /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/conf-available/*.conf

# Copy Composer from Official Image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Project Files
WORKDIR /var/www/html
COPY . .

# Install Dependencies with platform requirement bypass flag for safety
RUN composer install --no-dev --optimize-autoloader --no-interaction --ignore-platform-reqs

# Set Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80
