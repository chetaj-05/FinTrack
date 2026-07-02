const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addIncome,

  getIncome,

  deleteIncome,
  updateIncome,
} = require("../controllers/incomeController");

router.post("/", protect, addIncome);

router.get("/", protect, getIncome);

router.route("/:id").put(protect, updateIncome);
router.route("/:id").delete(protect, deleteIncome);

module.exports = router;
