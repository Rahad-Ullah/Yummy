"use server";

import RecipeCard from "@/src/components/UI/Home/RecipeCard";
import envConfig from "@/src/config/envConfig";
import { IRecipe } from "@/src/types";

const Recipes = async () => {
  const res = await fetch(`${envConfig.baseApi}/recipes`);
  const { data: recipes } = await res.json();
  // console.log(recipes);

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
