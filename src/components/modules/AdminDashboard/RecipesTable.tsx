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
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { IRecipe } from "@/src/types";
import { Ellipsis } from "lucide-react";
import {
  useDeleteRecipe,
  useGetRecipes,
  useUpdateRecipeStatus,
} from "@/src/hooks/recipe.hook";
import Link from "next/link";

const statusColorMap: Record<string, ChipProps["color"]> = {
  PUBLISHED: "success",
  BLOCKED: "danger",
  UNPUBLISHED: "warning",
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

  const { data, isFetching, refetch } = useGetRecipes(
    `?page=${page}&limit=${rowsPerPage}&isDeleted=false`
  );
  const recipes = (data?.data?.data as IRecipe[]) ?? [];
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
            <div className="relative flex justify-center items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <Ellipsis className="text-default-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() =>
                      updateRecipeStatus({
                        id: recipe?._id,
                        data: {
                          status:
                            recipe?.status === "PUBLISHED"
                              ? "UNPUBLISHED"
                              : "PUBLISHED",
                        },
                      })
                    }
                  >
                    {recipe?.status === "PUBLISHED" ? "Unpublish" : "Publish"}
                  </DropdownItem>
                  <DropdownItem
                    className="text-danger-500"
                    color="danger"
                    onClick={() => deleteRecipe({ id: recipe._id })}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const { mutate: deleteRecipe } = useDeleteRecipe();
  const { mutate: updateRecipeStatus } = useUpdateRecipeStatus();

  return (
    <div>
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
              className={
                column.uid === "actions" ? "text-center" : "text-start"
              }
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={recipes ?? []}
          loadingContent={<Spinner />}
          loadingState={isFetching || count === 0 ? "loading" : "idle"}
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
      {count < 1 && (
        <div>
          <p className="text-center mt-20">No Data Found</p>
        </div>
      )}
    </div>
  );
}
