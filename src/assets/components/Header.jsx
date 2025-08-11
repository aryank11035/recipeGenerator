import chefHat from '../imgs/chef_hat.svg'
export default function Header(){
    return (
        <>
            <header className=' fixed w-full flex justify-center h-fit md:h-20 items-center shadow-sm bg-white' >
                <div className=' flex items-center  gap-0 md:gap-2.5 pr-3'>
                    <div className='size-14  flex items-center justify-center'>
                        <img src={chefHat} className="size-6 md:size-12" alt='chef-hat'/>
                    </div>
                    <h1 className='font-lobster text-nowrap text-2xl md:text-5xl '>Chef Katé</h1>
                </div>
            </header>
        </>
    )
}