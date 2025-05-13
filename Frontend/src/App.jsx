import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingScreen } from "../src/components/ui/loading";
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';

// components
import Login from './components/shared/Login';
import Signup from './components/shared/Signup';
import BikeDetails from './components/Home/Bikes/bike-details';
import Home from './components/shared/Home';
import Profile from './components/user/Profile';
import WishlistPage from './components/user/WishList';
import Electric from './components/Home/Electric';
import List from './components/user/List';
import CompanyTable from './components/admin/CompanyTable';
import UpdataProfile from './components/user/UpdateProfile';
import AdminHome from './components/admin/AdminHome';
import AdminCompanies from './components/admin/AdminCompanies';
import AdminProduct from './components/admin/AdminProduct';
import AdminOrder from './components/admin/AdminOrder';
import CompaniesCreation from './components/admin/CompaniesCreation';
import ProductsCreation from './components/admin/ProductsCreation';
import Protection from './components/ProtectionRoutes/Protection';
import UserProtection from './components/ProtectionRoutes/UserProtection';
import Error from './components/ProtectionRoutes/Error';
import AdminNotification from './components/admin/AdminNotification';
import OrderDetails from './components/user/OrderDetails';
import CompanyEdit from './components/admin/CompanyEdit';
import ProductEdit from './components/admin/ProductEdit';

const appRouter = createBrowserRouter([

    // {
    //     path: "/",
    //     element: <Home />
    // },

    {
        path: "/",
        element: <UserProtection><Home /></UserProtection> // Allow users, redirect shop owners
    },

    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/description/:id",
        element: <UserProtection><BikeDetails /></UserProtection>
    },
  
    {
        path: "/profile",
        element: <UserProtection><Profile /></UserProtection>
    },
  
    // {
    //     path: "/profile",
    //     element: <Profile />
    // },
    

    // {
    //     path: "/bike",
    //     element: <BikeDetails />
    // },

    {
        path: "/WishListPage",
        element: <UserProtection><WishlistPage /></UserProtection>
    },

    {
        path: "/electric-zone",
        element: <UserProtection><Electric /></UserProtection>
    },
    {
        path: "/road-zone",
        element: <UserProtection><BikeDetails /></UserProtection>
    },
    {
        path: "/bikes-list",
        element: <UserProtection><List /></UserProtection>
    },

    {
        path: "/update-profile",
        element: <UserProtection><UpdataProfile /></UserProtection>
    },

    {
        path:"/order-details",
        element: <UserProtection><OrderDetails /></UserProtection>
    },

    // ------------ Admin Routes -------------

    // {
    //     path: "/admin",
    //     element: <AdminHome />  
    // },
    // {
    //     path: "/admin-companies",
    //     element: <AdminCompanies />
    // },
    // {
    //     path: "/admin-products",
    //     element: <AdminProduct />
    // },
    // {
    //     path: "/admin-order",
    //     element: <AdminOrder />
    // },

    //& for protection the admin routes when user is not admin

    {
        path: "/admin",
        element: <Protection><AdminHome /></Protection>
    },
    {
        path: "/admin-companies",
        element: <Protection><AdminCompanies /></Protection>
    },
    {
        path: "/admin-products",
        element: <Protection><AdminProduct /></Protection>
    },
    {
        path: "/admin-order",
        element: <Protection><AdminOrder /></Protection>
    },
   

    {
        path: "/companytable",
        element: <CompanyTable />
    },

    {
        path: "/admin/companies-creation",
        element: <CompaniesCreation />
    },

    {
        path: "/admin-products/products-creation",
        element: <ProductsCreation />
    },

    {
        path: "/admin/companies-edit/:id",
        element: <CompanyEdit />
    },

    {
        path: "/admin/product-edit/:id",
        element: <ProductEdit />
    },



    // {
    //     path: "/admin-profile",
    //     element: <AdminProfile /> // Add Admin />
    // },

    {
        path: "/admin-notification",
        element: <Protection><AdminNotification /></Protection>
    },

    {
        path: "/profile",
        element: <Profile />
    },

    {
        path: "*",
        element: <Error />
    }
]);

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <>
                    <RouterProvider router={appRouter} />
                    <Toaster />
                    {/* <FluidCursor /> Add FluidCursor component here */}
                </>
            )}
        </ThemeProvider>
    );
}

export default App;