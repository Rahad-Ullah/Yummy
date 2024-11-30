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
import { useRemoveAdmin } from "@/src/hooks/admin.hook";
import { useGetRecipes } from "@/src/hooks/recipe.hook";
import Link from "next/link";

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

  const { data, isFetching, refetch } = useGetRecipes(
    `?page=${page}&limit=${rowsPerPage}&isDeleted=false`
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
    (post: IRecipe, columnKey: React.Key) => {
      const cellValue = post[columnKey as keyof IRecipe];

      switch (columnKey) {
        case "title":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: post.image as string,
              }}
              name={cellValue}
            >
              {post.title}
            </User>
          );
        case "author":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {post.user.name as string}
              </p>
            </div>
          );
        case "published":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {post.createdAt.split("T")[0]}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[post.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit post">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Link href={`/dashboard/recipes/edit/${post._id}`}>
                    <PencilLine />
                  </Link>
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete post">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Trash2 onClick={() => removeAdmin({ id: post._id })} />
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

  const { mutate: removeAdmin } = useRemoveAdmin();

  return (
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
  );
}
