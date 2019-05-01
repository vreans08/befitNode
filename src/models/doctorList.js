import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let doctorList = new Schema({
    firstName : String,
    lastName: String,  
    userName : String, 
    phone: String,
    userId : String,
    email: String,
    consultationHistory: Object,
    nextInLine: Object

});

export default mongoose.model('doctorList', doctorList, 'doctorList');
