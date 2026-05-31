// @ts-nocheck
import { NextResponse } from "next/server";
import { z } from "zod";
import llmService from "@/lib/llm";
import { criarBlueprintTutorIngles } from "@/lib/funcoes-planejamento-interativo";
import { childSafetySystemInstruction, rateLimit, scrubChildUnsafeOutput, validationError } from "@/lib/apiGuards";

const englishTutorSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().trim().min(1).max(3000),
  })).max(30).default([]),
  level: z.string().trim().max(20).optional(),
  mode: z.string().trim().max(60).optional(),
  scenario: z.string().trim().max(120).optional(),
  anoEscolar: z.string().trim().max(120).optional(),
});

export async function POST(request: Request) {
  try {
    const limited = rateLimit(request, "api-english-tutor", { limit: 30, windowMs: 60_000 });
    if (limited) return limited;

    const parsed = englishTutorSchema.safeParse(await request.json());
    if (!parsed.success) return validationError("Mensagem invalida ou muito grande.");

    const body = parsed.data;
    const messagesFromFront = body.messages || [];
    const level = body.level || "A1";
    const mode = body.mode || "roleplay";
    const scenario = body.scenario || "school routine";
    const anoEscolar = body.anoEscolar || "6o ano ao Ensino Medio, ENEM e preparatorios";
    const blueprint = criarBlueprintTutorIngles({ nivel: level, objetivo: scenario, anoEscolar });

    const system = `You are an AI English tutor for Brazilian students from ${anoEscolar}.
Student level: ${level}. Mode: ${mode}. Scenario: ${scenario}.

Core behavior:
- Use simple English adjusted to level ${level}.
- Use Portuguese only as support when the student is lost.
- Do not ask for personal data.
- Do not just give answers. Ask the student to try, then give short feedback.
- Correct gently: show "Your sentence", "Better sentence", and "Why".
- For roleplay, keep the scenario alive and ask one question at a time.
- For pronunciation, provide phonetic hints in simple spelling, not IPA only.
- Save useful words as vocabulary cards.
- End with a tiny practice task.
- Child safety:
${childSafetySystemInstruction()}

Blueprint:
${JSON.stringify(blueprint, null, 2)}`;

    let response = "";
    try {
      response = await llmService.generate([
        { role: "system", content: system },
        ...messagesFromFront
      ], { temperature: 0.55 });
    } catch {
      const lastUser = messagesFromFront.filter((msg: any) => msg.role === "user").pop()?.content || "";
      response = buildFallbackResponse({ level, scenario, lastUser });
    }

    response = scrubChildUnsafeOutput(response);

    return NextResponse.json({
      response,
      level,
      mode,
      scenario,
      blueprint,
      policy: ["CEFR", "roleplay", "feedback curto", "sem dados pessoais"]
    });
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

function buildFallbackResponse({ level, scenario, lastUser }) {
  if (!lastUser) {
    return `Hi! I am your English tutor. Level: ${level}. Scenario: ${scenario}.\n\nLet's start simple: say in English what you want to practice today. Example: "I want to talk about school."`;
  }

  return `Good try. I could not connect to the real AI right now, but we can still practice.\n\nYour message: "${lastUser}"\n\nBetter practice sentence: "I am practicing English about ${scenario}."\n\nWhy: In English, use "I am practicing" for something you are doing now.\n\nNow answer: What subject do you like at school?`;
}
