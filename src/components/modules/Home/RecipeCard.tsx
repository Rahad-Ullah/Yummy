/* eslint-disable import/order */
"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";

import "@smastrom/react-rating/style.css";
import Link from "next/link";
import { IRecipe } from "@/src/types";
import RatingStar from "../../UI/RatingStar";
import { useGetAverageRating } from "@/src/hooks/rating.hooks";

const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  const { data: rating } = useGetAverageRating(recipe?._id);

  return (
    <Link href={`/recipes/view/${recipe?._id}`}>
      <Card className="hover:scale-105">
        <CardHeader className=" flex-col items-start">
          <Image
            priority
            alt="Card background"
            className="object-cover rounded-xl w-full h-64"
            height={200}
            src={recipe.image}
            width={270}
          />
        </CardHeader>
        <CardBody className="overflow-visible">
          <h4 className="font-bold text-2xl">{recipe.title}</h4>
          <RatingStar rating={rating?.data} />
        </CardBody>
      </Card>
    </Link>
  );
};

export default RecipeCard;
