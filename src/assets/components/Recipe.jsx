import ReactMarkdown from "react-markdown"

export function cleanMarkdown(text) {
  return text
    .replace(/```markdown\n?/g, "")  // Remove opening ```markdown
    .replace(/```\n?$/g, "")          // Remove closing ```
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/\*\*Ingredients:\*\*/g, "**Ingredients:**\n")
    .replace(/\*\*Instructions:\*\*/g, "**Instructions:**\n")
    .trim();  // Remove any extra whitespace
}

export default function Recipe(props){

    console.log("Raw recipe:", props.recipe); // Debug: check what's being passed
    const cleanedRecipe = cleanMarkdown(props.recipe);
    console.log("Cleaned recipe:", cleanedRecipe);


    return (
        <>
            <section className='w-[300px] md:w-[600px] pb-10 '> 
                <h2 className='text-4xl font-inter font-semibold my-8'>Chef Katé Recommends:</h2>
                <article className="suggested-recipe-container" aria-live="polite">
                    <ReactMarkdown
                        components={{
                            // Force proper rendering of each element
                            h1: ({node, ...props}) => <h1 className="font-semibold text-2xl my-4" {...props} />,
                            h2: ({node, ...props}) => <h2 className="font-semibold text-xl my-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="font-semibold text-lg my-2" {...props} />,
                            h4: ({node, ...props}) => <h4 className="font-semibold text-base my-2" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-10 my-4" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-10 my-4" {...props} />,
                            li: ({node, ...props}) => <li className="mb-2" {...props} />,
                            p: ({node, ...props}) => <p className="mb-3" {...props} />,
                        }}
                    >
                        {cleanedRecipe}
                    </ReactMarkdown>
                </article>
            </section> 
        </>
    )
}