# Schéma de la base de données

```mermaid
erDiagram
  STUDIO ||--o{ ANIME : produit
  ANIME ||--o{ SEASON : contient
  ANIME ||--o{ EPISODE : contient
  SEASON ||--o{ EPISODE : regroupe
  ANIME ||--o{ CHARACTER : possede
  ANIME ||--o{ ANIME_GENRE : associe
  GENRE ||--o{ ANIME_GENRE : associe
  USER ||--o{ WATCHLIST_ENTRY : possede
  ANIME ||--o{ WATCHLIST_ENTRY : reference
  USER ||--o{ REVIEW : ecrit
  ANIME ||--o{ REVIEW : recoit

  STUDIO {
    int id PK
    string name
    string country
    datetime createdAt
    datetime updatedAt
  }

  ANIME {
    int id PK
    string title
    string description
    int releaseYear
    enum status
    int studioId FK
    datetime createdAt
    datetime updatedAt
  }

  GENRE {
    int id PK
    string name
    datetime createdAt
    datetime updatedAt
  }

  ANIME_GENRE {
    int animeId PK,FK
    int genreId PK,FK
  }

  SEASON {
    int id PK
    int seasonNumber
    string title
    int animeId FK
    datetime createdAt
    datetime updatedAt
  }

  EPISODE {
    int id PK
    int episodeNumber
    string title
    int durationMin
    boolean watched
    int animeId FK
    int seasonId FK
    datetime createdAt
    datetime updatedAt
  }

  CHARACTER {
    int id PK
    string name
    string role
    string voiceActor
    int animeId FK
    datetime createdAt
    datetime updatedAt
  }

  USER {
    int id PK
    string username
    string email
    datetime createdAt
    datetime updatedAt
  }

  WATCHLIST_ENTRY {
    int id PK
    enum status
    int progress
    int userId FK
    int animeId FK
    datetime createdAt
    datetime updatedAt
  }

  REVIEW {
    int id PK
    int rating
    string comment
    int userId FK
    int animeId FK
    datetime createdAt
    datetime updatedAt
  }
```

