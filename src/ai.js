import { HfInference } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients and suggests a recipe.
Use markdown formatting.
`;

export async function getRecipeFromMistral(ingredientsArr) {
    const HF_ACCESS_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN;
    
    if (!HF_ACCESS_TOKEN) {
        console.error("HF_ACCESS_TOKEN is not defined");
        return "API token is missing. Please check your environment variables.";
    }

    const ingredientsString = ingredientsArr.join(", ");
    const hf = new HfInference(HF_ACCESS_TOKEN);

    const models = [
        "mistralai/Mixtral-8x7B-Instruct-v0.1",
        "mistralai/Mistral-7B-Instruct-v0.2",
        "meta-llama/Meta-Llama-3-8B-Instruct",
    ];

    for (const model of models) {
        try {
            console.log(`Trying model: ${model}`);

            let fullResponse = "";
            
            const stream = hf.chatCompletionStream({
                model,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { 
                        role: "user", 
                        content: `I have ${ingredientsString}. Suggest a recipe!` 
                    },
                ],
                max_tokens: 1024,
                temperature: 0.7,
            });

            for await (const chunk of stream) {
                if (chunk.choices?.[0]?.delta?.content) {
                    fullResponse += chunk.choices[0].delta.content;
                }
            }

            if (fullResponse.trim()) {
                return fullResponse;
            }

        } catch (err) {
            console.error(`Error with ${model}:`, err);
            
            const errorMessage = err.message || err.toString();
            
            if (errorMessage.includes("402") || 
                errorMessage.includes("out of credits") ||
                errorMessage.includes("rate limit") ||
                errorMessage.includes("quota")) {
                console.warn(`Credit/rate limit issue with ${model}, trying next...`);
                continue;
            }
            
            continue;
        }
    }

    return "Sorry, I couldn't generate a recipe right now. Please try again later.";
}