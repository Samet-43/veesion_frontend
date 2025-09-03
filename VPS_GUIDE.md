# 🖥️ Guide d'installation VPS - Docker, Dokploy & Traefik

## Prérequis

- VPS Ubuntu/Debian 20.04+ ou CentOS/RHEL 8+
- Accès root ou sudo
- Au moins 2GB RAM, 1 CPU, 20GB stockage

## 📋 Étapes d'installation

### Étape 1: Connexion SSH et mise à jour

```bash
# Connexion à votre VPS
ssh root@votre-ip-vps

# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation des dépendances de base
sudo apt install -y curl wget git ufw
```

### Étape 2: Installation de Docker

```bash
# Installation automatique de Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo rm get-docker.sh

# Installation de Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Ajout de votre utilisateur au groupe docker (remplacez $USER par votre username)
sudo usermod -aG docker $USER

# Démarrage et activation automatique de Docker
sudo systemctl enable docker
sudo systemctl start docker
```

### Étape 3: Installation de Dokploy

```bash
# Installation de Dokploy
curl -sSL https://dokploy.com/install.sh | sudo sh

# Vérification du statut
sudo systemctl status dokploy
```

### Étape 4: Configuration du firewall

```bash
# Activation du firewall
sudo ufw --force enable

# Autorisation des ports nécessaires
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000

# Vérification du statut
sudo ufw status
```

### Étape 5: Configuration réseau Docker

```bash
# Création du réseau pour Traefik
docker network create web
```

### Étape 6: Redémarrage et vérifications

```bash
# Redémarrage du système pour appliquer tous les changements
sudo reboot

# Après redémarrage, reconnectez-vous et vérifiez :
docker --version
docker-compose --version
docker network ls
```

## 🔧 Configuration post-installation

### Accès à Dokploy

1. Ouvrez votre navigateur : `http://votre-ip-vps:3000`
2. Suivez le wizard de configuration initial
3. Créez votre compte administrateur

### Configuration du domaine

1. Dans Dokploy, allez dans **Settings > Domains**
2. Ajoutez votre domaine
3. Configurez les DNS pour pointer vers votre VPS

### Configuration Traefik

Dokploy inclut Traefik par défaut. Pour vérifier :

```bash
# Vérifier les conteneurs Traefik
docker ps | grep traefik

# Vérifier la configuration
docker logs traefik
```

## 🚀 Déploiement de votre application

### Préparation

1. **Transférez vos fichiers** sur le VPS :

   ```bash
   # Depuis votre machine locale
   scp docker-compose.prod.yml root@votre-ip-vps:~
   scp Dockerfile root@votre-ip-vps:~
   scp nginx.conf root@votre-ip-vps:~
   ```

2. **Clonez votre projet** :
   ```bash
   git clone https://github.com/votre-repo/veesion-frontend.git
   cd veesion-frontend
   ```

### Configuration du domaine

Modifiez `docker-compose.prod.yml` :

```yaml
- "traefik.http.routers.frontend.rule=Host(`votre-domaine.com`)"
```

### Déploiement

```bash
# Build et déploiement
docker-compose -f docker-compose.prod.yml up -d --build

# Vérification
docker-compose ps
docker-compose logs -f frontend
```

## 🔒 Sécurité de base

### Changement du mot de passe root

```bash
sudo passwd root
```

### Configuration SSH

```bash
# Édition de la configuration SSH
sudo nano /etc/ssh/sshd_config

# Recherchez et modifiez :
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes

# Redémarrage SSH
sudo systemctl restart sshd
```

### Génération de clés SSH (depuis votre machine locale)

```bash
# Génération de la clé
ssh-keygen -t rsa -b 4096 -C "votre-email@example.com"

# Copie de la clé publique sur le VPS
ssh-copy-id user@votre-ip-vps
```

## 📊 Monitoring et maintenance

### Commandes utiles

```bash
# Statut des services
sudo systemctl status docker
sudo systemctl status dokploy

# Logs des applications
docker-compose logs -f

# Mise à jour des conteneurs
docker-compose pull && docker-compose up -d

# Nettoyage Docker
docker system prune -a --volumes
```

### Sauvegarde

```bash
# Sauvegarde des volumes Docker
docker run --rm -v /var/lib/docker/volumes:/volumes -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /volumes .
```

## 🆘 Dépannage

### Problèmes courants

1. **Port 80/443 occupé** :

   ```bash
   sudo netstat -tulpn | grep :80
   sudo netstat -tulpn | grep :443
   ```

2. **Dokploy ne démarre pas** :

   ```bash
   sudo systemctl restart dokploy
   sudo journalctl -u dokploy -f
   ```

3. **Traefik ne route pas** :
   ```bash
   docker logs traefik
   docker exec traefik traefik healthcheck
   ```

### Logs importants

```bash
# Logs Dokploy
sudo journalctl -u dokploy -f

# Logs Traefik
docker logs -f traefik

# Logs de votre application
docker-compose logs -f frontend
```

## 📞 Support

- **Dokploy Documentation** : https://docs.dokploy.com
- **Traefik Documentation** : https://doc.traefik.io/traefik/
- **Docker Documentation** : https://docs.docker.com

---

🎉 **Votre VPS est maintenant prêt pour le déploiement de votre application !**
