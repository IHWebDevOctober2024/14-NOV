import { useState } from "react";
import supabase from "../supabase/config";

const initialFormData = {
  name: "",
  calories: 0,
  servings: 0,
  image: "",
};

function Form({ getAllRecipes }) {
  const [formData, setFormData] = useState(initialFormData);

  function handleOnChange(e) {
    const value = e.target.value;
    const field = e.target.id;

    setFormData({
      ...formData,
      [field]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    supabase
      .from("recipes")
      .insert([formData])
      .then((res) => {
        console.log(res);
        getAllRecipes();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        onChange={handleOnChange}
        value={formData.name}
        type="text"
        id="name"
      />
      <label htmlFor="calories">Calories:</label>
      <input
        onChange={handleOnChange}
        value={formData.calories}
        type="number"
        id="calories"
      />
      <label htmlFor="servings">Servings:</label>
      <input
        onChange={handleOnChange}
        value={formData.servings}
        type="number"
        id="servings"
      />
      <label htmlFor="image">Image:</label>
      <input
        onChange={handleOnChange}
        value={formData.image}
        type="text"
        id="image"
      />
      <button type="submit">Create recipe</button>
    </form>
  );
}

export default Form;
