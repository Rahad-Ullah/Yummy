import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  _id: string;
  name: string;
  role: "ADMIN" | "USER";
  email: string;
  mobileNumber: string;
  profilePhoto: string | null;
  bio: string | null;
  membership: "BASIC" | "PREMIUM";
}

export interface IRecipe {
  _id: string;
  title: string;
  image: string;
  content: string;
  upvote: number;
  downvote: number;
  user: string;
  type: "BASIC" | "PREMIUM";
  status: "PUBLISHED" | "UNPUBLISHED";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
