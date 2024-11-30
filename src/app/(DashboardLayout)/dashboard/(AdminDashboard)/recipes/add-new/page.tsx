"use client";
/* eslint-disable padding-line-between-statements */
/* eslint-disable import/order */
import { Button } from "@nextui-org/button";
import YMForm from "@/src/components/form/YMForm";
import YMInput from "@/src/components/form/YMInput";
import { addRecipeValidationSchema } from "@/src/schemas/recipe.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Input } from "@nextui-org/input";
import React, { useRef, useState } from "react";
import QuillEditor from "@/src/components/UI/QuillEditor/QuillEditor";
import { uploadToImgBB } from "@/src/services/RecipeService";
import { useCreateRecipe } from "@/src/hooks/recipe.hook";
import Loading from "@/src/components/UI/Loading";

const AddNewRecipe = () => {
  // state for image file
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the file input

  // state for editor content
  const [content, setContent] = useState("");

  // handle image upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Generate preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Update preview URL
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // cancel image upload
  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel the upload?")) {
      setFile(null);
      setPreview(null);

      // Reset the file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const { mutate: createRecipe, isPending } = useCreateRecipe();

  // submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      // Upload the file to ImgBB and get the URL
      const recipeImageUrl = file ? await uploadToImgBB(file) : "";

      // prepare the recipe data
      const recipeData = { ...data, content, image: recipeImageUrl };

      createRecipe(recipeData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  return (
    <div className="w-full p-6 md:p-8 mt-6 rounded-3xl border">
      {isPending && <Loading />}
      <h3 className="mb-6 text-2xl font-medium">Add Recipe</h3>
      <YMForm
        resolver={zodResolver(addRecipeValidationSchema)}
        onSubmit={onSubmit}
      >
        <div className="py-3">
          <YMInput label="Recipe Title" name="title" type="text" />
        </div>

        <div className="h-96 py-3">
          <QuillEditor content={content} setContent={setContent} />
        </div>

        {/* image input */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 py-3 mt-10">
          <p>Upload Image</p>
          <div className="w-full md:w-4/12">
            <Input
              ref={fileInputRef}
              accept="image/*"
              type="file"
              variant="bordered"
              onChange={handleFileChange}
            />
          </div>
          {file && (
            <Button color="danger" variant="flat" onClick={handleCancel}>
              Cancel Upload
            </Button>
          )}
        </div>

        {/* image preview */}
        {preview && (
          <div className="py-4 max-w-56">
            <p>Image Preview:</p>
            <img
              alt="Selected file"
              className="rounded-md mt-2"
              src={preview}
            />
          </div>
        )}

        <Button
          className="mt-3 rounded-md bg-default-900 font-semibold text-default"
          size="lg"
          type="submit"
        >
          Submit
        </Button>
      </YMForm>
    </div>
  );
};

export default AddNewRecipe;
