"use server";

import RecipeCard from "@/src/components/modules/Home/RecipeCard";
import envConfig from "@/src/config/envConfig";
import { IRecipe } from "@/src/types";

const Recipes = async () => {
  const res = await fetch(`${envConfig.baseApi}/recipes`);

  // hadle request fail
  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  // data from the response
  const { data: recipes } = await res.json();

  // handle if no recipes are returned
  if (!recipes || recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div>
      <div>
        {recipes?.map((item: IRecipe) => (
          <RecipeCard key={item._id} recipe={item} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
