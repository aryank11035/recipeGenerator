export default function IngredientsList(props){

    const ingredientsList = props.ingredients.map(ingredient => (
    <li key={ingredient}>{ingredient}</li>
  ))

    return (
        <>
            <section className='w-[300px] md:w-[600px]'>
           
              <h2 className='md:text-4xl  text-2xl font-inter font-bold mb-4 '>Ingredients on hand:</h2>
              
              <div className='pl-8'>
                <ul className='md:text-lg  text-md list-disc font-inter text-gray-800  leading-8 pb-4'>
                  {ingredientsList}
                </ul>
              </div>

              {props.ingredients.length > 3 && <div className='get-recipe-container mt-5 mb-10'>
                <div>
                  <h3>Get Ready for Recipe?</h3>
                  <p>Generate a recipe from you list of ingredients.</p>
                </div>
                <button  onClick={props.toggleRecipeShow} className="cursor-pointer hover:scale-[0.9] transistion-transform duration-200">Get a Recipe</button>
              </div>}

          </section>
        </>
    )
}