const fs = require('fs');
const path = require('path');

// Ler variáveis de ambiente manualmente do .env
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
            process.env[match[1].trim()] = match[2].trim();
        }
    });
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error("ERRO: OPENAI_API_KEY não encontrada no arquivo .env.");
    process.exit(1);
}

async function getEmbeddingsBatch(texts) {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            input: texts,
            model: "text-embedding-3-small" // Modelo mais rápido e barato
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Erro OpenAI: ${err}`);
    }

    const data = await response.json();
    return data.data.map(d => d.embedding);
}

async function main() {
    console.log("🚀 Iniciando construção do Banco de Dados Vetorial Local (RAG)...");

    const enciclopedicoPath = path.resolve(__dirname, '../banco_dados_enciclopedico.json');
    const educacionalPath = path.resolve(__dirname, '../database_educacional_completo.json');
    const outPath = path.resolve(__dirname, '../vector_db.json');

    let enciclopedico = [];
    let educacional = [];

    if (fs.existsSync(enciclopedicoPath)) {
        enciclopedico = JSON.parse(fs.readFileSync(enciclopedicoPath, 'utf8'));
        console.log(`Lido banco enciclopédico: ${enciclopedico.length} registros.`);
    }

    if (fs.existsSync(educacionalPath)) {
        educacional = JSON.parse(fs.readFileSync(educacionalPath, 'utf8'));
        console.log(`Lido banco educacional (BNCC): ${educacional.length} registros.`);
    }

    // Preparar os dados para transformar em texto puro
    const documents = [];

    // Mapeando Enciclopédico
    enciclopedico.forEach(item => {
        const text = `Disciplina: ${item.disciplina}. Ano: ${item.ano}º. Tema: ${item.titulo_pesquisa}. Conteúdo: ${item.conteudo_detalhado}`;
        documents.push({
            id: item.id || Math.random().toString(),
            type: 'enciclopedico',
            text: text,
            metadata: { titulo: item.titulo_pesquisa, disciplina: item.disciplina, ano: item.ano }
        });
    });

    // Mapeando Educacional (BNCC)
    // Para evitar extrapolar, pegaremos apenas alguns relevantes ou resumiremos
    educacional.forEach(item => {
        const text = `Código BNCC: ${item.codigo}. Disciplina: ${item.disciplina}. Ano: ${item.ano}. Prática: ${item.pratica_linguagem}. Descrição: ${item.descricao}`;
        documents.push({
            id: item.codigo || Math.random().toString(),
            type: 'educacional',
            text: text,
            metadata: { codigo: item.codigo, disciplina: item.disciplina, ano: item.ano }
        });
    });

    console.log(`Total de documentos a processar: ${documents.length}`);

    const BATCH_SIZE = 500; // Limite seguro para OpenAI
    const vectorDB = [];

    for (let i = 0; i < documents.length; i += BATCH_SIZE) {
        const batch = documents.slice(i, i + BATCH_SIZE);
        const texts = batch.map(doc => doc.text);

        console.log(`⏳ Processando batch ${i} a ${i + batch.length} de ${documents.length}...`);
        
        try {
            const embeddings = await getEmbeddingsBatch(texts);
            
            for (let j = 0; j < batch.length; j++) {
                vectorDB.push({
                    id: batch[j].id,
                    type: batch[j].type,
                    text: batch[j].text,
                    metadata: batch[j].metadata,
                    embedding: embeddings[j]
                });
            }
        } catch (err) {
            console.error("❌ Falha no batch, abortando. Erro:", err.message);
            process.exit(1);
        }

        // Aguardar um pouco para não estourar rate limit da OpenAI (se for plano gratuito)
        await new Promise(r => setTimeout(r, 1000));
    }

    fs.writeFileSync(outPath, JSON.stringify(vectorDB));
    console.log(`✅ Banco Vetorial gerado com sucesso em: ${outPath}`);
    console.log(`Agora a API da IA pode pesquisar semanticamente (RAG) nesse arquivo.`);
}

main();
