import { Routes, Route } from 'react-router-dom'; // Use Routes and Route from react-router-dom
// import './App.css';
// import { Toaster } from "./components/ui/sonner";

// components
import Login from './components/shared/Login';
import Signup from './components/shared/Signup';
import Bikedetails from './components/Home/Bikes/bike-details';
import Home from './components/shared/Home'; // Uncomment if Home component is needed

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/description/:id" element={<Bikedetails />} />
        {/* Add more routes here if needed */}
      </Routes>
      {/* <Toaster /> */}
    </>
  );
}

export default App;
