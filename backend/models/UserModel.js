import mongoose from "mongoose";

const User = mongoose.Schema({
    username : {
        type: String,
        required: [true, `username tidak boleh kosong`],
        index: { unique: true }
    },
    password : {
        type: String,
        required: [true, `password tidak boleh kosong`],
    },
    nama_lengkap: {
        type: String,
        default:null,
    },
    admin: {
        type: String,
        default:'user',
    },           
    email: {
        type: String,
        default:null,
        required: [true, `email tidak boleh kosong`],
        index: { unique: true }
    }

});

export default mongoose.model('Users', User);