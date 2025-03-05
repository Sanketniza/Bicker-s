import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Save, ArrowLeft, Edit2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { toast } from 'sonner';
import { setUser } from '../../store/authSlice';
import axios from 'axios';

const UpdateProfile = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Local state to manage editable fields and editing mode
  const [isEditable, setIsEditable] = useState(false);
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address
      ? `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}, ${user.address.country}`
      : '',
    bio: user?.bio || '',
    socialMediaLinks: user?.socialMediaLinks || {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
    paymentInfo: user?.paymentInfo || {
      bankAccount: '',
      upiId: '',
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('socialMediaLinks.')) {
      const key = name.split('.')[1];
      setProfileData((prev) => ({
        ...prev,
        socialMediaLinks: {
          ...prev.socialMediaLinks,
          [key]: value,
        },
      }));
    } else if (name.startsWith('paymentInfo.')) {
      const key = name.split('.')[1];
      setProfileData((prev) => ({
        ...prev,
        paymentInfo: {
          ...prev.paymentInfo,
          [key]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Save changes to Redux and backend
  const handleSave = async () => {
    const updatedUser = {
      fullname: profileData.fullname || '',
      email: profileData.email || '',
      phone: profileData.phone || '',
      address: profileData.address || '',
      bio: profileData.bio || '',
      socialMediaLinks: profileData.socialMediaLinks,
      paymentInfo: profileData.paymentInfo,
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/profile/update',
        updatedUser,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('Response:', response); // Log full response for debugging

      if (response.status === 200 && response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message || 'Profile updated successfully');
        onClose();
      } else {
        throw new Error(response.data.message || 'Internal server error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Internal server error');
    }
  };

  // Toggle editable state
  const toggleEdit = () => {
    setIsEditable((prev) => !prev); // Toggle between true/false
  };

  return (
    <div className="relative p-10 mx-auto my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-4xl bg-black/20 backdrop-blur-sm">
      {/* Glow effect */}
      {
        !isEditable && (
          <div
          className="absolute inset-0 rounded-lg opacity-30 blur-xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
          }}
          />
          
        ) 
      }

      <div className="relative flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">
          <span className="text-emerald-500">Edit</span> Profile
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={toggleEdit}
            variant="outline"
            className="gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
          >
            <Edit2 className="h-4 w-4" />
            {isEditable ? 'Lock Fields' : 'Unlock Fields'}
          </Button>
          <Button
            onClick={handleSave}
            variant="outline"
            className="gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
            disabled={!isEditable} // Disable Save button unless fields are editable
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border-red-500/30"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-emerald-500">Name</label>
            <Input
              name="fullname"
              value={profileData.fullname}
              onChange={handleChange}
              disabled={!isEditable} // Enable editing only when isEditable is true
              className="mt-1 bg-white/5 border-emerald-500/30 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
            {console.log(isEditable)}
          </div>

          <div>
            <label className="text-sm font-medium text-[#F97316]">Email</label>
            <Input
              name="email"
              value={profileData.email}
              onChange={handleChange}
              disabled={!isEditable}
              className="mt-1 bg-white/5 border-emerald-500/30 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#F97316]">Phone</label>
            <Input
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              disabled={!isEditable}
              className="mt-1 bg-white/5 border-emerald-500/30 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#F97316]">Address</label>
            <Input
              name="address"
              value={profileData.address}
              onChange={handleChange}
              disabled={!isEditable}
              className="mt-1 bg-white/5 border-emerald-500/30 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#F97316]">Bio</label>
            <Textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              disabled={!isEditable}
              className="mt-1 h-32 bg-white/5 border-emerald-500/30 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>

          <div className="bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/30">
            <label className="text-sm font-medium text-emerald-500">Social Media</label>
            <div className="mt-2 space-y-2">
              <Input
                name="socialMediaLinks.facebook"
                value={profileData.socialMediaLinks.facebook}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="Facebook URL"
                className="bg-white/5 border-emerald-500/30 text-white"
              />
              <Input
                name="socialMediaLinks.twitter"
                value={profileData.socialMediaLinks.twitter}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="Twitter URL"
                className="bg-white/5 border-emerald-500/30 text-white"
              />
              <Input
                name="socialMediaLinks.instagram"
                value={profileData.socialMediaLinks.instagram}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="Instagram URL"
                className="bg-white/5 border-emerald-500/30 text-white"
              />
              <Input
                name="socialMediaLinks.linkedin"
                value={profileData.socialMediaLinks.linkedin}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="LinkedIn URL"
                className="bg-white/5 border-emerald-500/30 text-white"
              />
            </div>
          </div>

          <div className="bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/30">
            <label className="text-sm font-medium text-emerald-500">Payment Information</label>
            <div className="mt-2 space-y-2">
              <Input
                name="paymentInfo.bankAccount"
                value={profileData.paymentInfo.bankAccount}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="Bank Account"
                className="bg-white/5 border-emerald-500/30 text-white"
              />
              <Input
                name="paymentInfo.upiId"
                value={profileData.paymentInfo.upiId}
                onChange={handleChange}
                disabled={!isEditable}
                placeholder="UPI ID"
                className="bg-white/5 border-emerald-500/30 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
