import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const inserteduser = await user.save();
        res.status(200).json(inserteduser);
    } catch (error) {
        console.log(error.message);
        res.status(201).json({message: error.message});
    }
}

export const loginUser = async (req, res) => {
    // const user = new User(req.body);
    try {
        const datauser = await User.findOne({ username: req.body.username, password: req.body.password });

        if(!datauser){
            return res.status(201).json({ metadata: { message: "Username / Password salah" } });
        }

        return res.status(200).json({ metadata: { message: "OK", code: 200, admin:datauser.admin } })
    } catch (error) {
        console.log(error.message);
        res.status(201).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}