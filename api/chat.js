import OpenAI from 'openai';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { prompt } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.VITE_OPENAI_API_KEY,
      baseURL: process.env.VITE_OPENAI_BASE_URL || 'https://integrate.api.nvidia.com/v1',
    });

    const response = await openai.chat.completions.create({
      model: process.env.VITE_AI_MODEL || "deepseek-ai/deepseek-v4-flash",
      messages: [
        { 
          role: "system", 
          content: "You are a professional receptionist for SMAUTO, a premium AI dental receptionist SaaS. You are helpful, empathetic, and focused on helping patients book appointments or answer basic dental clinic questions." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 1,
      top_p: 0.95,
      max_tokens: 4096,
      stream: true,
      extra_body: {
        chat_template_kwargs: { "thinking": true, "reasoning_effort": "high" }
      }
    });

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
