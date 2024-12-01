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
    <div className="w-11/12 max-w-screen-xl mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes?.map((item: IRecipe) => (
          <RecipeCard key={item._id} recipe={item} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
