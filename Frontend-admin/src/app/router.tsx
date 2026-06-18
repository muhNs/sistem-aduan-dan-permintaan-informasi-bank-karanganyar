import { createBrowserRouter } from "react-router-dom";

import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../features/auth/routes/ProtectedRoute";

// Pages
import DashboardView from "../features/dashboard/pages/DashboardView";
import  { AduanList } from "../features/aduan/pages/AduanList";
import PermintaanList from "../features/permintaan-informasi/pages/InformationRequestList";
import UserList from "../features/users/pages/UserList";
import SettingsView from "../features/settings/pages/SettingsView";
import LoginView from "../features/auth/pages/LoginView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />, // 🔒 PROTECTED ADMIN ROUTES
    children: [
      {
        element: <Layout />, // Layout Sidebar + Navbar
        children: [
          {
            index: true,
            element: <DashboardView />,
          },
          {
            path: "aduan",
            element: <AduanList />,
          },
          {
            path: "permintaan-informasi",
            element: <PermintaanList />,
          },
          {
            path: "manajemen-user",
            element: <UserList />,
          },
          {
            path: "settings",
            element: <SettingsView />,
          },
        ],
      },
    ],
  },

  // AUTH
  {
    path: "/auth/login",
    element: <LoginView />,
  },

  // FALLBACK (Not Found / Redirect)
  {
    path: "*",
    element: <Navigate to="/auth/login" replace />, // Redirect ke login jika route tidak dikenal
  },
]);
