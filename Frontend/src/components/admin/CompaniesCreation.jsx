// import Footer from "../shared/footer"

// function CompaniesCreation() {
//     return (
//         <>
//             <AdminNavbar />

//             <div className="mx-5">
//                 <div className="relative p-10 mx-auto my-20 border rounded-lg shadow-2xl border-emerald-500/30 max-w-4xl bg-black/20 backdrop-blur-sm">

//                 {/* Glow effect */}
//                 <div
//                     className="absolute inset-0 rounded-lg opacity-30 blur-xl"
//                     style={{
//                     background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
//                     }}
//                 />

//                 <h1>Companies Creation Page</h1>

//                 </div>
//             </div>

//             <Footer />
        
//         </>
//     )
// }

// export default CompaniesCreation;

import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../shared/AdminNavbar"


const CompaniesCreation = ({ addCompany }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      description,
      logo,
      phone,
      email,
      street,
      city,
      state,
      zip,
      country,
    } = formData;

    if (!name || !description) {
      return alert("Name and Description are required.");
    }

    const newCompany = {
      name,
      description,
      logo,
      contactDetails: {
        phone,
        email,
        address: {
          street,
          city,
          state,
          zip,
          country,
        },
      },
      createdAt: new Date(),
      // ownerId will be handled from backend auth
    };

    addCompany(newCompany);
    navigate("/");
  };

  return (


        <>
            <AdminNavbar />
            
            <div className="mx-10">
                <div className="relative p-10 mx-auto my-10 border rounded-lg shadow-2xl border-orange-500/30 max-w-4xl bg-black/20 backdrop-blur-sm">

                    <div
                        className="absolute inset-0 rounded-lg opacity-30 blur-xl"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3), transparent 80%)`,
                        }}
                    />

                    <div className="relative z-10 text-white">

                        <h1 className="text-3xl font-bold text-center text-green-500 mb-6">
                            Create New Company
                        </h1>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                            <label className="block mb-1">Company Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter company name"
                                className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                                required
                            />
                            </div>

                            <div>
                            <label className="block mb-1">Logo URL</label>
                            <input
                                type="text"
                                name="logo"
                                value={formData.logo}
                                onChange={handleChange}
                                placeholder="Paste image URL"
                                className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                            />
                            {formData.logo && (
                                <img
                                src={formData.logo}
                                alt="preview"
                                className="mt-2 w-16 h-16 rounded-full object-cover"
                                />
                            )}
                            </div>

                            <div className="md:col-span-2">
                            <label className="block mb-1">Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter description (max 1000 characters)"
                                maxLength={1000}
                                className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20 h-28"
                                required
                            />
                            </div>

                            <div>
                            <label className="block mb-1">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                            />
                            </div>

                            <div>
                            <label className="block mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                            />
                            </div>

                            <div>
                            <label className="block mb-1">Street</label>
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                            />
                            </div>

                            <div>
                            <label className="block mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                            />
                            </div>

                            <div>
                            <label className="block mb-1">State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                            />
                            </div>

                            <div>
                            <label className="block mb-1">ZIP</label>
                            <input
                                type="text"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                            />
                            </div>

                            <div className="md:col-span-2">
                            <label className="block mb-1">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-black/50 text-white border border-white/20"
                            />
                            </div>

                            <button
                                type="submit"
                                className="md:col-span-2 bg-green-600 hover:bg-green-700 py-2 px-6 rounded text-white font-semibold shadow mt-4"
                            >
                            Create Company
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompaniesCreation;


