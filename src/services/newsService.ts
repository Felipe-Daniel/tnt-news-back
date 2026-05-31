import { desc, eq } from 'drizzle-orm';
import { getDb } from '../db/index.js';
import { news, users, NEWS_CATEGORIES, type NewsCategory } from '../db/schema.js';

export interface NewsListItem {
  id: string;
  url_image: string;
  title: string;
  category: string;
  author: string;
  date: string;
}

export interface NewsDetail extends NewsListItem {
  content: string;
}

function formatNewsItem(
  item: typeof news.$inferSelect & { author: { name: string } },
): NewsListItem {
  return {
    id: item.id,
    url_image: item.urlImage,
    title: item.title,
    category: item.category,
    author: item.author.name,
    date: item.createdAt.toISOString().split('T')[0],
  };
}

export async function listNews(category?: string): Promise<NewsListItem[]> {
  const db = getDb();

  const rows = await db
    .select({
      id: news.id,
      title: news.title,
      urlImage: news.urlImage,
      category: news.category,
      createdAt: news.createdAt,
      authorName: users.name,
    })
    .from(news)
    .innerJoin(users, eq(news.authorId, users.id))
    .where(category ? eq(news.category, category) : undefined)
    .orderBy(desc(news.createdAt));

  return rows.map((row) => ({
    id: row.id,
    url_image: row.urlImage,
    title: row.title,
    category: row.category,
    author: row.authorName,
    date: row.createdAt.toISOString().split('T')[0],
  }));
}

export async function getNewsById(id: string): Promise<NewsDetail | null> {
  const db = getDb();

  const row = await db
    .select({
      id: news.id,
      title: news.title,
      content: news.content,
      urlImage: news.urlImage,
      category: news.category,
      createdAt: news.createdAt,
      authorName: users.name,
    })
    .from(news)
    .innerJoin(users, eq(news.authorId, users.id))
    .where(eq(news.id, id))
    .limit(1);

  if (!row[0]) {
    return null;
  }

  const item = row[0];
  return {
    id: item.id,
    url_image: item.urlImage,
    title: item.title,
    content: item.content,
    category: item.category,
    author: item.authorName,
    date: item.createdAt.toISOString().split('T')[0],
  };
}

export async function createNews(
  authorId: string,
  data: {
    title: string;
    content: string;
    url_image: string;
    category: NewsCategory;
  },
): Promise<NewsListItem> {
  const db = getDb();

  const [created] = await db
    .insert(news)
    .values({
      title: data.title,
      content: data.content,
      urlImage: data.url_image,
      category: data.category,
      authorId,
    })
    .returning();

  const author = await db.query.users.findFirst({
    where: eq(users.id, authorId),
    columns: { name: true },
  });

  return formatNewsItem({
    ...created,
    author: { name: author?.name ?? 'Unknown' },
  });
}

export { NEWS_CATEGORIES };
