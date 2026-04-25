import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: import.meta.env.VITE_OPENAI_BASE_URL,
  dangerouslyAllowBrowser: true // Required for client-side API calls
});

export const getAIResponse = async (prompt, onChunk) => {
  try {
    const completion = await openai.chat.completions.create({
      model: import.meta.env.VITE_AI_MODEL,
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
