import { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { setUser } from '../../store/authSlice';
import { Trash, AlertTriangle, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const DeleteAccountModal = ({ isOpen, onClose }) => {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalRoot, setModalRoot] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
    // Create or find a modal container at the document root level
  useEffect(() => {
    let element = document.getElementById('delete-account-modal-root');
    if (!element) {
      element = document.createElement('div');
      element.id = 'delete-account-modal-root';
      document.body.appendChild(element);
    }
    setModalRoot(element);

    // Add body style to prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open'); // Add class for additional styling if needed
    }
    
    // Cleanup function
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);
  const handleConfirmDelete = async () => {
    if (confirmText.toLowerCase() !== "delete my account") {
      toast.error("Please type 'delete my account' to confirm deletion");
      return;
    }

    setIsDeleting(true);    try {
      // Get user ID from the Redux store - check both _id and id fields
      const userId = user?._id || user?.id;
      
      if (!userId) {
        console.error("User object:", user);
        toast.error("User ID not found. Please try logging out and logging back in.");
        return;
      }
      
      console.log("Attempting to delete user with ID:", userId);
      
      // Using the ID directly without toString conversion
      const response = await axios.delete(
        `http://localhost:8000/api/v1/user/delete-user/${userId}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("Delete response:", response);

      if (response.data?.success) {
        toast.success("Your account has been deleted successfully", {
          style: {
            color: '#10B981',
            backgroundColor: '#09090B',
            fontSize: '20px',
            borderColor: '#10B981',
            padding: '10px 20px',
          },
        });
        
        // Close the modal first
        onClose();
        
        // Clear user data from Redux store
        dispatch(setUser(null));
        
        // Navigate to home page
        navigate('/');
      } else {
        throw new Error(response.data?.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      console.error("Error details:", error.response?.data || error.message);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.message || 
                          "Failed to delete account";
                          
      toast.error(errorMessage, {
        style: {
          color: '#f44336',
          backgroundColor: '#fff',
          fontSize: '16px',
          borderColor: '#f44336',
          padding: '10px 20px',
        },
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !modalRoot) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto overflow-x-hidden">
      <div className="fixed inset-0 bg-black/80" onClick={onClose}></div>
      <div className="bg-black border border-red-500/20 rounded-lg p-8 w-11/12 max-w-md z-[10000] relative my-8">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-red-500/20"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          <h2 className="text-xl font-bold text-red-500">Delete Your Account Permanently</h2>
        </div>
        
        <p className="text-gray-300 mb-4">
          This action cannot be undone. It will permanently delete your account,
          {user?.role === "shopOwner" 
            ? " including all your shop information, products, orders, and other associated data." 
            : " all your personal information, orders, reviews, and any other data associated with it."}
        </p>
        
        <div className="my-4 bg-red-900/20 p-4 rounded border border-red-500/30">
          <p className="text-red-400 mb-2">To confirm, type "delete my account" in the field below:</p>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="bg-black/50 border-red-500/30 text-white"
            placeholder="delete my account"
            autoComplete="off"
          />
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          
          <Button
            variant="destructive"
            onClick={handleConfirmDelete}
            disabled={confirmText.toLowerCase() !== "delete my account" || isDeleting}
            className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash className="h-4 w-4" />
                <span>Delete Account</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
  return createPortal(modalContent, modalRoot);
};

// Add PropTypes validation
DeleteAccountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DeleteAccountModal;
