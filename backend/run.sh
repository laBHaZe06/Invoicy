#!/bin/bash

set -euo pipefail

# Définition des couleurs
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
NC="\033[0m"

log_message() {
    echo -e "${GREEN}▶ $1${NC}"
}

error_message() {
    echo -e "${RED}[ERROR] $1${NC}"
}

# Vérifier si Composer et Symfony CLI sont installés
command -v composer >/dev/null 2>&1 || { error_message "Composer n'est pas installé."; exit 1; }
command -v symfony >/dev/null 2>&1 || { error_message "Symfony CLI n'est pas installé."; exit 1; }

# Vérifier si les dépendances sont déjà installées
if [ ! -d "vendor" ] || [ -n "$(composer install --dry-run 2>&1 | grep 'Would install')" ]; then
    log_message "Installation ou mise à jour des dépendances..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
else
    log_message "Les dépendances sont déjà installées, pas de mise à jour nécessaire."
fi

# Vérification de la base de données
log_message "Vérification de la base de données..."
symfony console doctrine:database:create --if-not-exists --quiet

# Exécution des migrations si nécessaire
log_message "Vérification des migrations..."
symfony console doctrine:migrations:migrate --no-interaction --allow-no-migration --quiet

# Nettoyage et préchauffage du cache avec gestion des erreurs
log_message "Nettoyage du cache..."
if ! symfony console cache:clear --no-interaction; then
    error_message "Le nettoyage du cache a échoué, mais le script continue."
fi

log_message "Péchauffage du cache..."
if ! symfony console cache:warmup; then
    error_message "Le préchauffage du cache a échoué, mais le script continue."
fi

# Vérifier si le serveur Symfony tourne déjà sur le port 8000
if lsof -i :8000 >/dev/null 2>&1; then
    log_message "Le serveur Symfony tourne déjà sur le port 8000."
else
    log_message "Démarrage du serveur Symfony..."
    symfony serve --no-tls --port=8000 --allow-all-ip --dir=public
fi
