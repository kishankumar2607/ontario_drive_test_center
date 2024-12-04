const express = require('express');
const router = express.Router();
const examinerController = require('../../controllers/examinerControllers/examinerControllers');
const authMiddleware = require('../../middlewares/authMiddleware');

// Route to render the examiner dashboard page
router.get('/examiner', authMiddleware.isAuthenticated, authMiddleware.isExaminer, examinerController.getExaminerPage);

// Update Driver Test Results
router.post("/examiner/update", authMiddleware.isAuthenticated, authMiddleware.isExaminer, examinerController.updateDriverTest);

module.exports = router;
