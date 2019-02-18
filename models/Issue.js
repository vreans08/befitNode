import mongoose from 'mongoose';

const Schema = mongoose.Schema;
let uiPermissions = new Schema({
    routePermissions: Object,
    functionalPermissions: Object
});
let tenantPropUiConfig = new Schema({ 
    tenantId: String,
    propertyId: String,
    appName: String,
    uiPermissions : Object
});

export default mongoose.model('tenantPropUiConfig', tenantPropUiConfig, 'tenantPropUiConfig');