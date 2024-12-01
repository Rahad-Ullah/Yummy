/* eslint-disable import/order */
import RecipesTable from "@/src/components/modules/UserDashboard/MyRecipesTable";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const RecipesPage = async () => {
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center gap-6 my-6">
        <h3 className="ml-4">My Recipes</h3>
        <Link href={"/dashboard/recipes/add-new"}>
          <Button color="warning">Add Recipe</Button>
        </Link>
      </div>
      <RecipesTable />
    </div>
  );
};

export default RecipesPage;
