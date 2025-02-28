import  { useState, useEffect } from 'react';
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoadingScreen } from "../src/components/ui/loading";
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';

// components
import Login from './components/shared/Login';
import Signup from './components/shared/Signup';
import Bikedetails from './components/Home/Bikes/bike-details';
import Home from './components/shared/Home';
import FavoritesPage from './components/user/favorites';
import Profile from './components/user/Profile';
import WishlistPage from './components/user/WishList';
import BikeDetails from './components/Home/Bikes';
import Electric from './components/user/Electric';
import List from './components/user/List';
import CompanyTable from './components/admin/CompanyTable';

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
        path: "/description/:id",
        element: <Bikedetails />
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
    {
        path: "/bike",
        element: <BikeDetails />
    },
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
        path: "/companytable/:id",
        element: <CompanyTable />
    },

    

    {
        path: "*",
        element: <Home />
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
                </>
            )}
        </ThemeProvider>
    );
}

export default App;