const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getDashboard,
  getCategoryAnalytics,
  getMonthlyAnalytics,
  getReportData,
} = require("../controllers/dashboardController");

router.get("/", protect, getDashboard);
router.get("/category-analytics", protect, getCategoryAnalytics);

router.get("/monthly-analytics", protect, getMonthlyAnalytics);
router.get("/report", protect, getReportData);

module.exports = router;
