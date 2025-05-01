const Company = require("../models/company.model");
const User = require("../models/user.model");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/datauri");

exports.createCompany = async(req, res) => {

    try {
        const { name, description, contactDetails } = req.body;
        const { phone, email, address } = contactDetails || {};

        // Check if all required fields are provided
        if (!name || !description || !req.user || !req.user.id || !contactDetails) {
            return res.status(400).json({
                message: "Please provide all required fields.",
                success: false,
            });
        }

        // Check if company name already exists
        const existingCompany = await Company.findOne({ name: name });
        if (existingCompany) {
            return res.status(400).json({
                message: "Company name already exists. Please choose a different name.",
                success: false,
            });
        }

        // Validate role
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        if (user.role !== "shopOwner") {
            return res.status(403).json({
                message: "Access denied! Only shop owners can create a company.",
                success: false,
            });
        }

        // Handle logo upload (optional)
        let logoUrl = "";
        if (req.file) {
            const dataUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(dataUri.content);
            logoUrl = cloudResponse.secure_url;
        }

        // Create the company
        const company = await Company.create({
            name,
            description,
            ownerId: user._id,
            contactDetails: {
                phone,
                email,
                address,
            },
            logo: logoUrl,
        });

        return res.status(201).json({
            message: "Company created successfully!",
            success: true,
            company,
        });
    } catch (error) {
        console.error("Error in createCompany:", error.message);
        console.log("error at company controller createCompany");
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

exports.getAllCompanies = async(req, res) => {

    try {
        // const companies = await Company.find().populate("ownerId", "fullname email role");

        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Companies retrieved successfully.",
            success: true,
            companies,
        });

    } catch (error) {
        console.error("Error in getAllCompanies:", error.message);
        console.log("error at company controller getAllCompanies");
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
}

exports.getCompanyById = async(req, res) => {

    try {

        const { companyId } = req.params;

        const company = await Company.findById(companyId).populate("ownerId", "fullname email role");
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company retrieved successfully.",
            success: true,
            company,
        });

    } catch (error) {
        console.error("Error in getCompanyById:", error.message);
        console.log("error at company controller getCompanyById");
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

exports.updateCompany = async(req, res) => {

    try {

        const { companyId } = req.params;
        const { name, description, contactDetails } = req.body;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        // Check ownership
        if (company.ownerId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied! You are not the owner of this company.",
                success: false,
            });
        }

        // Handle logo upload (optional)
        if (req.file) {
            const dataUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(dataUri.content);
            company.logo = cloudResponse.secure_url;
        }

        // Update fields
        if (name) company.name = name;
        if (description) company.description = description;
        if (contactDetails) {
            company.contactDetails = {
                ...company.contactDetails,
                ...contactDetails,
            };
        }

        await company.save();

        return res.status(200).json({
            message: "Company updated successfully.",
            success: true,
            company,
        });

    } catch (error) {
        console.error("Error in updateCompany:", error.message);
        console.log("error at company controller updateCompany");
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};

exports.deleteCompany = async(req, res) => {

    try {

        const { companyId } = req.params;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        // Check ownership
        if (company.ownerId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied! You are not the owner of this company.",
                success: false,
            });
        }

        await company.deleteOne();

        return res.status(200).json({
            message: "Company deleted successfully.",
            success: true,
        });

    } catch (error) {
        console.error("Error in deleteCompany:", error.message);
        console.log("error at company controller deleteCompany");
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
            error: error.message,
        });
    }
};