// Create a new file: d:\Bicker's\Frontend\src\components\UserProtection.jsx
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserProtection = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        // If user is shopOwner, redirect to admin dashboard
        if (user && user.role === 'shopOwner') {
            navigate("/admin");
        }
    }, [user, navigate]);

    return children;
};

UserProtection.propTypes = {
    children: PropTypes.node.isRequired
}

export default UserProtection;