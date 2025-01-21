# Invoicy - SaaS de Facturation pour Freelances

Invoicy est une solution de facturation en ligne simple et intuitive, conçue pour les freelances. Ce projet combine un backend Symfony avec une interface frontend réalisée avec Next.js. L'objectif de ce projet est de fournir aux freelances un outil performant pour générer et gérer leurs factures en toute simplicité.

---

## Fonctionnalités

- **Gestion des utilisateurs** : Inscription, connexion, et gestion des profils utilisateurs.
- **Création de factures** : Génération facile de factures personnalisées.
- **Création de devis** : Génération simplifier des devis.
- **Gestion des clients** : Ajouter, modifier et supprimer des informations sur les clients.
- **Gestion des services** : Ajouter, modifier et supprimer des services facturables.
- **Calcul automatique des montants** : Calcul des montants totaux, y compris les taxes.
- **Export de factures** : Téléchargement de factures en format PDF.
- **Historique des factures** : Consultation des factures passées.

## Stack Technologique

### Backend (Symfony)
- **Symfony 7.x** : Framework PHP pour le backend.
- **Doctrine ORM** : Gestion des bases de données et des entités.
- **MySQL / MariaDB** : Base de données pour stocker les informations des utilisateurs, clients et factures.
- **Docker** : Containerisation de l'application backend.

### Frontend (Next.js)
- **Next.js 14.x** : Framework React pour créer des applications web modernes.
- **React 20.x** : Bibliothèque JavaScript pour la gestion des interfaces utilisateurs.
- **MaterialUI** : Framework CSS pour la mise en page et le design.

### DevOps
- **Docker & Docker Compose** : Utilisation de Docker pour la containerisation du projet backend et frontend.
- **CircleCI** : Intégration continue pour la gestion du processus de build, test et déploiement.

## Prérequis

Avant de démarrer, assurez-vous que les éléments suivants sont installés sur votre machine :

- [Docker](https://www.docker.com/) - Containerisation de l'application.
- [Docker Compose](https://docs.docker.com/compose/) - Outil pour gérer les containers multi-services.
- [Node.js](https://nodejs.org/en/) - Pour le frontend Next.js.
- [Composer](https://getcomposer.org/) - Pour la gestion des dépendances PHP du backend Symfony.

## Installation et Lancement du Projet

### 1. Clonez le repository

```bash
git clone https://github.com/votre-utilisateur/invoicy.git
