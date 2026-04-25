import OpenAI from 'openai';

// Vite environment variables
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const baseURL = import.meta.env.VITE_OPENAI_BASE_URL;
const modelName = import.meta.env.VITE_AI_MODEL || "deepseek-ai/deepseek-v4-flash";

const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  baseURL: baseURL,
  dangerouslyAllowBrowser: true
}) : null;

export const getAIResponse = async (prompt, onChunk) => {
  if (!openai) {
    console.error("AI Service: API Key or Base URL is missing in environment variables.");
    throw new Error("Config missing");
  }

  try {
    const completion = await openai.chat.completions.create({
      model: modelName,
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
      top_p: 0.95,
      max_tokens: 16384,
      stream: true,
      // Using extra_body for non-standard parameters as per OpenAI SDK standards
      extra_body: {
        chat_template_kwargs: { "thinking": true, "reasoning_effort": "high" }
      }
    });

    let accumulatedContent = "";
    for await (const chunk of completion) {
      // NVIDIA/DeepSeek might return reasoning in reasoning_content or reasoning delta
      const delta = chunk.choices[0]?.delta;
      const content = delta?.content || "";
      const reasoning = delta?.reasoning_content || delta?.reasoning || "";
      
      if (content || reasoning) {
        accumulatedContent += content;
        // We send both to the UI, UI currently shows content
        if (onChunk) onChunk({ content, reasoning, accumulatedContent });
      }
    }
    return accumulatedContent;
  } catch (error) {
    // Detailed logging to help the user debug in the browser console
    console.error("Detailed AI Service Error:", {
      message: error.message,
      status: error.status,
      name: error.name,
      stack: error.stack
    });
    throw error;
  }
};
