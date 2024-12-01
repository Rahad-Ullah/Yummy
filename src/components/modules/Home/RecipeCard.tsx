/* eslint-disable import/order */
"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import { Rating, Star } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import Link from "next/link";
import { IRecipe } from "@/src/types";

const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };

  return (
    <Link href={`/recipes/view/${recipe?._id}`}>
      <Card className="">
        <CardHeader className=" flex-col items-start">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full h-64"
            height={200}
            src={recipe.image}
            width={270}
          />
        </CardHeader>
        <CardBody className="overflow-visible">
          <h4 className="font-bold text-2xl">{recipe.title}</h4>
          <Rating
            readOnly
            itemStyles={myStyles}
            style={{ maxWidth: 100 }}
            value={5}
          />
        </CardBody>
      </Card>
    </Link>
  );
};

export default RecipeCard;
