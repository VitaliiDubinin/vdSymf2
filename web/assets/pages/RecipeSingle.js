import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const RecipeSingle = () => {
  const location = useLocation();
  const recipe = location.state.data;
  const country = location.state.country;

  // console.log(recipe);
  // console.log(country);

  return (
    <div className="card">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} />
      <img className="flag" src={country.flags.png} alt={country.name.common} />
    </div>
  );
};
export default RecipeSingle;
