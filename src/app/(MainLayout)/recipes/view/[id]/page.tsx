"use client";

import { useGetSingleRecipe } from "@/src/hooks/recipe.hook";
import { IRecipe } from "@/src/types";

const RecipeDetailsPage = ({ params }: any) => {
  const { data } = useGetSingleRecipe(params?.id);
  const recipe = data?.data as IRecipe | undefined;

  //   console.log(recipe);

  return (
    <div>
      <h1>{recipe?.title}</h1>
    </div>
  );
};

export default RecipeDetailsPage;
