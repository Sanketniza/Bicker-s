import { useState } from 'react';
import { Button } from '../ui/button';
import { Edit2 } from 'lucide-react';
import Navbar from '../shared/Navbar';
import { useSelector } from 'react-redux';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import UpdateProfile from './UpdateProfile';
import Footer from '../shared/footer';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  // Debug logging
  console.log("Full User Object from Redux:", user);
  console.log("User Information:");
  console.log("Full Name:", user?.fullname);
  console.log("Email:", user?.email);
  console.log("Phone:", user?.phone);
  console.log("Address:", user?.address);
  console.log("Bio:", user?.bio);
  console.log("Social Media Links:", user?.socialMediaLinks);
  console.log("Payment Info:", user?.paymentInfo);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="mx-10 my-20 text-center text-white">
          <h1 className="text-2xl">Loading profile...</h1>
          <p>Or you might need to log in to view your profile.</p>
        </div>
      </>
    );
  }

  // if (user?.role !== 'user') {
  //   return (
  //     <>
  //       <Navbar />
  //       <div className="mx-10 my-20 text-center text-white">
  //         <h1 className="text-2xl">Access Denied</h1>
  //         <p>You do not have permission to view this page.</p>
  //       </div>
  //     </>
  //   );
  // }

 

  return (
    <>
      <Navbar />
      <div className="mx-10">
        <div className="relative p-10 mx-auto my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-4xl bg-black/20 backdrop-blur-sm">
          {/* Glow effect */}
          <div
            className="absolute inset-0 rounded-lg opacity-30 blur-xl"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
            }}
          />

          {isEditing ? (
            <UpdateProfile onClose={handleCloseEdit} />
          ) : (
            <>
              <div className="relative flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">
                  <span className="text-emerald-500">My</span> Profile
                </h1>
                <Button
                  onClick={handleEdit}
                  variant="outline"
                  className="gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-white">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-emerald-500">Name</label>
                    <p className="mt-1">{user.fullname || 'Not provided'}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#F97316]">Email</label>
                    <p className="mt-1">{user.email || 'Not provided'}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#F97316]">Phone</label>
                    <p className="mt-1">{user.phone || 'Not provided'}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#F97316]">Address</label>
                    <p className="mt-1">
                      {user.address && Object.values(user.address).some(val => val)
                        ? `${user.address.street}, ${user.address.city}, ${user.address.state} ${user.address.zip}, ${user.address.country}`
                        : 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#F97316]">Bio</label>
                    <p className="mt-1">{user.bio || 'Not provided'}</p>
                  </div>

                  <div className="bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/30">
                    <label className="text-sm font-medium text-emerald-500">Social Media</label>
                    <div className="mt-2 flex gap-4">
                      <a
                        href={user.socialMediaLinks?.facebook || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Facebook />
                      </a>

                      <a
                        href={user.socialMediaLinks?.twitter || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-500 hover:text-sky-600"
                      >
                        <Twitter />
                      </a>

                      <a
                        href={user.socialMediaLinks?.instagram || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700"
                      >
                        <Instagram />
                      </a>

                      <a
                        href={user.socialMediaLinks?.linkedin || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-800"
                      >
                        <Linkedin />
                      </a>

                    </div>
                  </div>

                  <div className="bg-emerald-500/5 p-4 rounded-lg border border-emerald-500/30">
                    <label className="text-sm font-medium text-emerald-500">Payment Information</label>
                    <p className="mt-1">
                      {user.paymentInfo?.bankAccount
                        ? `Bank: ${user.paymentInfo.bankAccount}`
                        : user.paymentInfo?.upiId
                        ? `UPI: ${user.paymentInfo.upiId}`
                        : 'No payment info available'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}