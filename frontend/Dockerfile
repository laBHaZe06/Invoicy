# Utiliser l'image Node.js
FROM node:20.17.0-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json* ./ 

# Installer les dépendances en mode production
RUN npm ci --omit=dev

# Copier le code source de l'application
COPY . .

# Construire l'application Next.js
RUN npm run build

# Exposer le port 3000 pour Next.js
EXPOSE 3000

# Lancer l'application
CMD ["npm", "run", "start"]
