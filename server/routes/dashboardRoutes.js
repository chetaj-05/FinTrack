const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    getDashboard,
    getCategoryAnalytics,
    getMonthlyAnalytics,
    

} = require("../controllers/dashboardController");

router.get("/", protect, getDashboard);
router.get("/category",protect,getCategoryAnalytics);
router.get("/monthly", protect, getMonthlyAnalytics);


module.exports = router;