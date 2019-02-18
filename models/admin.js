import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let admin = new Schema({
    role: String,
    firstName : String,
    phone: String,
    lastName: String,  
    userName : String,
    password: String,  
    userId : String,
    email: String,
    resetRequired:Boolean,
    permissions : Object,
});

export default mongoose.model('admin', admin, 'admin');
