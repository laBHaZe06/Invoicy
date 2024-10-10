# Utiliser l'image Node.js
FROM node:20.17.0-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et installer les dépendances
COPY package.json ./
RUN npm install

# Copier le code source
COPY . .

RUN chown -R root:root /app

# Construire l'application Next.js
RUN npm run build

# Exposer le port 3000 pour Next.js
EXPOSE 3000

# Lancer l'application
CMD ["next","start"]