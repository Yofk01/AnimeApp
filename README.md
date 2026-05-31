# AnimeApp

Application desktop Electron + Angular avec Prisma et SQLite.

## Installation

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

## Lancer l'application

```bash
npm run start
```

Puis ouvrir l'application Electron qui se lance automatiquement.

## Pages utiles

- `/animes` : gérer les animes
- `/stats` : voir les statistiques
- `/admin` : gérer genres, studios, personnages, épisodes et liens anime/genre

## En cas de problème

Si PowerShell bloque `npm` sur Windows :

```bash
npm.cmd run start
```

Si Prisma n'est pas généré :

```bash
npm run prisma:generate
```

Si la base est vide :

```bash
npm run prisma:seed
```

Si une table manque :

```bash
npm run prisma:migrate
```
