import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getRandomQuote } from './quote'
import Header from './assets/components/Header'
import Recipe from './assets/components/Recipe'
import IngredientsList from './assets/components/IngredientList'
import { getRecipeFromMistral } from './ai'
import { useRef } from 'react'

function App() {
  const [quote] =useState(getRandomQuote)
  const [ingredients,setIngredients] = useState([]);
  const [showRecipe,setShowRecipe] = useState(false);
  const [loading,setLoading] = useState(false)
  const [recipe, setRecipe] = useState("")
  const recipeRef = useRef(null)
  async function getRecipe() {
    setLoading(true)
    setRecipe("")
    try{
      const recipeMarkdown = await getRecipeFromMistral(ingredients)
      setRecipe(recipeMarkdown)
    }finally{
      setLoading(false)
    }
  }
  

  function toggleRecipeShow(){

    setShowRecipe(prevShow => !prevShow)
  }

  function addIngredient(formData){
    const newIngredient = formData.get("ingredient");
    if(!newIngredient) return;

    setIngredients(prevIngredient =>  [...prevIngredient,newIngredient])
  }

  useEffect(() => {
     if (recipe && recipeRef.current) {
       recipeRef.current.scrollIntoView({ behavior: "smooth" })
     }
   }, [recipe]);


  return (
    <>
      <Header/>
      <main className='flex justify-center m-0 md:pt-[300px] pt-[100px] bg-transparent '>
        <div className='sm:w-svh md:w-3xl flex flex-col justify-center items-center font-inter'>
          <div className=' flex items-center justify-center flex-col  gap-2.5 md:gap-5 mb-6 '>
            <h1 className='font-lobster text-4xl md:text-7xl '>Chef Katé</h1> 
            <p className='font-lobster w-full text-center text-wrap md:text-xl text-sm text-[#475467]'>"{quote}"</p>
          </div>
          <section className='w-[300px] md:w-2xl lg:w-[600px] h-fit   mb-5'>
                <form className='md:flex-row  max-w-full h-full flex gap-2 flex-col bg-transparent justify-center items-center' action={addIngredient}>
                    <input name="ingredient" type="text" placeholder="eg.oregano"className='bg-white border-slate-300 border-1 outline-none rounded-xs w-full  px-5 py-3' />
                    <button className='cursor-pointer h-full bg-black text-off-white border-1 border-black rounded-xs px-2 py-3 w-32 text-sm text-nowrap text-center font-semibold hover:scale-[0.9] transistion-transform duration-200'>Add Ingredients</button> 
                </form>
          </section>
          
          {ingredients.length > 0 && <IngredientsList ingredients={ingredients} toggleRecipeShow={getRecipe}/>}

            {loading && (
              <p className="text-center text-gray-500 italic font-lobster">Chef Katé is cooking up your recipe...</p>
            )}
          <div ref={recipeRef} className='m-0 pt-20'>
            {!loading && recipe &&  <Recipe recipe={recipe} />}
          </div>
        </div>
        
      </main>
        
        


    </>
  )
}

export default App
