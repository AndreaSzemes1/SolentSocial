import Admin from "../../components/admin";
import AdminGuard from "../../guards/admin-guard";

const AdminDashboard = () => {
  return (
    <AdminGuard>
      <Admin />
    </AdminGuard>
  );
};

export default AdminDashboard;
