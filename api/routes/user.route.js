import express from 'express';
import { deleteUser, getUser, getuserListing, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router =  express.Router();

router.get('/text', test);
router.post('/update/:id',verifyToken, updateUser)
router.delete('/delete/:id',verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getuserListing);
router.get('/:id', verifyToken,getUser);


  export default router;