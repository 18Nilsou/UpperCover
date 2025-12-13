FROM node:20-alpine

# Installer les dépendances système requises
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Démarrer l'application en mode dev
CMD ["npm", "run", "dev"]
