import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import Listing from "../models/listing.model.js";


export const test = (req, res)=>{
    res.json({
        message: "hello from user controller",
    });
};

export const updateUser =async (req,res, next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, "you can only update your own account!"));
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        },  {new: true})

        const {password, ...rest} = updateUser._doc

        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
};

export const deleteUser = async (req, res) => {

    if(req.user.id !== req.params.id) return next(errorHandler(401, 'you can only delete your own account'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!')
    } catch (error) {
        next(error)
        
    }
};

export const getuserListing = async (req, res, next) => {

        if(req.user.id === req.params.id){
            try{
                const listing = await Listing.find({userRef: req.params.id});
                res.status(200).json(listing);
            }
            catch (error) {
                next(error);
            }

        }
        else{
            return next(errorHandler(401, 'you can only view your own listings'));
        }
    };

    
export const getUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.id);

        if(!User) return next(errorHandler(404, "user not found"));
      
        const {password: pass, ...rest} = user._doc;//separated the pass
      
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }

 

};