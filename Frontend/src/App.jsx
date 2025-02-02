import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
// import { Toaster } from "./components/ui/sonner";

// components
import Login from './components/shared/Login';
import Signup from './components/shared/Signup';
import Home from './components/shared/Home'; // Uncomment if Home component is needed

function App() {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/sign-up',
            element: <Signup/>
        },
        {
            path: '/login',
            element: <Login/>
        }
        // Add more routes here if needed
    ]);

    return (
        <>
            <RouterProvider router={appRouter} />
            {/* <Toaster /> */}

            {/* <Login />
            <Signup /> */}
        </>
    );
}

export default App;
