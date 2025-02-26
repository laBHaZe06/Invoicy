FROM php:8.2-apache

WORKDIR /var/www/backend

# Configuration du serveur Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Installation des dépendances
RUN apt-get update && apt-get install -qq -y --no-install-recommends \
    cron \
    wget \
    nano \
    locales \
    coreutils \
    apt-utils \
    git \
    libicu-dev \
    g++ \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    libonig-dev \
    libxslt-dev \
    libcurl4-openssl-dev \
    libgd-dev \
    libc-client-dev \
    libssl-dev \
    libkrb5-dev

# Installation des extensions PHP et activation des modules Apache
RUN docker-php-ext-install curl pdo pdo_mysql mysqli gd opcache intl zip calendar dom mbstring gd xsl && a2enmod rewrite

# Génération des locales
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
    echo "fr_FR.UTF-8 UTF-8" >> /etc/locale.gen && \
    locale-gen

# Installation de Composer
RUN curl -sSk https://getcomposer.org/installer | php -- --disable-tls && \
    mv composer.phar /usr/local/bin/composer

# Installation de Symfony CLI
RUN wget https://get.symfony.com/cli/installer -O - | bash && \
    mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Configuration et installation des extensions supplémentaires
RUN docker-php-ext-configure intl && \
    docker-php-ext-install pdo pdo_mysql mysqli gd opcache intl zip calendar dom mbstring gd xsl && \
    a2enmod rewrite && \
    docker-php-ext-configure imap --with-kerberos --with-imap-ssl && \
    docker-php-ext-install imap && \
    pecl install apcu && docker-php-ext-enable apcu

# Utilisation de l'installateur mlocati pour des extensions supplémentaires
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
    sync && \
    install-php-extensions amqp

# Installation et activation de Xdebug
RUN pecl install xdebug && docker-php-ext-enable xdebug
RUN echo 'memory_limit = 10G' > /usr/local/etc/php/conf.d/php.ini

# Configuration de Xdebug
COPY ./config/xdebug.ini /etc/php/8.2/apache2/conf.d/30-xdebug.ini
COPY ./config/xdebug.ini /etc/php/8.2/cli/conf.d/30-xdebug.ini

# Copie du code source et du script run.sh
COPY . /var/www/backend

# Attribution des droits appropriés

# Ajout des permissions d'exécution au script run.sh
RUN chown -R www-data:www-data /var/www/backend
RUN chmod +x /var/www/backend/run.sh

EXPOSE 8000

#run the script run.sh with the following permissions 
CMD ["/bin/bash", "-c", "/var/www/backend/run.sh"]

