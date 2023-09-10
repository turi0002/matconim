import { useState } from "react";
import SingleRecipe from "./SingleRecipe";
import { useForm } from "react-hook-form";
import axios from 'axios';

import './Search.css'

function Search({setRecipes}) {
 
    const apiKey = import.meta.env.VITE_REACT_APP_API_KEY
    const [ingrediants, setIngrediants] = useState([])
    const [name, setName] = useState('')
    const [allCards, setAllCard] = useState({})
    const [allCardsArray,setAllCardsArray] = useState([])
    const dietArray = [
        "none",
        "Gluten Free"
        ,"Ketogenic"
        ,"Vegetarian"
        ,"Lacto-Vegetarian"
        , "Ovo-Vegetarian"
        , "Vegan"
        ,"Pescetarian"
        ,"Paleo"
        ,"primal"
        , "Low FODMAP"
        , "Whole30"
    ]
    const intolerances = [
        "none",
        "Dairy",
        "Egg",
        "Gluten",
        "Grain",
        "Peanut",
        "Seafood",
        "Sesame",
        "Shellfish",
        "Soy",
        "Sulfite",
        "Tree Nut",
        "Wheat"]
        const {
          register,
          handleSubmit,
        } = useForm();

        const onSubmit = (data) => {
          data.ingrediants = ingrediants;
          const answer =apiFetch(objToString(data));
          console.log(answer);
          // setRecipes(answer.data);
        };
          
       

    function addIngrediantsFilter() {
        ingrediants.every((e)=> e!=name) &&name!=""? setIngrediants([...ingrediants,name])  :console.log("you failed misrebly");
    }

   function objToString(data) {
    let answer =""
    answer=("https://api.spoonacular.com/recipes/complexSearch?includeIngredients="+ ingrediants.join(',+')+CheckIfSubmittedDiet(data)+CheckIfSubmittedIntolerances(data)+"&number=4"+ "&apiKey="+apiKey)
    console.log(apiKey);
    return(answer)
  }

  function CheckIfSubmittedDiet(data){
    let dietString ="";
    return data.diet !== 'none' ? dietString=(`&diet=${data.diet}`):dietString=('')
    
 }
 function CheckIfSubmittedIntolerances(data){
  let intolerancesString ="";
  return data.intolerances !== 'none' ? intolerancesString=(`&intolerances=${data.intolerances}`):intolerancesString=('');
 }

  async function apiFetch(string){
    const response = await axios.get(string);
    console.log(response);
    setRecipes(response.data.results);
    return response;
  }
  
    return (
      <div className="signup-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 id="signUpHeader">Sign Up</h1>
          <div>
            <label htmlFor="name">Ingridient:</label>
            <input type="text" id="name" onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="diet">Diet:</label>
            <select {...register("diet")} id="diet">
              {dietArray.map((diet,i)=><option value={diet} key={i}>{diet}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="intolerances">Intolerances:</label>
            <select {...register("intolerances")} id="intolerances">
              {intolerances.map((intolerance,i)=><option value={intolerance} key={i}>{intolerance}</option>)}
            </select>
          </div>
          <div>
            <input type="button" value="Add Ingredients" onClick={(() => addIngrediantsFilter([]))} />
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div>
          {allCardsArray.map((e,i) => <SingleRecipe info={e} key={i}/>)}
        </div>
      </div>
    )
  }
  
export default Search;
  