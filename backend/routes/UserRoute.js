import express from "express";
import { 
    getUsers, 
    getUserById,
    saveUser,
    updateUser,
    deleteUser,
    loginUser,
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.post('/users/login', loginUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;