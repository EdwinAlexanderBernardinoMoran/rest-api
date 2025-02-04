import { Router } from "express";

// Controller
import { getEmployees, getEmployeeById, storeEmployee, updateEmployee, destroyEmployee } from "../controllers/employees.controller.js";

const router = Router();

router.get('/employee', getEmployees);
router.get('/employee/:id', getEmployeeById);
router.post('/employee', storeEmployee);
router.patch('/employee/:id', updateEmployee);
router.delete('/employee/:id', destroyEmployee);

export default router;