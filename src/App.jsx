
import { useState } from 'react'
import './App.css'
import './components/Search'
import './components/NavBar' 
import Search from './components/Search'
import SingleRecipe from './components/SingleRecipe'
import Navbar from './components/NavBar'


function App() {
const [recipes,setRecipes] = useState([])
  return (
    <>
      <Navbar></Navbar>
      <Search setRecipes={setRecipes}/>
      <div>
        {recipes.map((info, i) => <SingleRecipe key={i} info={info}/>)}
      </div>
    </>
  )
}

export default App
