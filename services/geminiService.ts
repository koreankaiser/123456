
import { GoogleGenAI, Type } from "@google/genai";
import { Member } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMemberRecommendation = async (userPrompt: string, members: Member[]) => {
  const membersContext = members.map(m => `- ${m.name} (${m.nationality}, lives in ${m.location}): ${m.intro} / ${m.introKo}`).join('\n');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
      User request: "${userPrompt}"
      Available Buddies with their locations:
      ${membersContext}
      
      Suggest the 1-2 most relevant Buddies. 
      If the user mentions a location, prioritize buddies living nearby.
      Provide the recommendation in both Korean and English (Bilingual).
      Keep it very short (max 2 sentences per language).
      Format: [Korean sentence] / [English sentence]
      Tone: Warm, welcoming, and smart.
    `,
    config: {
      temperature: 0.7,
      maxOutputTokens: 300,
    }
  });

  return response.text;
};
