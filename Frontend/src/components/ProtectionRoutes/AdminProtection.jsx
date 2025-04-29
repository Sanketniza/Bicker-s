import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminProtection = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        // If no user or user is not shopOwner, redirect to login
        if (!user) {
            navigate("/login");
            return;
        }
        
        if (user.role !== 'shopOwner') {
            navigate("/");
            return;
        }
    }, [user, navigate]);

    return children;
};

AdminProtection.propTypes = {
    children: PropTypes.node.isRequired
}

export default AdminProtection;