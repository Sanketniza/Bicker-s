import { Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'; // Use Routes and Route from react-router-dom
import { useState, useEffect } from "react";
import { LoadingScreen } from "../src/components/ui/loading";

// components
import Login from './components/shared/Login';
import Signup from './components/shared/Signup';
import Bikedetails from './components/Home/Bikes/bike-details';
import Home from './components/shared/Home'; // Uncomment if Home component is needed
import FavoritesPage from './components/user/favorites';
import Profile from './components/user/Profile';
import WishlistPage from './components/user/WishList';
import BikeDetails from './components/Home/Bikes';
import Electric from './components/user/Electric';

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
        <>
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <RouterProvider router={appRouter} />
            )}
        </>
    );
}

export default App;
