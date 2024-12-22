/* eslint-disable import/order */
"use client";

import RecipeCard from "@/src/components/modules/Home/RecipeCard";
import RecipeFeedSkeleton from "@/src/components/modules/Home/RecipeFeedSkeleton";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useGetRecipes } from "@/src/hooks/recipe.hook";
import { IRecipe } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useUser();

  const { data, refetch, isLoading, isFetching } = useGetRecipes(
    `?searchTerm=${searchTerm}&isDeleted=false&status=PUBLISHED&sortBy=-upvote&limit=${Infinity}&type=${user?.membership === "BASIC" ? "BASIC" : ""}`
  );
  const recipes = data?.data;

  useEffect(() => {
    refetch();
  }, [searchTerm]);

  return (
    <div className="w-11/12 max-w-screen-xl mx-auto py-16 pt-12">
      {/* search box */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
        <Input
          classNames={{
            base: "max-w-full md:max-w-md h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="lg"
          startContent={<SearchIcon size={18} />}
          type="search"
          variant="bordered"
          onChange={(e) => setSearchTerm(e.target.value as string)}
        />
        <Button
          color="warning"
          size="lg"
          onClick={() => setSearchTerm(searchTerm)}
        >
          Search
        </Button>
      </div>

      {/* recipe display */}
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isFetching
          ? Array.from({ length: 3 }).map((_, idx) => (
              <RecipeFeedSkeleton key={idx} />
            ))
          : recipes?.data?.map((item: IRecipe) => (
              <RecipeCard key={item._id} recipe={item} />
            ))}
      </div>
      {!isFetching && recipes?.count < 1 && (
        <div className="text-center mt-8 text-default-500">
          <p>No Recipe Found</p>
        </div>
      )}
    </div>
  );
};

export default Recipes;
