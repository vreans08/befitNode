import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import tenantPropUiConfig from './models/Issue';
import login from './models/login';
import admin from './models/admin';
import doctor from './models/doctor';
import patient from './models/patient';
import AzureAccountDetails from './models/accountDetails'
const app = express();
const router = express.Router();
const translate = require('@k3rn31p4nic/google-translate-api');
app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
mongoose.connect('mongodb://localhost:27017/admin');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/issues').get((req, res) => {
    tenantPropUiConfig.find((err, issues) => {
        if (err)
            console.log(err);
        else {
            res.json(issues);
        }

    });
});
router.route('/login').post((req, res) => {
    console.log(req.body);
    login.find(
        {
            userName: req.body.userName,
            role: req.body.role,
            password: req.body.password
        },
        (err, logindata) => {
            if (err)
                console.log(err);
            else {
                if (logindata.length >= 1) {
                    let data1 = logindata[0];
                    res.send({
                        userName: data1.userName,
                        firstName: data1.firstName,
                        lastName: data1.lastName,
                        permissions: data1.permissions,
                        success: true,
                        role: data1.role
                    });
                }
                else {
                    res.json({
                        success: false
                    })
                }


            }

        });
});


router.route('/newUser').post((req, res) => {
    console.log(req.body);
    //  var userData = new user(req.body);
    if (req.body.data1.role == "admin") {
        admin.create(
            req.body.data1,
            (err, newUser) => {
                if (err)
                    console.log(err);
                else {
                    login.create(req.body.data1, (err, user) => {
                        if (err)
                            console.log(err);
                        else
                            res.send({
                                success: true,
                            });
                    })


                }

            });
    }
    else if (req.body.data1.role == "doctor") {
        doctor.create(
            req.body.data1,
            (err, newUser) => {
                if (err)
                    console.log(err);
                else {

                    res.send({
                        success: true,
                    });

                }

            });
    }
    else if (req.body.data1.role == "patient") {
        patient.create(
            req.body.data1,
            (err, newUser) => {
                if (err)
                    console.log(err);
                else {
                    res.send({
                        success: true,
                    });
                }

            });
    }

});

router.route('/doctor').get((req, res) => {
    console.log(req.body);
    doctor.find({}, { '_id': 0, 'password': 0 }, function (err, doctor) {
        if (err)
            console.log(err);
        else {
            let dataSend = doctor;
            // console.log("admin",admin[1]._doc);
            res.send(dataSend);
        }
    })
});

router.route('/admin').get((req, res) => {
    console.log(req.body);
    admin.find({}, { '_id': 0, 'password': 0 }, function (err, admin) {
        if (err)
            console.log(err);
        else {
            let dataSend = admin;
            // console.log("admin",admin[1]._doc);
            res.send(dataSend);
        }
    })
});

router.route('/getMessages/:id').get((req, res) => {
    UIMessages.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    });
});

router.route('/azureAccountDetails').get((req, res) => {
    AzureAccountDetails.find((err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    });
});

router.route('/UIMessages/update/:id').post((req, res) => {
    UIMessages.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
        else {
            issue.uiMessages = req.body;
            issue.save().then(issue => {
                res.json('Messages Updated Successfully');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});



router.route('/translate').post((req, resp) => {
    let translateData = req.body.message;
    let keys = req.body.keys;
    let fromLang = req.body.from;
    let toLang = req.body.to;
    translateDataFun(translateData, keys, fromLang, toLang).then(res => {
        resp.json(res);
    })
});



router.route('/issues/:id').get((req, res) => {
    tenantPropUiConfig.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    });
});

router.route('/issues/update/:id').post((req, res) => {
    tenantPropUiConfig.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load document'));
        else {
            issue.uiPermissions = req.body;
            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({ _id: req.params.id }, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})

async function translateDataFun(translateData, keys, fromLang, toLang) {
    let primaryPromise = translateData.map(async (trans, index) => {
        const response = await secondaryFunction(trans, index, keys, fromLang, toLang);
        return response;
    });
    const varData = await Promise.all(primaryPromise);
    return varData;
}

async function secondaryFunction(trans, index, keys, fromLang, toLang) {
    let secondaryPromise = trans[keys[index]].map(async (transData) => {
        const response = await translate(transData.defaultMessage, { from: fromLang, to: toLang }).then(res => {
            return res.text
        }).catch(err => {
            console.error(err);
        });
        return response;
    })
    const varData = await Promise.all(secondaryPromise);
    return varData;
}

app.use('/', router);

app.listen(5600, () => console.log('Express server running on port 5600'));