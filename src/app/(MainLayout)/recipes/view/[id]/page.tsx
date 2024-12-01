/* eslint-disable import/order */
"use client";

import DOMPurify from "dompurify";

import { useGetSingleRecipe, useUpdateRecipe } from "@/src/hooks/recipe.hook";
import { IRecipe } from "@/src/types";
import Loading from "@/src/components/UI/Loading";
import { Avatar } from "@nextui-org/avatar";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Button } from "@nextui-org/button";
import { useCreateRating, useGetAverageRating } from "@/src/hooks/rating.hooks";
import RatingStar from "@/src/components/UI/RatingStar";
import Link from "next/link";
import { Rating, Star } from "@smastrom/react-rating";
import { useState } from "react";
import { useUser } from "@/src/context/user.provider";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ff9933",
  inactiveFillColor: "#ffcc80",
};

const RecipeDetailsPage = ({ params }: any) => {
  const { data, isLoading } = useGetSingleRecipe(params?.id);
  const recipe = data?.data as IRecipe | undefined;

  const { data: rating } = useGetAverageRating(recipe?._id as string);

  const [newRating, setNewRating] = useState(rating?.data);

  const sanitizedContent = DOMPurify.sanitize(recipe?.content as string);

  const { mutate: updateRecipe } = useUpdateRecipe();
  const { mutate: createRating } = useCreateRating();
  const { user } = useUser();

  const handleUpvote = () => {
    updateRecipe({
      id: recipe?._id,
      data: { upvote: (recipe?.upvote as number) + 1 },
    });
  };
  const handleDownvote = () => {
    updateRecipe({
      id: recipe?._id,
      data: { downvote: (recipe?.downvote as number) + 1 },
    });
  };

  const handleCreateRating = () => {
    const payload = {
      recipe: recipe?._id,
      user: user?._id,
      ratingCount: newRating,
    };

    createRating(payload);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="w-6/12 max-w-screen-xl mx-auto py-16 space-y-8">
      <h1 className="text-5xl font-extrabold">{recipe?.title}</h1>
      {/* post about info section */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Avatar src={recipe?.user?.profilePhoto as string} />
          <div className="text-sm">
            <p className="font-bold text-medium">{recipe?.user?.name}</p>
            <p>Posted on {recipe?.createdAt?.split("T")[0]}</p>
          </div>
        </div>
        <Link className="flex items-center gap-2" href={"#rating"}>
          <RatingStar rating={rating?.data} />
          <p>{rating?.data}</p>
        </Link>
        <div className="flex items-center gap-4">
          <Button className="text-lg" variant="light" onClick={handleUpvote}>
            <ArrowUpCircle />
            {recipe?.upvote}
          </Button>
          <Button className="text-lg" variant="light" onClick={handleDownvote}>
            <ArrowDownCircle />
            {recipe?.downvote}
          </Button>
        </div>
      </div>
      {/* post image */}
      <img
        alt="recipe_image"
        className="w-full rounded"
        height={500}
        src={recipe?.image as string}
        width={600}
      />
      {/* post body */}
      <div>
        <article
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          className="prose lg:prose-lg"
        />
      </div>
      {/* rating */}
      <div className="">
        <h1 className="text-4xl font-bold mb-6">Ratings</h1>
        <div className="border p-8 bg-default-100 space-y-6" id="rating">
          <h1 className="text-xl font-bold mb-5">My Rating</h1>
          <Rating
            itemStyles={myStyles}
            style={{ maxWidth: 200 }}
            value={newRating || rating?.data}
            onChange={(value: number) => setNewRating(value)}
          />
          <Button
            className="text-base"
            color="warning"
            variant="shadow"
            onClick={handleCreateRating}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
