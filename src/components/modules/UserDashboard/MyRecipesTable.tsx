"use client";

/* eslint-disable import/order */
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  ChipProps,
  Spinner,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import { IRecipe } from "@/src/types";
import { PencilLine, Trash2 } from "lucide-react";
import { useDeleteRecipe, useGetRecipes } from "@/src/hooks/recipe.hook";
import Link from "next/link";
import { useUser } from "@/src/context/user.provider";

const statusColorMap: Record<string, ChipProps["color"]> = {
  ACTIVE: "success",
  BLOCKED: "danger",
  PREMIUM: "warning",
};

const columns = [
  { name: "TITLE", uid: "title" },
  { name: "AUTHOR", uid: "author" },
  { name: "PUBLISHED", uid: "published" },
  { name: "TYPE", uid: "type" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function RecipesTable() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const { user } = useUser();

  const { data, isFetching, refetch } = useGetRecipes(
    `?page=${page}&limit=${rowsPerPage}&isDeleted=false&user=${user?._id}`
  );
  const users = (data?.data?.data as IRecipe[]) ?? [];
  const count = data?.data?.count;

  // Refetch data when page changes
  React.useEffect(() => {
    refetch();
  }, [page]);

  const pages = React.useMemo(() => {
    return count ? Math.ceil(count / rowsPerPage) : 0;
  }, [count, rowsPerPage]);

  // render table cells
  const renderCell = React.useCallback(
    (recipe: IRecipe, columnKey: React.Key) => {
      const cellValue = recipe[columnKey as keyof IRecipe];

      switch (columnKey) {
        case "title":
          return (
            <Link href={`/recipes/view/${recipe?._id}`}>
              <User
                avatarProps={{
                  radius: "lg",
                  src: recipe.image as string,
                }}
                name={cellValue}
              >
                {recipe.title}
              </User>
            </Link>
          );
        case "author":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {recipe.user.name as string}
              </p>
            </div>
          );
        case "published":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {recipe.createdAt.split("T")[0]}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[recipe.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit recipe">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Link href={`/dashboard/recipes/edit/${recipe._id}`}>
                    <PencilLine />
                  </Link>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete recipe">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Trash2 onClick={() => deleteRecipe({ id: recipe._id })} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const { mutate: deleteRecipe } = useDeleteRecipe();

  return count > 0 ? (
    <Table
      aria-label="Example table with custom cells"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            className={column.uid === "actions" ? "text-center" : "text-start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={users ?? []}
        loadingContent={<Spinner />}
        loadingState={isFetching ? "loading" : "idle"}
      >
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  ) : (
    <p className="text-center my-4">No Data Found</p>
  );
}
