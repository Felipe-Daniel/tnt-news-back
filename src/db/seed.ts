import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import 'dotenv/config';
import { getDb } from './index.js';
import { news, users } from './schema.js';

const seedNews = [
  {
    title: 'O Futuro das Redes Neurais: Avanços Promissores na Inteligência Artificial',
    content:
      'A inteligência artificial continua evoluindo rapidamente, com redes neurais cada vez mais eficientes e acessíveis. Pesquisadores de todo o mundo estão desenvolvendo modelos capazes de resolver problemas complexos em medicina, educação e sustentabilidade.',
    urlImage:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1470&q=80',
    category: 'Tecnologia',
  },
  {
    title: 'Seleção Brasileira: Nova Geração Promete Brilhar nos Próximos Anos',
    content:
      'Com jovens talentos emergindo nas principais ligas europeias, a seleção brasileira se prepara para um ciclo olímpico promissor. Técnicos e analistas destacam a versatilidade e a maturidade tática dos novos convocados.',
    urlImage:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1470&q=80',
    category: 'Esporte',
  },
  {
    title: 'Exposição de Arte Contemporânea Reúne Obras de Artistas Latino-Americanos',
    content:
      'Um novo museu em São Paulo inaugura mostra com mais de 80 obras que exploram identidade, memória e transformação social. A curadoria propõe diálogo entre gerações e diferentes linguagens artísticas.',
    urlImage:
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1470&q=80',
    category: 'Arte',
  },
  {
    title: 'Comunidades Locais Lideram Iniciativas de Sustentabilidade Urbana',
    content:
      'Projetos de hortas comunitárias, reciclagem e mobilidade sustentável ganham força em cidades de médio porte. Especialistas apontam o engajamento cidadão como chave para cidades mais resilientes.',
    urlImage:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1470&q=80',
    category: 'Outros',
  },
];

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

  const existingNews = await db.query.news.findFirst();
  if (existingNews) {
    console.log('Database already has news. Skipping seed.');
    return;
  }

  await db.insert(news).values(
    seedNews.map((item) => ({
      ...item,
      authorId,
    })),
  );

  console.log(`Seeded ${seedNews.length} news articles.`);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
