import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const baseURL = import.meta.env.VITE_OPENAI_BASE_URL || 'https://integrate.api.nvidia.com/v1';

// Create openai instance only if apiKey exists to avoid immediate crash
const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  baseURL: baseURL,
  dangerouslyAllowBrowser: true
}) : null;

export const getAIResponse = async (prompt, onChunk) => {
  if (!openai) {
    console.warn("AI Service: OpenAI API key is missing. AI features will be disabled.");
    throw new Error("API Key missing");
  }

  try {
    const completion = await openai.chat.completions.create({
      model: import.meta.env.VITE_AI_MODEL || "deepseek-ai/deepseek-v4-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
      top_p: 0.95,
      max_tokens: 16384,
      stream: true
    });

    let fullContent = "";
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || "";
      const reasoning = chunk.choices[0]?.delta?.reasoning || chunk.choices[0]?.delta?.reasoning_content || "";
      
      if (reasoning || content) {
        fullContent += content;
        if (onChunk) onChunk({ content, reasoning, fullContent });
      }
    }
    return fullContent;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
