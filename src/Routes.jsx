import { createBrowserRouter } from "react-router-dom";
import Profile from "./components/pages/Profile";
import EmployeesList from "./components/pages/EmployeeList";
import AddEmployee from "./components/pages/AddEmployee";
import EmployeeDetails from "./components/pages/EmployeeDetails";
import DepartmentList from "./components/pages/DepartmentList";
import AddDepartment from "./components/pages/AddDepartment";
import DepartmentDetails from "./components/pages/DepartmentDetails";
import ProjectsList from "./components/pages/ProjectList";
import WorksOnList from "./components/pages/WorksOnList";
import LocationList from "./components/pages/LocationList";
import Dashboard from "./components/pages/Dashboard";
import EditEmployee from "./components/pages/EditEmployee";
import DependentForm from "./components/organisms/DependentForm";

export const routers = createBrowserRouter([
    {   
     // {/* Route yang Membutuhkan Login (Semua User) */}
     element: <PrivateRoute allowedRoles={['Administrator', 'HR Manager', 'Department Manager', 'Employee Supervisor', 'Employee']}/>,
     children: [{
       path: "/profile",
       element: <Profile />,
     }]
    },     
    {   
     // {/* Route Khusus Librarian */}
     element: <PrivateRoute allowedRoles={['Administrator']}/>,            
     children: [
       {
          path: "/employees",
          element: <EmployeesList />,
       },
       {
          path: "/employees/new",
          element: <AddEmployee />,
       },
       {
          path: "/employees/:empNo",
          element: <EmployeeDetails />,
       },
       {
          path: "/departments",
          element: <DepartmentList />,
       },
       {
          path: "/departments/:id",
          element: <AddDepartment />,
       },
       {
          path: "/departments/:deptNo",
          element: <DepartmentDetails />,
       },
       {
          path: "/projects",
          element: <ProjectsList />,
       },
       {
          path: "/workson",
          element: <WorksOnList />,
       },
       {
          path: "/location",
          element: <LocationList />,
       },
      ]
    },
    {   
      // {/* Route Khusus Librarian */}
      element: <PrivateRoute allowedRoles={['HR Manager']}/>,            
      children: [
        {
           path: "/employees",
           element: <EmployeesList />,
        },
        {
           path: "/employees/new",
           element: <AddEmployee />,
        },
        {
           path: "/employees/:empNo",
           element: <EmployeeDetails />,
        },{
           path: "/employees/:empNo",
           element: <EmployeeDetails />,
        },
        {
         path: "/employees/edit/:empNo",
         element: <EditEmployee />,
        },
        {
           path: "/projects",
           element: <ProjectsList />,
        },
       ]
     },     
    {   
       // {/* Route Khusus Library Manager */}
       element: <PrivateRoute allowedRoles={['HR Manager']}/>,            
       children: [
         {
           path: "/employees",
           element: <EmployeesList />,
         },       
       ]
    },
    {   
        // {/* Route Khusus Library Manager */}
        element: <PrivateRoute allowedRoles={['Department Manager']}/>,            
        children: [
          {
            path: "/employees/:empNo",
            element: <EmployeeDetails />,
          },       
        ]
    },          
    {   
        // {/* Route Khusus Library Manager */}
        element: <PrivateRoute allowedRoles={['Employee ']}/>,            
        children: [
          {
            path: "/employees/:empNo",
            element: <EmployeeDetails />,
          },       
          {
            path: "/employees/dependent/:empNo",
            element: <DependentForm />,
          },       
        ]
    },          
    {/* Rute Publik */
       element: <Layout />,
       children: [
         {
           path: "/",
           element: <Dashboard />,
         },
         {
           path: "/login",
           element: <Login />,
         },
         {
            path: "/register",
            element: <Register />,
         },
         {
           path: "/logout",
           element: <Logout />,
         },    
         {/* Halaman Unauthorized */
           path: "/unauthorized",
           element: <Unauthorized />
         },
        ]   
    } 
])    