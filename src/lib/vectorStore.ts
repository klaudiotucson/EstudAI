import fs from 'fs';
import path from 'path';

let vectorDBCache: any[] | null = null;

export function loadVectorDB() {
    if (vectorDBCache) return vectorDBCache;

    const dbPath = path.resolve(process.cwd(), 'vector_db.json');
    if (fs.existsSync(dbPath)) {
        try {
            const data = fs.readFileSync(dbPath, 'utf8');
            vectorDBCache = JSON.parse(data);
            return vectorDBCache;
        } catch (err) {
            console.error("Erro ao ler vector_db.json:", err);
            return [];
        }
    }
    return [];
}

export async function getEmbedding(text: string): Promise<number[]> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        console.warn("OPENAI_API_KEY ausente para gerar embeddings.");
        return [];
    }

    try {
        const response = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                input: text,
                model: "text-embedding-3-small"
            })
        });

        if (!response.ok) return [];

        const data = await response.json();
        return data.data[0].embedding;
    } catch (err) {
        console.error("Erro na API de Embeddings:", err);
        return [];
    }
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0.0;
    let normA = 0.0;
    let normB = 0.0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function searchSimilar(query: string, topK: number = 3) {
    const db = loadVectorDB();
    if (!db || db.length === 0) return []; // DB não construído ainda

    const queryEmbedding = await getEmbedding(query);
    if (queryEmbedding.length === 0) return [];

    const results = db.map(doc => {
        const similarity = cosineSimilarity(queryEmbedding, doc.embedding);
        return {
            ...doc,
            similarity
        };
    });

    // Ordenar de forma decrescente
    results.sort((a, b) => b.similarity - a.similarity);

    return results.slice(0, topK);
}
