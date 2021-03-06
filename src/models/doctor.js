import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let doctor = new Schema({
    role: String,
    firstName : String,
    lastName: String,  
    userName : String,
    password: String,  
    phone: String,
    userId : String,
    email: String,
    resetRequired:Boolean,
    permissions : Object,
});

export default mongoose.model('doctor', doctor, 'doctor');
