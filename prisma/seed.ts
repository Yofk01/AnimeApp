import { AnimeStatus, PrismaClient, WatchStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.review.deleteMany();
  await prisma.watchlistEntry.deleteMany();
  await prisma.character.deleteMany();
  await prisma.episode.deleteMany();
  await prisma.season.deleteMany();
  await prisma.animeGenre.deleteMany();
  await prisma.anime.deleteMany();
  await prisma.user.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.studio.deleteMany();

  const action = await prisma.genre.create({
    data: { name: 'Action' }
  });

  const adventure = await prisma.genre.create({
    data: { name: 'Adventure' }
  });

  const drama = await prisma.genre.create({
    data: { name: 'Drama' }
  });

  const witStudio = await prisma.studio.create({
    data: {
      name: 'Wit Studio',
      country: 'Japan'
    }
  });

  const madhouse = await prisma.studio.create({
    data: {
      name: 'Madhouse',
      country: 'Japan'
    }
  });

  const attackOnTitan = await prisma.anime.create({
    data: {
      title: 'Attack on Titan',
      description: 'Humanity fights for survival behind giant walls.',
      releaseYear: 2013,
      status: AnimeStatus.COMPLETED,
      studioId: witStudio.id,
      animeGenres: {
        create: [{ genreId: action.id }, { genreId: drama.id }]
      },
      seasons: {
        create: {
          seasonNumber: 1,
          title: 'Season 1'
        }
      },
      episodes: {
        create: [
          {
            episodeNumber: 1,
            title: 'To You, in 2000 Years',
            durationMin: 24
          },
          {
            episodeNumber: 2,
            title: 'That Day',
            durationMin: 24
          }
        ]
      },
      characters: {
        create: [
          {
            name: 'Eren Yeager',
            role: 'Main character',
            voiceActor: 'Yuki Kaji'
          },
          {
            name: 'Mikasa Ackerman',
            role: 'Main character',
            voiceActor: 'Yui Ishikawa'
          }
        ]
      }
    }
  });

  const hunterHunter = await prisma.anime.create({
    data: {
      title: 'Hunter x Hunter',
      description: 'A young boy becomes a Hunter to find his father.',
      releaseYear: 2011,
      status: AnimeStatus.COMPLETED,
      studioId: madhouse.id,
      animeGenres: {
        create: [{ genreId: action.id }, { genreId: adventure.id }]
      },
      seasons: {
        create: {
          seasonNumber: 1,
          title: 'Hunter Exam Arc'
        }
      },
      episodes: {
        create: [
          {
            episodeNumber: 1,
            title: 'Departure x And x Friends',
            durationMin: 23
          },
          {
            episodeNumber: 2,
            title: 'Test x Of x Tests',
            durationMin: 23
          }
        ]
      },
      characters: {
        create: [
          {
            name: 'Gon Freecss',
            role: 'Main character',
            voiceActor: 'Megumi Han'
          },
          {
            name: 'Killua Zoldyck',
            role: 'Main character',
            voiceActor: 'Mariya Ise'
          }
        ]
      }
    }
  });

  const demoUser = await prisma.user.create({
    data: {
      username: 'demo',
      email: 'demo@example.com'
    }
  });

  await prisma.watchlistEntry.create({
    data: {
      userId: demoUser.id,
      animeId: attackOnTitan.id,
      status: WatchStatus.WATCHING,
      progress: 2
    }
  });

  await prisma.watchlistEntry.create({
    data: {
      userId: demoUser.id,
      animeId: hunterHunter.id,
      status: WatchStatus.PLAN_TO_WATCH,
      progress: 0
    }
  });

  await prisma.review.create({
    data: {
      userId: demoUser.id,
      animeId: attackOnTitan.id,
      rating: 9,
      comment: 'Excellent démarrage et tension constante.'
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
