const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    industry: { type: String, default: "Supply Chain & Logistics" },
    regions: [String],
    technologiesUsed: [String],
    logisticsStrength: String,
    digitalMaturity: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
