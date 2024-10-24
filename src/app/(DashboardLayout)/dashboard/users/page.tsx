import UsersTable from "@/src/components/modules/Users/UsersTable";

const UsersPage = async () => {
  return (
    <div className="mt-5">
      <h3 className="mb-4 ml-4">Users</h3>
      <UsersTable />
    </div>
  );
};

export default UsersPage;
