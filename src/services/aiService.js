import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const baseURL = import.meta.env.VITE_OPENAI_BASE_URL || 'https://integrate.api.nvidia.com/v1';

const openai = apiKey ? new OpenAI({
  apiKey: apiKey,
  baseURL: baseURL,
  dangerouslyAllowBrowser: true
}) : null;

export const getAIResponse = async (prompt, onChunk) => {
  if (!openai) {
    console.error("AI Service: API Key is missing.");
    throw new Error("API Key missing");
  }

  try {
    const completion = await openai.chat.completions.create({
      model: import.meta.env.VITE_AI_MODEL || "deepseek-ai/deepseek-v4-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
      top_p: 0.95,
      max_tokens: 16384,
      // Pass the specific reasoning parameters from the original snippet
      chat_template_kwargs: { "thinking": true, "reasoning_effort": "high" },
      stream: true
    });

    let accumulatedContent = "";
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || "";
      // Handle reasoning content if the model provides it
      const reasoning = chunk.choices[0]?.delta?.reasoning || chunk.choices[0]?.delta?.reasoning_content || "";
      
      if (content || reasoning) {
        accumulatedContent += content;
        if (onChunk) onChunk({ content, reasoning, accumulatedContent });
      }
    }
    return accumulatedContent;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
