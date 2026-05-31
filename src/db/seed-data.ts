import type { NewsCategory } from './schema.js';

const img = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=800&h=500&q=80`;

export const seedNews: Array<{
  title: string;
  content: string;
  urlImage: string;
  category: NewsCategory;
}> = [
  {
    title: 'React 19 traz Actions e melhorias de performance para SPAs',
    category: 'Frontend',
    urlImage: img('photo-1633356122544-f134324a6cee'),
    content:
      'A nova versão do React simplifica formulários com Server Actions e reduz re-renderizações em listas grandes. Times que migraram relatam builds menores e melhor experiência em rotas aninhadas com React Router.',
  },
  {
    title: 'TypeScript 5.5 acelera type-check em monorepos gigantes',
    category: 'Frontend',
    urlImage: img('photo-1516116216624-53e697fedbea'),
    content:
      'Com inferência mais precisa e erros mais claros, o TypeScript 5.5 diminui o tempo de compilação em projetos com dezenas de pacotes. A comunidade recomenda atualizar gradualmente e habilitar strict mode por módulo.',
  },
  {
    title: 'Tailwind CSS v4 adota engine nativa e reduz tempo de build',
    category: 'Frontend',
    urlImage: img('photo-1507720231279-0fde2edece70'),
    content:
      'A quarta geração do Tailwind promete configuração mais enxuta e integração direta com Vite. Design systems passam a centralizar tokens em CSS variables, facilitando temas claro e escuro.',
  },
  {
    title: 'Node.js 22 entra em LTS com fetch nativo estável',
    category: 'Backend',
    urlImage: img('photo-1555066931-4365d14bab8c'),
    content:
      'A release LTS consolida APIs web no runtime Node, reduzindo dependências de node-fetch. Equipes de API relatam ganhos em throughput com o novo scheduler e melhor suporte a WebSockets.',
  },
  {
    title: 'NestJS 11 reforça módulos e observabilidade para microserviços',
    category: 'Backend',
    urlImage: img('photo-1461740687544-74dcbfaa0e41'),
    content:
      'O framework TypeScript para Node ganha integração nativa com OpenTelemetry e validação mais rápida com Zod. Arquitetos destacam padrões claros para bounded contexts em APIs REST e gRPC.',
  },
  {
    title: 'PostgreSQL 17 melhora planos de consulta para analytics',
    category: 'Backend',
    urlImage: img('photo-1544383835-bda2bc66a55d'),
    content:
      'Novos índices e estatísticas automáticas ajudam queries analíticas em tabelas com bilhões de linhas. Startups que usam Neon e Supabase já testam upgrades em staging com zero downtime.',
  },
  {
    title: 'GitHub Actions reduz custo com runners ARM para builds Node',
    category: 'DevOps',
    urlImage: img('photo-1618401471353-b98afee0b701'),
    content:
      'Pipelines em ARM64 cortam tempo de CI em projetos JavaScript que compilam nativamente. A documentação oficial traz matrizes prontas para testar em ubuntu-latest e macos-14 simultaneamente.',
  },
  {
    title: 'Kubernetes 1.30 simplifica autoscaling para APIs sazonais',
    category: 'DevOps',
    urlImage: img('photo-1667372393119-3b21dd6a94da'),
    content:
      'Horizontal Pod Autoscaler ganha métricas customizadas mais estáveis e integração com KEDA. Plataformas de e-commerce usam o recurso para escalar filas de checkout em picos de tráfego.',
  },
  {
    title: 'Docker Desktop melhora cache de layers em projetos full-stack',
    category: 'DevOps',
    urlImage: img('photo-1605745341110-0a025b6b9b7a'),
    content:
      'BuildKit v0.13 acelera rebuilds com cache remoto e suporte a multi-stage otimizado. Desenvolvedores relatam redução de 40% no tempo de deploy local em stacks React + API.',
  },
  {
    title: 'OpenAI lança modelo compacto para agentes em produção',
    category: 'IA & Dados',
    urlImage: img('photo-1677442136019-21780ecad995'),
    content:
      'O novo modelo prioriza latência baixa e custo previsível em fluxos de suporte e code review. Engenheiros de ML recomendam avaliar grounding com RAG antes de fine-tuning completo.',
  },
  {
    title: 'LangChain 0.3 padroniza orquestração de LLMs em Python',
    category: 'IA & Dados',
    urlImage: img('photo-1620712943543-bcc4688e7485'),
    content:
      'A biblioteca unifica chains, tools e memory com tipagem mais segura. Times de dados constroem copilotos internos conectando Confluence, Jira e repositórios Git com permissões por papel.',
  },
  {
    title: 'dbt Cloud amplia testes de qualidade em pipelines de dados',
    category: 'IA & Dados',
    urlImage: img('photo-1551288049-bebda4e38f71'),
    content:
      'Analistas definem contratos de schema e alertas automáticos no Slack quando métricas divergem. O fluxo integra Snowflake, BigQuery e Postgres sem sair do Git.',
  },
  {
    title: 'Flutter 3.24 melhora performance em apps iOS e Android',
    category: 'Mobile',
    urlImage: img('photo-1512941937669-90a1b58e7e9c'),
    content:
      'Impeller torna-se padrão no iOS, reduzindo jank em animações complexas. Empresas híbridas mantêm uma única base de código para features B2B com acesso offline.',
  },
  {
    title: 'SwiftUI 6 traz navegação declarativa mais previsível',
    category: 'Mobile',
    urlImage: img('photo-1517694712202-14dd9538aa97'),
    content:
      'Apple documenta padrões para NavigationStack em apps grandes com deep linking. Desenvolvedores migram telas legadas em UIKit de forma incremental com UIViewControllerRepresentable.',
  },
  {
    title: 'Kotlin Multiplatform ganha tração em apps corporativos',
    category: 'Mobile',
    urlImage: img('photo-1535378917042-10a22a959ae9'),
    content:
      'Compartilhar lógica de rede e domínio entre Android e iOS reduz bugs de regra de negócio. JetBrains publica templates oficiais com Compose Multiplatform e Ktor.',
  },
  {
    title: 'Linux Foundation reforça governança do projeto Node.js',
    category: 'Open Source',
    urlImage: img('photo-1526374965328-7f61d4dc18c5'),
    content:
      'Novas políticas de segurança exigem revisão dupla para mudanças no core. Mantenedores convidam empresas a financiar trabalho em módulos críticos como crypto e http.',
  },
  {
    title: 'Vite adota rolldown experimental para bundles maiores',
    category: 'Open Source',
    urlImage: img('photo-1555949963-aa79dcee981c'),
    content:
      'A equipe do Vite testa bundler em Rust para reduzir tempo de cold start em monorepos. Projetos open source como Vitest e Nuxt participam do roadmap público no GitHub.',
  },
  {
    title: 'OWASP atualiza Top 10 com foco em APIs e supply chain',
    category: 'Segurança',
    urlImage: img('photo-1563986768609-322da13575f3'),
    content:
      'Falhas de autenticação em APIs GraphQL e dependências comprometidas lideram o ranking. CISOs recomendam SBOM, assinatura de commits e varredura contínua em CI.',
  },
  {
    title: 'Zero Trust chega a times de desenvolvimento remoto',
    category: 'Segurança',
    urlImage: img('photo-1550751827-4bd374c3f58b'),
    content:
      'VPNs tradicionais cedem lugar a acesso por identidade com device posture. Ferramentas como Tailscale e Cloudflare Zero Trust integram SSO e auditoria por repositório.',
  },
  {
    title: 'Mercado de trabalho tech valoriza portfólio com código aberto',
    category: 'Carreira',
    urlImage: img('photo-1522202176988-66273c2fd55f'),
    content:
      'Recrutadores priorizam contribuições documentadas e PRs em projetos reais. Especialistas sugerem combinar blog técnico, certificações cloud e projetos pessoais com README claro.',
  },
];
