import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let patient = new Schema({
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
    relationType: String,
    relationName: String,
    dob: String,
    age: Number,
    whatsapp: String,
    referedBy: String,
    address: String,
    reason: String,
    bloodgroup: String
});

export default mongoose.model('patient', patient, 'patient');
