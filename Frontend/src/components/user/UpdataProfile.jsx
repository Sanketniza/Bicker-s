import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Save, ArrowLeft, Edit2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { toast } from 'sonner';
import { setUser } from '@/store/authSlice';
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
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed - Name: ${name}, Value: ${value}`); // Debug log

    if (name.startsWith('socialMediaLinks.')) {
      const key = name.split('.')[1];
      setProfileData((prev) => {
        const newData = {
          ...prev,
          socialMediaLinks: {
            ...prev.socialMediaLinks,
            [key]: value,
          },
        };
        console.log('Updated socialMediaLinks:', newData.socialMediaLinks); // Debug log
        return newData;
      });
    } else {
      setProfileData((prev) => {
        const newData = { ...prev, [name]: value };
        console.log('Updated profileData:', newData); // Debug log
        return newData;
      });
    }
  };

  // Save changes to Redux and backend
  const handleSave = async () => {
    const addressParts = profileData.address.split(', ');
    const updatedUser = {
      fullname: profileData.fullname || '',
      email: profileData.email || '',
      phone: profileData.phone || '',
      address: {
        street: addressParts[0] || '',
        city: addressParts[1] || '',
        state: addressParts[2]?.split(' ')[0] || '',
        zip: addressParts[2]?.split(' ')[1] || '',
        country: addressParts[3] || '',
      },
      bio: profileData.bio || '',
      socialMediaLinks: profileData.socialMediaLinks,
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

      const data = response.data;

      if (response.status === 200 && data.success) {
        dispatch(setUser({ ...user, ...data.user }));
        toast.success(data.message || 'Profile updated successfully');
        onClose(); // Close the edit form and return to Profile.jsx after saving
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  // Toggle editable state
  const toggleEdit = () => {
    setIsEditable((prev) => !prev);
    console.log('Editable state toggled to:', !isEditable); // Debug log
  };

  return (
    <div className="relative p-10 mx-auto my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-4xl bg-black/20 backdrop-blur-sm">
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
        }}
      />

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
            disabled={!isEditable}
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
              disabled={!isEditable}
              className="mt-1 bg-white/5 border-emerald-500/30 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#F97316]">Email</label>
            <Input
              name="email"
              type="email"
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
              type="tel"
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

        {/* Right Column */}
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
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;