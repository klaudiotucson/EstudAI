import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, validationError } from '@/lib/apiGuards';

const ttsSchema = z.object({
    text: z.string().trim().min(1).max(4000),
    voice: z.enum(['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']).optional(),
});

export async function POST(request: Request) {
    try {
        const limited = rateLimit(request, 'api-tts', { limit: 20, windowMs: 60_000 });
        if (limited) return limited;

        const parsed = ttsSchema.safeParse(await request.json());
        if (!parsed.success) return validationError('Texto ou voz invalida.');

        const { text, voice } = parsed.data;
        
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ error: "Chave da OpenAI não configurada." }, { status: 500 });
        }

        const response = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'tts-1',
                input: text,
                voice: voice || 'alloy', // alloy, echo, fable, onyx, nova, shimmer
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(errText);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Type': 'audio/mpeg',
                'Cache-Control': 'public, max-age=31536000, immutable'
            },
        });
    } catch (err: any) {
        console.error("OpenAI TTS Error:", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
