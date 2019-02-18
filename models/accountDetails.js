import mongoose from 'mongoose';

const Schema = mongoose.Schema;


let accountDetailsObjest = new Schema({
    accountName : String,
    accountkey : String
});

export default mongoose.model('AzureAccountDetails', accountDetailsObjest, 'AzureAccountDetails');