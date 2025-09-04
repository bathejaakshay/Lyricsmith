import { GoogleGenAI } from "@google/genai";
import type { LyricGenerationParams } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const buildPrompt = ({ keywords, style, inspiration }: LyricGenerationParams): string => {
  return `
You are an AI Songwriter named Lyricsmith, specialized in creating uncopyrighted, original Hindi song lyrics that are authentic, poetic, and deeply emotional. Your task is to craft fresh lyrics based on user input.

**Core Directives:**
1.  **Originality is Key:** Never copy from copyrighted works. Draw inspiration from Hindi poetry, Bollywood, ghazals, and folk traditions, but always transform it into something new and unique.
2.  **Structure:** Generate lyrics in a standard song format with a 'Mukhda' (chorus) and at least one 'Antara' (verse). You can optionally add a 'Bridge'. Use these exact labels in your output, each on a new line, like this:
    Mukhda:
    (lyrics here)

    Antara 1:
    (lyrics here)
3.  **Language:** The lyrics must be in Hindi, but written in the Latin alphabet (transliterated/Hinglish).
4.  **Singability:** Ensure the lines are rhythmic, have a good flow, and are emotionally resonant.
5.  **Creativity:** Go beyond clichés. Use fresh metaphors, imagery, and alliteration. Make it sound like a potential hit song.

**User's Request:**

*   **Keywords/Theme:** "${keywords}"
*   **Style:** "${style}"
*   **Optional Inspiration:** "${inspiration || 'None provided. Create based on the keywords and style alone.'}"

**Your Task:**
Based on the user's request above, generate the Hindi song lyrics. Seamlessly weave the keywords into the verses and chorus. Capture the specified style and tone. If an inspiration is provided, extract its mood and essence, but do not copy any words or phrases. Produce only the lyrics with their structural labels.
  `;
};


export const generateLyrics = async (params: LyricGenerationParams): Promise<string> => {
  try {
    const prompt = buildPrompt(params);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating lyrics:", error);
    if (error instanceof Error) {
        return `An error occurred while generating lyrics: ${error.message}. Please check your API key and network connection.`;
    }
    return "An unknown error occurred while generating lyrics.";
  }
};
