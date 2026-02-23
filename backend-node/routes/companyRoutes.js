const express = require("express");
const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} = require("../controllers/companyController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// CRUD routes
router.post("/", authMiddleware, createCompany);
router.get("/", authMiddleware, getCompanies);
router.get("/:id", authMiddleware, getCompanyById);
router.put("/:id", authMiddleware, updateCompany);
router.delete("/:id", authMiddleware, deleteCompany);

module.exports = router;
