import { NextResponse } from "next/server";

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

const buckets = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(request: Request, scope: string, options: RateLimitOptions) {
  const ip = getClientIp(request);
  const now = Date.now();
  const key = `${scope}:${ip}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  current.count += 1;

  if (current.count > options.limit) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
    return NextResponse.json(
      { error: "Muitas tentativas. Aguarde um pouco antes de tentar novamente." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  return null;
}

export function validationError(message = "Dados invalidos.") {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function childSafetySystemInstruction() {
  return [
    "Nunca peca nome completo, endereco, telefone, CPF, escola, senha, contato, rede social ou dados da familia.",
    "Nao pergunte 'qual e seu nome' ou 'what is your name'. Se precisar se dirigir ao aluno, diga que ele pode usar um apelido opcional.",
    "Se o aluno enviar dado pessoal, nao repita o dado; oriente a nao compartilhar informacoes pessoais.",
  ].join("\n");
}

export function scrubChildUnsafeOutput(text: string) {
  let safe = String(text || "");
  const replacements: Array<[RegExp, string]> = [
    [/\bqual (e|é) (o )?seu nome\??/gi, "Use um apelido, se quiser. Para comecarmos, diga apenas o tema ou sua primeira tentativa."],
    [/\bcomo voce se chama\??/gi, "Use um apelido, se quiser. Para comecarmos, diga apenas o tema ou sua primeira tentativa."],
    [/\bwhat is your name\??/gi, "You can use a nickname if you want. To start, tell me only the topic or your first try."],
    [/\btell me your name\??/gi, "You can use a nickname if you want. To start, tell me only the topic or your first try."],
    [/\b(nome completo|endereco|endereço|telefone|cpf|senha|escola onde estuda)\b/gi, "dado pessoal"],
  ];

  replacements.forEach(([pattern, replacement]) => {
    safe = safe.replace(pattern, replacement);
  });

  return safe;
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "local";
}
