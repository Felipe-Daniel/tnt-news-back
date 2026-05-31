import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import 'dotenv/config';
import { getDb } from './index.js';
import { seedNews } from './seed-data.js';
import { news, users } from './schema.js';

async function seed() {
  const db = getDb();

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, 'sara@tntnews.com'),
  });

  let authorId = existingUser?.id;

  if (!authorId) {
    const passwordHash = await bcrypt.hash('123456', 10);
    const [createdUser] = await db
      .insert(users)
      .values({
        name: 'Sara Carneiro',
        email: 'sara@tntnews.com',
        passwordHash,
      })
      .returning({ id: users.id });

    authorId = createdUser.id;
    console.log('Created seed user: sara@tntnews.com / 123456');
  }

  let inserted = 0;

  for (const item of seedNews) {
    const exists = await db.query.news.findFirst({
      where: eq(news.title, item.title),
    });

    if (exists) {
      continue;
    }

    await db.insert(news).values({
      title: item.title,
      content: item.content,
      urlImage: item.urlImage,
      category: item.category,
      authorId,
    });
    inserted += 1;
  }

  if (inserted === 0) {
    console.log('All seed articles already exist. Nothing to insert.');
  } else {
    console.log(`Seeded ${inserted} new articles (${seedNews.length} total in catalog).`);
  }
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
