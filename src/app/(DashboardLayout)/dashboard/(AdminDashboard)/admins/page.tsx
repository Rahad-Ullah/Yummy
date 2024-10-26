import AddAdminModal from "@/src/components/modules/AdminDashboard/AddAdminModal";
import AdminsTable from "@/src/components/modules/AdminDashboard/AdminsTable";

const AdminsPage = async () => {
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center gap-6 my-6">
        <h3 className="ml-4">Admins</h3>
        <AddAdminModal />
      </div>
      <AdminsTable />
    </div>
  );
};

export default AdminsPage;
