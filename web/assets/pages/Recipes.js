import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";

const Recipes = () => {
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [recipes, setRecipes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getRecipes = () => axios.get("/api/recipes/all");

  const getCountries = () => axios.get("https://restcountries.com/v3.1/all");

  useEffect(() => {
    setLoading(true);
    // console.log(recipes);
    Promise.all([getRecipes(), getCountries()]).then(function (results) {
      // console.log(results[0]);
      // console.log(results[1]);
      const recipesData = results[0];
      // console.log(recipesData);
      const countriesData = results[1];
      // console.log(countriesData);
      setRecipes(recipesData.data);
      setCountries(countriesData.data);
      setLoading(false);
    });
  }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  const addLikeHandler = () => {
    console.log("add was clicked");
    // this.setState((state) => {
    //   const updatedArray = state.animals.map((animal) => {
    //     if (animal.name === name) {
    //       return { ...animal, likes: animal.likes + 1 };
    //     } else {
    //       return animal;
    //     }
    //   });
    //   return {
    //     animals: updatedArray,
    //   };
    // });
  };

  const recipeFilter = recipes.filter((res) => {
    return res.name.toLowerCase().includes(search.toLowerCase());
  });

  if (isLoading) {
    return <p>Loading....</p>;
  } else {
    return (
      <>
        <div className="search">
          <input type="text" placeholder="🔍" onChange={searchHandler} />
          <h3>{search}</h3>
        </div>

        <div className="cards">
          {recipeFilter.map((recipe) => (
            // {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              data={recipe}
              country={countries.find((country) => country.cca2 === recipe.country2)}
              {...recipe}
              // add={() => addLikeHandler()}
            />
          ))}
        </div>
      </>
    );
  }
};
// }

export default Recipes;
