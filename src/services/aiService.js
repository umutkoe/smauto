import OpenAI from 'openai';

// Vite environment variables
// IMPORTANT: For Vercel deployment, you MUST add these in the Vercel Dashboard Settings -> Environment Variables
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const baseURL = import.meta.env.VITE_OPENAI_BASE_URL || 'https://integrate.api.nvidia.com/v1';
const modelName = import.meta.env.VITE_AI_MODEL || "deepseek-ai/deepseek-v4-flash";

// Fallback for local testing if env is not loaded correctly
const finalApiKey = apiKey || ""; 

const openai = finalApiKey ? new OpenAI({
  apiKey: finalApiKey,
  baseURL: baseURL,
  dangerouslyAllowBrowser: true
}) : null;

export const getAIResponse = async (prompt, onChunk) => {
  if (!openai) {
    const errorMsg = "AI Service: VITE_OPENAI_API_KEY is missing. If you are on Vercel, please add it to Environment Variables in the project settings.";
    console.error(errorMsg);
    throw new Error("Config missing: " + errorMsg);
  }

  try {
    const completion = await openai.chat.completions.create({
      model: modelName,
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
      top_p: 0.95,
      max_tokens: 16384,
      stream: true,
      extra_body: {
        chat_template_kwargs: { "thinking": true, "reasoning_effort": "high" }
      }
    });

    let accumulatedContent = "";
    for await (const chunk of completion) {
      const delta = chunk.choices[0]?.delta;
      const content = delta?.content || "";
      
      if (content) {
        accumulatedContent += content;
        if (onChunk) onChunk({ content, accumulatedContent });
      }
    }
    return accumulatedContent;
  } catch (error) {
    console.error("Detailed AI Service Error:", error);
    throw error;
  }
};
