import ReactMarkdown from "react-markdown"
export default function Recipe(props){
    return (
        <>
            <section className='w-[300px] md:w-[600px]   pb-10 '> 
                <h2 className='text-4xl font-inter font-semibold my-8'>Chef Katé Recommends:</h2>
                <article className="suggested-recipe-container" aria-live="polite">
                    <ReactMarkdown>{props.recipe}</ReactMarkdown>
                </article>
            </section> 
        </>
    )
}