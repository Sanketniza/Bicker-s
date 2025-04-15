import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingScreen } from "../src/components/ui/loading";
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import FluidCursor from './components/FluidCursor'; // Import FluidCursor component

// components
import Login from './components/shared/Login';
import Signup from './components/shared/Signup';
import BikeDetails from './components/Home/Bikes/bike-details';
import Home from './components/shared/Home';
import FavoritesPage from './components/user/favorites';
import Profile from './components/user/Profile';
import WishlistPage from './components/user/WishList';
import CompaniesPage from './components/Home/Bikes';
import Electric from './components/user/Electric';
import List from './components/user/List';
import CompanyTable from './components/admin/CompanyTable';
import UpdataProfile from './components/user/UpdateProfile';
import AdminHome from './components/admin/AdminHome';
import AdminCompanies from './components/admin/AdminCompanies';
import AdminProduct from './components/admin/AdminProduct';
import AdminOrder from './components/admin/AdminOrder';
import CompaniesCreation from './components/admin/CompaniesCreation';
import ProductsCreation from './components/admin/ProductsCreation';

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />
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
        path: "/description/:id", // Ensure the route parameter is correctly defined
        element: <BikeDetails />
    },
    {
        path: "/favorites",
        element: <FavoritesPage />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/WishListPage",
        element: <WishlistPage />
    },

    // {
    //     path: "/bike",
    //     element: <BikeDetails />
    // },

    {
        path: "/electric-zone",
        element: <Electric />
    },
    {
        path: "/road-zone",
        element: <BikeDetails />
    },
    {
        path: "/bikes-list",
        element: <List />
    },

   

    {
        path: "/update-profile",
        element: <UpdataProfile />
    },

    // ------------ Admin Routes -------------

    {
        path: "/admin",
        element: <AdminHome />
    },
    {
        path: "/admin-companies",
        element: <AdminCompanies />
    },
    {
        path: "/admin-products",
        element: <AdminProduct />
    },
    {
        path: "/admin-order",
        element: <AdminOrder />
    },

     // {
    //     path: "/companytable/:id",
    //     element: <CompanyTable />
    // },

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

    // {
    //     path: "*",
    //     element: <Home />
    // }
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