import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, GoogleGenerativeAIFetchError } from '@google/generative-ai';

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? 'gemini-2.0-flash';

const BASE_SYSTEM_INSTRUCTION = `You are a helpful assistant for the "Java for JS Devs" course. You help JavaScript/TypeScript developers learn Java by answering questions about:
- Java syntax, types, and concepts
- Differences between Java and JavaScript
- Object-oriented programming in Java
- Best practices and common patterns

Keep answers concise and practical. When relevant, draw parallels to JavaScript/TypeScript to help the developer understand. Use code examples when helpful.`;

function buildSystemInstruction(language: string): string {
  const langMap: Record<string, string> = {
    en: 'English',
    es: 'Spanish',
    'es-ES': 'Spanish',
    'es-MX': 'Spanish',
  };
  const targetLang = langMap[language?.split('-')[0] ?? 'en'] ?? 'English';
  return `${BASE_SYSTEM_INSTRUCTION}\n\nIMPORTANT: Always respond in ${targetLang}. The user has selected this language in the app.`;
}

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is not configured' },
      { status: 503 }
    );
  }

  try {
    const body = (await req.json()) as {
      messages: { role: string; content: string }[];
      language?: string;
    };
    const { messages, language = 'en' } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'messages array is required' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: buildSystemInstruction(language),
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from user' },
        { status: 400 }
      );
    }

    const chat = model.startChat({
      history: history.map((h) => ({
        role: h.role,
        parts: h.parts,
      })),
    });

    const result = await chat.sendMessageStream(lastMessage.content);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text?.() ?? '';
            if (text) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
        } catch (err) {
          console.error('Chat stream error:', err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: 'Stream failed' })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    console.error('POST /api/chat:', err);

    if (err instanceof GoogleGenerativeAIFetchError) {
      if (err.status === 429) {
        return NextResponse.json(
          {
            error:
              'Quota exceeded. Please try again in a minute or check your Gemini API limits.',
          },
          { status: 429 }
        );
      }
      if (err.status === 404) {
        return NextResponse.json(
          {
            error: `Model "${GEMINI_MODEL}" not found. Try setting GEMINI_MODEL in .env.local (e.g. gemini-2.0-flash, gemini-2.0-flash-lite).`,
          },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : 'Failed to process chat request',
      },
      { status: 500 }
    );
  }
}
