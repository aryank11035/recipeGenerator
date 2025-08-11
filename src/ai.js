import { chatCompletion } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe.
The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients.
Format your response in markdown to make it easier to render to a web page.
`

const HF_ACCESS_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    const models = [
        "mistralai/Mixtral-8x7B-Instruct-v0.1", 
        "tiiuae/falcon-7b-instruct",            
        "google/gemma-2b-it"                    
    ]

    for (const model of models) {
        try {
            console.log(`Trying model: ${model}`)
            const response = await chatCompletion({
                model,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
                ],
                max_tokens: 512,
                accessToken: HF_ACCESS_TOKEN,
            })

            if (response.choices?.[0]?.message?.content) {
                return response.choices[0].message.content
            }
        } catch (err) {
            if (err.message.includes("402")) {
                console.warn(`Out of credits for ${model}, trying next model...`)
                continue 
            }
            console.error(`Error with ${model}:`, err.message)
        }
    }

    return "Sorry, I couldn't generate a recipe right now. Please try again later."
}
