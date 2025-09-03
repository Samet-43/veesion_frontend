#!/bin/bash

# Script d'installation complète pour VPS avec Docker, Dokploy et Traefik
# À exécuter en tant que root ou avec sudo

set -e

echo "🚀 Début de l'installation complète..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_step() {
    echo -e "${GREEN}[ÉTAPE]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[ATTENTION]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERREUR]${NC} $1"
}

# Étape 1: Mise à jour du système
print_step "1. Mise à jour du système..."
apt update && apt upgrade -y
apt install -y curl wget git ufw

# Étape 2: Installation de Docker
print_step "2. Installation de Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# Installation de Docker Compose
print_step "Installation de Docker Compose..."
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Étape 3: Configuration Docker
print_step "3. Configuration Docker..."
usermod -aG docker $USER
systemctl enable docker
systemctl start docker

# Étape 4: Installation de Dokploy
print_step "4. Installation de Dokploy..."
curl -sSL https://dokploy.com/install.sh | sh

# Étape 5: Configuration du firewall
print_step "5. Configuration du firewall..."
ufw --force enable
ufw allow ssh
ufw allow 80
ufw allow 443
ufw allow 3000  # Port Dokploy

# Étape 6: Création du réseau Docker
print_step "6. Création du réseau web pour Traefik..."
docker network create web 2>/dev/null || true

# Étape 7: Vérification des installations
print_step "7. Vérification des installations..."

# Vérifier Docker
if docker --version >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Docker installé:$(docker --version)${NC}"
else
    print_error "Docker n'est pas installé correctement"
fi

# Vérifier Docker Compose
if docker-compose --version >/dev/null 2>&1; then
    echo -e "${GREEN}✓ Docker Compose installé:$(docker-compose --version)${NC}"
else
    print_error "Docker Compose n'est pas installé correctement"
fi

# Vérifier Dokploy
if systemctl is-active --quiet dokploy; then
    echo -e "${GREEN}✓ Dokploy est actif${NC}"
else
    print_warning "Dokploy pourrait ne pas être actif, vérifiez avec: sudo systemctl status dokploy"
fi

print_step "Installation terminée !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Redémarrez votre session SSH pour que Docker soit disponible sans sudo"
echo "2. Accédez à Dokploy sur http://votre-ip:3000"
echo "3. Configurez votre domaine dans Dokploy"
echo "4. Déployez votre application avec le docker-compose fourni"
echo ""
print_warning "N'oubliez pas de :"
echo "- Changer le mot de passe root par défaut"
echo "- Configurer SSH key au lieu du mot de passe"
echo "- Sauvegarder vos données importantes"
