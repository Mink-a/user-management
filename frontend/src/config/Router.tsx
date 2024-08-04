import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DashboardLayout } from '@/Layouts';
import { DashboardPage } from '@/pages/dashboard/Dashboard.page';
import { LoginPage } from '@/pages/auth/Login.page';
import { RootLayout } from '@/Layouts/RootLayout';
import { ProfilePage } from '@/pages/profile/Profile.page';
import { StaffPage } from '@/pages/staff/Staff.page';
import { DepartmentPage } from '@/pages/departments/Department.page';
import { RolePage } from '@/pages/role/Role.page';
import { PermissionPage } from '@/pages/permission/Permission.page';
import { StaffDetails } from '@/pages/staff/Staff.details';

const router = createBrowserRouter([
  { path: '/', element: <RootLayout /> },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/d',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'staffs',
        element: <StaffPage />,
      },
      {
        path: 'staffs/:id',
        element: <StaffDetails />,
      },
      {
        path: 'departments',
        element: <DepartmentPage />,
      },
      {
        path: 'roles',
        element: <RolePage />,
      },
      {
        path: 'permissions',
        element: <PermissionPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
