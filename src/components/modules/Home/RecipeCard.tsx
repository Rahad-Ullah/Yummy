"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import { Rating, Star } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { IRecipe } from "@/src/types";

const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  const myStyles = {
    itemShapes: Star,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };

  return (
    <div>
      <Card className="py-4">
        <CardHeader className="pt-0 pb-4 flex-col items-start">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            height={200}
            src={recipe.image}
            width={270}
          />
        </CardHeader>
        <CardBody className="overflow-visible py-0">
          <h4 className="font-bold text-2xl">{recipe.title}</h4>
          <Rating
            readOnly
            itemStyles={myStyles}
            style={{ maxWidth: 100 }}
            value={5}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default RecipeCard;
