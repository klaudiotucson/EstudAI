// @ts-nocheck
import { NextResponse } from "next/server";
import { criarCuradoriaAtualidades } from "@/lib/funcoes-planejamento-interativo";

export const dynamic = "force-dynamic";

const FEEDS = [
  {
    id: "agencia-brasil",
    name: "Agencia Brasil",
    category: "Brasil",
    url: "https://agenciabrasil.ebc.com.br/feed/ultimasnoticias/feed.xml"
  },
  {
    id: "bbc-world",
    name: "BBC World",
    category: "Mundo",
    url: "https://feeds.bbci.co.uk/news/world/rss.xml"
  },
  {
    id: "onu-news-audio",
    name: "ONU News",
    category: "Mundo",
    url: "https://news.un.org/pt/audio-product/all/audio-rss.xml?26Sep2025"
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const anoEscolar = searchParams.get("ano") || "6o ano ao Ensino Medio, ENEM e preparatorios";

  const fetched = await Promise.allSettled(FEEDS.map(fetchFeed));
  const items = fetched
    .flatMap((result) => result.status === "fulfilled" ? result.value : [])
    .sort((a, b) => Date.parse(b.publishedAt || "") - Date.parse(a.publishedAt || ""))
    .slice(0, 18);

  const curated = criarCuradoriaAtualidades({
    anoEscolar,
    itens: items.length ? items : fallbackCurrentAffairs()
  });

  return NextResponse.json({
    ...curated,
    online: items.length > 0,
    refreshedAt: new Date().toISOString()
  });
}

async function fetchFeed(feed) {
  const response = await fetch(feed.url, {
    headers: { "User-Agent": "EstudAI/1.0 educational current affairs reader" },
    next: { revalidate: 900 }
  });
  if (!response.ok) throw new Error(`Feed failed: ${feed.name}`);
  const xml = await response.text();
  return parseRss(xml).slice(0, 8).map((item, index) => ({
    id: `${feed.id}-${index + 1}`,
    title: item.title,
    summary: item.description,
    link: item.link,
    publishedAt: item.pubDate,
    source: feed.name,
    category: feed.category,
    disciplina: inferDiscipline(`${item.title} ${item.description}`),
    importance: inferImportance(`${item.title} ${item.description}`)
  }));
}

function parseRss(xml) {
  const itemBlocks = [...xml.matchAll(/<item[\s\S]*?<\/item>/g)].map((match) => match[0]);
  return itemBlocks.map((block) => ({
    title: cleanXml(readTag(block, "title")),
    link: cleanXml(readTag(block, "link")),
    description: cleanXml(readTag(block, "description")),
    pubDate: cleanXml(readTag(block, "pubDate"))
  })).filter((item) => item.title);
}

function readTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? match[1] : "";
}

function cleanXml(value) {
  return String(value || "")
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function inferDiscipline(text) {
  const lower = String(text || "").toLowerCase();
  if (/(clima|ambiente|saude|vacina|ciencia|pesquisa|energia|zika|fiocruz)/.test(lower)) return "Ciencias";
  if (/(dolar|economia|inflacao|emprego|mercado|juros|pib|preco)/.test(lower)) return "Geografia/Economia";
  if (/(congresso|camara|lei|politica|governo|direitos|justica)/.test(lower)) return "Historia/Cidadania";
  if (/(mundo|onu|guerra|paz|internacional|africa|europa|asia)/.test(lower)) return "Geografia";
  return "Portugues";
}

function inferImportance(text) {
  const lower = String(text || "").toLowerCase();
  if (/(alerta|crise|guerra|emergencia|risco|recorde|mudanca climatica)/.test(lower)) return "alta";
  if (/(acordo|pesquisa|projeto|lei|educacao|saude)/.test(lower)) return "media";
  return "contexto";
}

function fallbackCurrentAffairs() {
  return [
    {
      id: "fallback-1",
      title: "Atualidades offline: acompanhe Brasil, mundo, ciencia e cidadania",
      summary: "Quando as fontes online nao responderem, o app mantem uma rotina de leitura critica com fontes confiaveis.",
      link: "https://agenciabrasil.ebc.com.br/",
      source: "Fallback educativo",
      category: "Brasil",
      disciplina: "Portugues",
      importance: "contexto"
    },
    {
      id: "fallback-2",
      title: "Como estudar uma noticia",
      summary: "Responda: o que aconteceu, onde aconteceu, quem foi afetado, por que importa e qual fonte confirma.",
      link: "https://www.gov.br/pt-br/rss",
      source: "Fallback educativo",
      category: "Metodo",
      disciplina: "Historia/Cidadania",
      importance: "media"
    }
  ];
}
