import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
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
        }
    ]);

    return (
        <>
            <RouterProvider router={appRouter} />
            {/* <Toaster /> */}

            <Routes>
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                {/* 
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                /> 
                */}
            </Routes>
        </>
    );
}

export default App;
