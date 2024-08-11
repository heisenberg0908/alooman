export const Button=({onClick,placeholder})=>{
    return <div>
        <button onClick={onClick} type="button" className="focus:outline-none text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">{placeholder}</button>
    </div>
}