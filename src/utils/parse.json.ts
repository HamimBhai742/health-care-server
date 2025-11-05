export const parseAIResponse = (text: string) => {
  if (!text || typeof text !== "string") return [];

  try {
    // 🧹 Remove markdown fences & extra whitespace/newlines
    const clean = text
      .replace(/```(?:json)?/gi, "")
      .replace(/\n/g, "")
      .replace(/\r/g, "")
      .trim();

    // 🔍 Try to parse JSON
    const parsed = JSON.parse(clean);

    // ✅ Ensure array or object return
    return parsed;
  } catch (error) {
    console.error("⚠️ Failed to parse AI JSON:", error);
    console.log("Raw text from AI:", text);
    return [];
  }
};
