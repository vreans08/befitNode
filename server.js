import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import login from './models/login';
import admin from './models/admin';
import doctor from './models/doctor';
import doctorList from './models/doctorList';
import patientList from './models/patientList';
import patient from './models/patient';
import questions from './models/questions';


const app = express();
const router = express.Router();


app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect('mongodb://localhost:27017/ngo');
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/login').post((req, res) => {
    console.log(req.body);
    login.find(
        {
            userName: req.body.userName,
            role: req.body.role,
            password: req.body.password
        }, { '_id': 0, 'password': 0 },
        (err, logindata) => {
            if (err)
                console.log(err);
            else {
                console.log(logindata);
                if (logindata.length >= 1) {
                    let data1 = logindata[0];
                    res.send({
                        userName: data1.userName,
                        firstName: data1.firstName,
                        lastName: data1.lastName,
                        permissions: data1.permissions,
                        success: true,
                        role: data1.role,
                        userId : data1.userId
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
router.route('/resetPassword').post((req, res) => {
    console.log(req.body);
    if (req.body.role == 'doctor') {
        doctor.findOneAndUpdate(
            {
                userName: req.body.userName,
                role: req.body.role,
                password: req.body.oldPassword
            }, { password: req.body.newPassword, resetRequired: false },{new: true},
            (err, logindata) => {
                if (err)
                    console.log(err);
                else {
                    console.log(logindata);
                    if (logindata) {
                        let data1 = logindata;
                        res.send({
                            userName: data1.userName,
                            firstName: data1.firstName,
                            lastName: data1.lastName,
                            resetRequired: data1.resetRequired,
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
    }
    else if (req.body.role == 'patient') {
        patient.findOneAndUpdate(
            {
                userName: req.body.userName,
                role: req.body.role,
                password: req.body.oldPassword
            }, { password: req.body.newPassword, resetRequired: false },{new: true},
            (err, logindata) => {
                if (err)
                    console.log(err);
                else {
                    console.log(logindata);
                    if (logindata) {
                        let data1 = logindata;
                        res.send({
                            userName: data1.userName,
                            resetRequired: data1.resetRequired,
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
    }
    else if (req.body.role == "admin") {
        admin.findOneAndUpdate(
            {
                userName: req.body.userName,
                role: req.body.role,
                password: req.body.oldPassword
            }, { password: req.body.newPassword, resetRequired: false },{new: true},
            (err, logindata) => {
                if (err)
                    console.log(err);
                else {
                    console.log(logindata);
                    if (logindata) {
                        let data1 = logindata;
                        res.send({
                            userName: data1.userName,
                            firstName: data1.firstName,
                            lastName: data1.lastName,
                            resetRequired: data1.resetRequired,
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
    }
});
router.route('/editUser').post((req, res) => {
    console.log(req.body.data1);
    if (req.body.data1.role == 'doctor') {
        doctor.findOneAndUpdate(
            {
                userName: req.body.data1.userName,
                role: req.body.data1.role,
                userId: req.body.data1.userId
            }, req.body.data1,{new: true},
            (err, logindata) => {
                if (err)
                    console.log(err);
                else {
                    console.log(logindata);
                    if (logindata) {
                        let data1 = logindata;
                        res.send({
                            userName: data1.userName,
                            firstName: data1.firstName,
                            lastName: data1.lastName,
                            resetRequired: data1.resetRequired,
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
    }
    else if (req.body.data1.role == 'patient') {
        patient.findOneAndUpdate(
            {
                userName: req.body.data1.userName,
                role: req.body.data1.role,
                userId: req.body.data1.userId
            }, req.body.data1,{new: true},
            (err, logindata) => {
                if (err)
                    console.log(err);
                else {
                    console.log(logindata);
                    if (logindata) {
                        let data1 = logindata;
                        res.send({
                            userName: data1.userName,
                            resetRequired: data1.resetRequired,
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
    }
    else if (req.body.data1 .role == "admin") {
        admin.findOneAndUpdate(
            {
                userName: req.body.data1.userName,
                role: req.body.data1.role,
                userId: req.body.data1.userId
            }, req.body.data1,{new: true},
            (err, logindata) => {
                if (err)
                    console.log(err);
                else {
                    console.log(logindata);
                    if (logindata) {
                        let data1 = logindata;
                        res.send({
                            userName: data1.userName,
                            firstName: data1.firstName,
                            lastName: data1.lastName,
                            resetRequired: data1.resetRequired,
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
    }
});

router.route('/deleteUser').post((req, res) => {
    console.log(req.body.data1);
    if (req.body.data1.role == 'doctor') {
        doctor.findOneAndDelete(
            {
                userName: req.body.data1.userName,
                role: req.body.data1.role,
                userId: req.body.data1.userId
            },
            (err, logindata) => {
                if (err)
                    console.log(err);
                else {
                    console.log(logindata);
                    if (logindata) {
                        let data1 = logindata;
                        res.send({                            
                            success: true,
                        });
                    }
                    else {
                        res.json({
                            success: false
                        })
                    }
                }
            });
    }
    else if (req.body.data1.role == 'patient') {
        patient.findOneAndDelete(
            {
                userName: req.body.data1.userName,
                role: req.body.data1.role,
                userId: req.body.data1.userId
            },
            (err, logindata) => {
                if (err)
                    console.log(err);
                else {
                    console.log(logindata);
                    if (logindata) {
                        let data1 = logindata;
                        res.send({
                            success: true,
                        });
                    }
                    else {
                        res.json({
                            success: false
                        })
                    }
                }
            });
    }
    else if (req.body.data1 .role == "admin") {
        admin.findOneAndDelete(
            {
                userName: req.body.data1.userName,
                role: req.body.data1.role,
                userId: req.body.data1.userId
            },
            (err, logindata) => {
                if (err)
                    console.log(err);
                else {
                    console.log(logindata);
                    if (logindata) {
                        let data1 = logindata;
                        res.send({
                            success: true,
                        });
                    }
                    else {
                        res.json({
                            success: false
                        })
                    }
                }
            });
    }
});

router.route('/doctorlogin').post((req, res) => {
    console.log(req.body);
    doctor.find(
        {
            userName: req.body.userName,
            role: req.body.role,
            password: req.body.password
        }, { '_id': 0, 'password': 0 },
        (err, logindata) => {
            if (err)
                console.log(err);
            else {
                console.log(logindata);
                if (logindata.length >= 1) {
                    let data1 = logindata[0];
                    res.send({
                        userName: data1.userName,
                        firstName: data1.firstName,
                        lastName: data1.lastName,
                        permissions: data1.permissions,
                        userId:data1.userId,
                        resetRequired: data1.resetRequired,
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
router.route('/adminlogin').post((req, res) => {
    console.log(req.body);
    admin.find(
        {
            userName: req.body.userName,
            role: req.body.role,
            password: req.body.password
        }, { '_id': 0, 'password': 0 },
        (err, logindata) => {
            if (err)
                console.log(err);
            else {
                console.log(logindata);
                if (logindata.length >= 1) {
                    let data1 = logindata[0];
                    res.send({
                        userName: data1.userName,
                        firstName: data1.firstName,
                        lastName: data1.lastName,
                        resetRequired: data1.resetRequired,
                        permissions: data1.permissions,
                        success: true,
                        userId:data1.userId,
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
router.route('/patientlogin').post((req, res) => {
    console.log(req.body);
    patient.find(
        {
            userName: req.body.userName,
            role: req.body.role,
            password: req.body.password
        }, { '_id': 0, 'password': 0 },
        (err, logindata) => {
            if (err)
                console.log(err);
            else {
                console.log(logindata);
                if (logindata.length >= 1) {
                    let data1 = logindata[0];
                    res.send({
                        userName: data1.userName,
                        firstName: data1.firstName,
                        resetRequired: data1.resetRequired,
                        lastName: data1.lastName,
                        userId:data1.userId,
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
                    var data = req.body.data1;
                    data.consultationHistory = ['NA'];
                    data.nextInLine = ['NA'];
                    doctorList.create(data, (err, response) => {
                        if (err)
                            console.log(err);
                        else {
                            res.send({
                                success: true
                            })
                        }
                    })

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
                    var data = req.body.data1;
                    data.lastVisitedDate = 'NA';
                    data.nextAppointmentDate = 'NA';
                    data.nextAppointmentDoctor = 'NA';
                    data.lastVisitedDoctor = 'NA';
                    data.visitedHistory = ['NA']
                    patientList.create(data, (err, response) => {
                        if (err)
                            console.log(err);
                        else {
                            res.send({
                                success: true
                            })
                        }
                    })
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

router.route('/patient').get((req, res) => {
    console.log(req.body);
    patient.find({}, { '_id': 0, 'password': 0 }, function (err, patient) {
        if (err)
            console.log(err);
        else {
            let dataSend = patient;
            // console.log("admin",admin[1]._doc);
            res.send(dataSend);
        }
    })
});

router.route('/patientList').get((req, res) => {
    console.log(req.body);
    patientList.find({}, function (err, patient) {
        if (err)
            console.log(err);
        else {
            let dataSend = patient;
            // console.log("admin",admin[1]._doc);
            res.send(dataSend);
        }
    })
});

router.route('/doctorList').get((req, res) => {
    console.log(req.body);
    doctorList.find({}, function (err, doctor) {
        if (err)
            console.log(err);
        else {
            let dataSend = doctor;
            // console.log("admin",admin[1]._doc);
            res.send(dataSend);
        }
    })
});

router.route('/doctorListUpdate').post((req, res) => {
    console.log(req.body);
    let query = { userId: req.body.userId }
    doctorList.findOneAndUpdate(query, req.body, { upsert: true, new: true }, function (err, doctor) {
        if (err)
            console.log(err);
        else {
            let dataSend = doctor;
            // console.log("admin",admin[1]._doc);
            res.send(dataSend);
        }
    })
});

router.route('/patientListUpdate').post((req, res) => {
    console.log(req.body);
    let query = { userId: req.body.userId }
    patientList.findOneAndUpdate(query, req.body, { upsert: true, new: true }, function (err, doctor) {
        if (err)
            console.log(err);
        else {
            let dataSend = doctor;
            // console.log("admin",admin[1]._doc);
            res.send(dataSend);
        }
    })
});

router.route('/getDoctorDetails').post((req, res) => {
    console.log(req.body);
    let query = { userId: req.body.doctorID }
    doctorList.find(query, function (err, doctor) {
        if (err)
            console.log(err);
        else {
            let dataSend = doctor;
            // console.log("admin",admin[1]._doc);
            res.send(dataSend);
        }
    })
});

router.route('/getPatientDetails').post((req, res) => {
    console.log(req.body);
    let query = { userId: req.body.patientID }
    patientList.find(query, function (err, patient) {
        if (err)
            console.log(err);
        else {
            let dataSend = patient;
            // console.log("admin",admin[1]._doc);
            res.send(dataSend);
        }
    })
});

router.route('/uploadQuestions').post((req, res) => {
    console.log(req.body);
    let query = { questionID: req.body.questionID };
    let options = { upsert: true, setDefaultsOnInsert: true };
    questions.findOneAndUpdate(query, req.body, options, function (err, question) {
        if (err)
            console.log(err);
        else {
            let dataSend = question;
            // console.log("admin",admin[1]._doc);
            res.send(dataSend);
        }
    })
});

router.route('/getQuestions').get((req, res) => {
    console.log(req.body);
    let query = { questionID: "1" };
    questions.find(query, function (err, question) {
        if (err)
            console.log(err);
        else {
            let dataSend = question;
            // console.log("admin",admin[1]._doc);
            res.send(dataSend);
        }
    })
});


app.use('/', router);

app.listen(5600, () => console.log('Express server running on port 5600'));