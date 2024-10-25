import AdminsTable from "@/src/components/modules/AdminDashboard/AdminsTable";

const AdminsPage = async () => {
  return (
    <div className="mt-5">
      <h3 className="mb-4 ml-4">Admins</h3>
      <AdminsTable />
    </div>
  );
};

export default AdminsPage;
