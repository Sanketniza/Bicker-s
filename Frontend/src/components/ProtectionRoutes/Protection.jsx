import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const Protection = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const location = useLocation(); // Add this to access current location

    useEffect(() => {
        // If no user or user is not shopOwner, redirect to home
        if (!user || user.role !== 'shopOwner') {
            navigate("/");
            return;
        }

        // If user is shopOwner and tries to access root route, redirect to admin
        if (user.role === 'shopOwner' && location.pathname === '/') {
            navigate("/admin");
        }
    }, [user, location.pathname, navigate]); // Add dependencies

    return children;
};

Protection.propTypes = {
    children: PropTypes.node.isRequired
}

export default Protection;