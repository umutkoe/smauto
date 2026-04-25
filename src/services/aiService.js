export const getAIResponse = async (prompt, onChunk) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'API request failed');
    }

    const reader = response.body.getReader();
    const textDecoder = new TextDecoder();
    
    let fullContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = textDecoder.decode(value, { stream: true });
      fullContent += chunk;
      
      if (onChunk) {
        onChunk({ content: chunk, fullContent });
      }
    }

    return fullContent;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
