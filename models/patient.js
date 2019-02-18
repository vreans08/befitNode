import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let patient = new Schema({
    role: String,
    firstName : String,
    lastName: String,  
    userName : String,
    password: String,  
    userId : String,
    phone: String,
    email: String,
    resetRequired:Boolean,
    permissions : Object,
});

export default mongoose.model('patient', patient, 'patient');
