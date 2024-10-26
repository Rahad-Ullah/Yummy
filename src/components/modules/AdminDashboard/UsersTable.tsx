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
import { IUser } from "@/src/types";
import { Ellipsis } from "lucide-react";
import {
  useDeleteUser,
  useGetUsers,
  useUserStatusChanged,
} from "@/src/hooks/user.hook";

const statusColorMap: Record<string, ChipProps["color"]> = {
  ACTIVE: "success",
  BLOCKED: "danger",
  PREMIUM: "warning",
};

const columns = [
  { name: "NAME", uid: "name" },
  { name: "PHONE", uid: "mobileNumber" },
  { name: "EMAIL", uid: "email" },
  { name: "MEMBERSHIP", uid: "membership" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function UsersTable() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const { data, isLoading, refetch } = useGetUsers(
    `?page=${page}&limit=${rowsPerPage}&role=USER&isDeleted=false`,
  );
  const users = (data?.data?.data as IUser[]) ?? [];
  const count = data?.data?.count;

  // Refetch data when page changes
  React.useEffect(() => {
    refetch();
  }, [page, refetch]);

  const pages = React.useMemo(() => {
    return count ? Math.ceil(count / rowsPerPage) : 0;
  }, [count, rowsPerPage]);

  // render table cells
  const renderCell = React.useCallback((user: IUser, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof IUser];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.profilePhoto as string }}
            description={user.email}
            name={cellValue}
          >
            {user.name}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "membership":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.membership]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
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
                  onClick={() => handleUserStatusChange(user._id, user.status)}
                >
                  {user.status === "ACTIVE" ? "Block" : "Unblock"}
                </DropdownItem>
                <DropdownItem
                  className="text-danger-500"
                  color="danger"
                  onClick={() => deleteUser({ id: user._id })}
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
  }, []);

  const { mutate: changeStatus } = useUserStatusChanged();
  const { mutate: deleteUser } = useDeleteUser();

  const handleUserStatusChange = (id: string, status: string) => {
    changeStatus({
      id,
      status: status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
    });
  };

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
        loadingState={isLoading || count === 0 ? "loading" : "idle"}
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
