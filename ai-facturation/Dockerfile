# # Utiliser une image Python officielle comme image de base
# FROM python:3.9-slim

# # Définir le répertoire de travail à l'intérieur du conteneur
# WORKDIR /var/www/ai

# # Copier le fichier requirements.txt dans le conteneur
# COPY ./requirements.txt /var/www/ai/requirements.txt

# RUN  python3 -m venv .venv 

# RUN pip install "fastapi[standard]"

# # Installer les dépendances Python spécifiées dans requirements.txt
# RUN pip install --no-cache-dir -r requirements.txt

# # Copier le répertoire 'app' contenant ton code source dans le conteneur
# COPY ./ai/app /var/www/ai/app

# # Exposer le port 80 pour accéder à l'application
# EXPOSE 5000

# # Définir la commande par défaut pour exécuter l'application avec Uvicorn
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
# Utiliser l'image officielle de Python
FROM python:3.13-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /var/www/ai

# Copier tout le contenu du répertoire courant dans le conteneur
COPY . .

COPY ./requirements.txt /var/www/ai/requirements.txt


# Installer les dépendances système nécessaires
RUN apk add --no-cache gcc musl-dev linux-headers
# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt
# Installer FastAPI et Uvicorn
RUN pip install fastapi uvicorn
# Installer les dépendances supplémentaires
RUN pip install aiofiles python-multipart
# Installer les dépendances pour le traitement des fichiers Excel
RUN pip install pandas
# Installer les dépendances pour le traitement des fichiers PDF

RUN pip install pandas

# Exposer le port 5000
EXPOSE 5000

# Commande pour exécuter le fichier Python
CMD ["python3", "main.py"]