"use server";

import RecipeCard from "@/src/components/modules/Home/RecipeCard";
import { getRecipes } from "@/src/services/RecipeService";
import { IRecipe } from "@/src/types";

const Recipes = async () => {
  const { data } = await getRecipes(`?isDeleted=false`);
  const recipes = data?.data;

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
