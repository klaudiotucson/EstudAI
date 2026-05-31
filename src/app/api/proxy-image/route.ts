import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, validationError } from '@/lib/apiGuards';

const imageQuerySchema = z.object({
  prompt: z.string().trim().min(1).max(400),
  width: z.coerce.number().int().min(256).max(1200).default(800),
  height: z.coerce.number().int().min(256).max(800).default(400),
});

export async function GET(request: Request) {
  const limited = rateLimit(request, 'api-proxy-image', { limit: 25, windowMs: 60_000 });
  if (limited) return limited;

  const { searchParams } = new URL(request.url);
  const parsed = imageQuerySchema.safeParse({
    prompt: searchParams.get('prompt'),
    width: searchParams.get('width') || undefined,
    height: searchParams.get('height') || undefined,
  });

  if (!parsed.success) return validationError('Parametros de imagem invalidos.');

  const { prompt, width, height } = parsed.data;

  try {
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&nologo=true&seed=${Math.floor(Math.random() * 100000)}`;
    
    const response = await fetch(pollinationsUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from Pollinations: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');
    const mimeType = response.headers.get('content-type') || 'image/jpeg';

    const dataUrl = `data:${mimeType};base64,${base64Image}`;

    return NextResponse.json({ dataUrl });
  } catch (error: any) {
    console.error('Error proxying image:', error);
    return NextResponse.json({ error: 'Failed to generate image', details: error.message }, { status: 500 });
  }
}
