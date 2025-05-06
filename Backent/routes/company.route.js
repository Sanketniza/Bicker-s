const express = require("express");
const { uploadMiddleware } = require("../Middlewares/multer");
const { createCompany,getAllCompanies ,  getCompanyById, updateCompany, deleteCompany } = require("../controllers/company.controller");
const isAuthenticated = require("../Middlewares/isAuthenticated");

const router = express.Router();

// router.route('/create').post(isAuthenticated, uploadMiddleware, createCompany);
router.post("/create", isAuthenticated, uploadMiddleware, createCompany);
router.get("/", isAuthenticated, getAllCompanies); // Added isAuthenticated for protected route
router.get("/:companyId", getCompanyById); // Removed isAuthenticated for public access
router.put("/:companyId", isAuthenticated, uploadMiddleware, updateCompany);
router.delete("/:companyId", isAuthenticated, deleteCompany);

module.exports = router;