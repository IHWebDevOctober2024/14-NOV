import { useState } from "react";
import "./App.css";
import supabase from "./supabase/config";
import { useEffect } from "react";
import Form from "./components/Form";
import Search from "./components/Search";
import Search2 from "./components/Search2";
import { useSearchParams } from "react-router-dom";

function App() {
  const [recipesArray, setRecipesArray] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  async function getAllRecipes() {
    const queryName = searchParams.get("name");

    console.log("this is the query name: ", queryName);

    try {
      let response;
      queryName
        ? (response = await supabase
            .from("recipes")
            .select("*")
            .ilike("name", `%${queryName}%`))
        : (response = await supabase.from("recipes").select("*"));

      setRecipesArray(response.data);
      /*    let response;
      if (queryName) {
        response = await supabase
          .from("recipes")
          .select("*")
          .eq("name", queryName);
      } else {
        response = await supabase.from("recipes").select("*");
      }

      if (response.data) {
        setRecipesArray(response.data);
      } */
    } catch {
      console.log("Something went wrong");
    }
  }

  async function deleteRecipe(id) {
    try {
      const response = await supabase.from("recipes").delete().eq("id", id);
      console.log(response);
      getAllRecipes();
    } catch {
      console.log("It was not possible to delete the recipe with id: ", id);
    }
  }

  useEffect(() => {
    getAllRecipes();
    /*  supabase
      .from("recipes")
      .select("*")
      .then((res) => {
        if (res.status === 200) {
          console.log("The response is correct");
          console.log(res.data);
          setRecipesArray(res.data);
        } else if (res.status === 400) {
          console.log("Recipe not found");
        }
      }); */
  }, [searchParams]);

  return (
    <>
      <h1>Recipes</h1>
      <Search2 />
      <Search />
      <Form getAllRecipes={getAllRecipes} />
      {recipesArray.map((recipe) => {
        return (
          <div key={recipe.id}>
            <img width={"300px"} src={recipe.image} alt="" />
            <h4>{recipe.name}</h4>
            <button onClick={() => deleteRecipe(recipe.id)}>🗑️</button>
          </div>
        );
      })}
    </>
  );
}

export default App;
