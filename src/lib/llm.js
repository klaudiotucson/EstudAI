// llm.js
// Handles communication with Deepseek, OpenAI, and Kimi APIs in a fallback sequence

class LLMService {
    constructor() {
        this.providers = [
            {
                name: 'Deepseek',
                url: 'https://api.deepseek.com/chat/completions',
                keyEnv: 'DEEPSEEK_API_KEY',
                model: 'deepseek-chat'
            },
            {
                name: 'OpenAI',
                url: 'https://api.openai.com/v1/chat/completions',
                keyEnv: 'OPENAI_API_KEY',
                model: 'gpt-4o-mini' // using a fast, standard model
            },
            {
                name: 'Kimi',
                url: 'https://api.moonshot.cn/v1/chat/completions',
                keyEnv: 'KIMI_API_KEY',
                model: 'moonshot-v1-8k'
            }
        ];
    }

    async generate(messages, options = {}) {
        const temperature = options.temperature || 0.7;
        for (const provider of this.providers) {
            const apiKey = process.env[provider.keyEnv];
            
            if (!apiKey) {
                console.log(`[LLM Fallback] Parando tentativa com ${provider.name}: Chave de API não configurada em ${provider.keyEnv}`);
                continue;
            }

            try {
                console.log(`[LLM] Tentando gerar com ${provider.name}...`);
                const response = await fetch(provider.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: provider.model,
                        messages: messages,
                        temperature: temperature,
                        max_tokens: 4000
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`${response.status} - ${errorText}`);
                }

                const data = await response.json();
                console.log(`[LLM] Sucesso com ${provider.name}!`);
                return data.choices[0].message.content;

            } catch (err) {
                console.error(`[LLM Fallback] Falha com ${provider.name}: ${err.message}`);
            }
        }

        throw new Error('Todas as APIs falharam ou estão sem chaves configuradas. Configure as variáveis de ambiente DEEPSEEK_API_KEY, OPENAI_API_KEY ou KIMI_API_KEY.');
    }
}

const llmService = new LLMService();

export default llmService;
