# Docker Configuration pour Veesion Frontend

Ce guide explique comment déployer l'application frontend avec Docker, Traefik et Dokploy.

## Prérequis

- Docker et Docker Compose installés
- Traefik configuré avec Dokploy
- Un domaine configuré

## Fichiers créés

- `Dockerfile` : Configuration de build multi-stage pour optimiser la taille de l'image
- `nginx.conf` : Configuration Nginx pour le routing React et la compression
- `docker-compose.yml` : Configuration de base avec labels Traefik
- `docker-compose.prod.yml` : Configuration optimisée pour la production
- `.dockerignore` : Optimisation du build en excluant les fichiers inutiles

## Configuration requise

### 1. Modifier le domaine dans docker-compose.prod.yml

Remplacez `your-domain.com` par votre domaine réel :

```yaml
- "traefik.http.routers.frontend.rule=Host(`votre-domaine.com`)"
```

### 2. Créer le réseau externe

Assurez-vous que le réseau `web` existe :

```bash
docker network create web
```

### 3. Configuration Traefik

Assurez-vous que Traefik est configuré avec :

- Entrypoint `websecure` sur le port 443
- Certificat resolver `letsencrypt` configuré
- Middleware `security-headers` défini

## Déploiement

### Pour la production :

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Pour le développement/test :

```bash
docker-compose up -d
```

## Commandes utiles

```bash
# Construire l'image
docker-compose build

# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f frontend

# Redémarrer un service
docker-compose restart frontend
```

## Optimisations appliquées

- **Multi-stage build** : Réduit la taille finale de l'image
- **Nginx** : Serveur web optimisé pour les fichiers statiques
- **Compression Gzip** : Réduction de la taille des réponses
- **Cache des assets statiques** : Amélioration des performances
- **Headers de sécurité** : Protection XSS et autres attaques
- **Health checks** : Monitoring de la disponibilité du service

## Variables d'environnement

L'application utilise les variables suivantes :

- `NODE_ENV=production` : Mode de production activé

## Ressources

- **CPU** : 1.0 core max, 0.5 réservé
- **Mémoire** : 512MB max, 256MB réservé

## Monitoring

Le service inclut des health checks automatiques et des logs structurés pour faciliter le monitoring avec Dokploy.
