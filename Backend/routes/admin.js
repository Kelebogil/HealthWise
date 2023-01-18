const express = require('express');
const router = express.Router();
const Database = require('../database');
const jwt = require('jsonwebtoken');

var postgres = new Database();

const maxAge = 1 * 24 * 60 * 60;

const createToken = (email) => {
    return jwt.sign({ email }, 'secreteToken', {
        'expiresIn': maxAge
    })
 }


router.post('/adminLogin', (req, res, next) => {
    return new Promise((resolve, reject) => {
        let user = "'"+req.body.doctor_reg_no+"'";
        let user_pass = "'"+req.body.password+"'";

        const loginFn = `doctor_schema.fn_admin_login(${user},${user_pass})`;

        postgres.callFnWithResultsAdd(loginFn)
        .then((data) => {
            let loggedIn = data.data[0].fn_admin_login;

            if(loggedIn){
                var token = createToken(req.body.doctor_reg_no);
            
                res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 });
            }
                res.status(201).json({
                    message: 'Login responded',
                    addedUser: data,
                    jwt: token
                });

            resolve(data);

        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                message: error,
                error: error,
                status: false
            });
            reject(error);
        })
    })
});

router.get("/getUser", (req, res) => {
    return new Promise((resolve, reject) => {
        const email = "'"+req.body.email_address+"'";
        const sqlQuery = `doctor_schema.fn_get_user_by_email(${email})`;

        postgres.callFnWithResultsAdd(sqlQuery)
        .then((data) => {
            res.status(200).json({
                message: 'User retrieved successfully!',
                user: data
            });

            resolve(data);

        }).catch((error) => {
            res.status(500).json({
                message: 'Error',
                error: error,
                status: false
            });

            reject(error);

        });
    });
});

router.get("/getAdmin", (req, res) => {
    return new Promise((resolve, reject) => {

        postgres.getAdmin()
        .then((data) => {
            res.status(200).json({
                message: 'Admin retrieved successfully!',
                user: data
            });

            resolve(data);

        }).catch((error) => {
            res.status(500).json({
                message: 'Error',
                error: error,
                status: false
            });

            reject(error);

        });
    });
});

router.get("/allUsers", (req, res) => {
    return new Promise((resolve, reject) => {
    const adminUsers = "doctor_schema.fn_get_all_users";

    postgres.callFnWithResults(adminUsers)
    .then((data) => {

        res.status(201).json({
            message: 'users found',
            usersList: data
        });

        resolve(data);
    })
    .catch((error) => {
        res.status(500).json({
            message: error,
            error: error,
            status: false
        });
        reject(error);
    });
});
});

router.get("/availableSlots", (req, res) => {
    return new Promise((resolve, reject) => {
    const adminUsers = "doctor_schema.fn_slots";

    postgres.callFnWithResults(adminUsers)
    .then((data) => {

        res.status(201).json({
            message: 'slots found',
            usersList: data
        });

        resolve(data);
    })
    .catch((error) => {
        res.status(500).json({
            message: error,
            error: error,
            status: false
        });
        reject(error);
    });
});
});

router.get("/getSlot", (req, res) => {
    return new Promise((resolve, reject) => {
        const id = "'"+req.body.id+"'";
        const sqlQuery = `doctor_schema.fn_get_slot_by_id(${id})`;

        postgres.callFnWithResultsAdd(sqlQuery)
        .then((data) => {
            res.status(200).json({
                message: 'Slot retrieved successfully!',
                user: data
            });

            resolve(data);

        }).catch((error) => {
            res.status(500).json({
                message: 'Error',
                error: error,
                status: false
            });

            reject(error);

        });
    });
});

router.patch("/updateUser", (req, res) => {
    return new Promise((resolve, reject) => {
        const name = "'"+req.body.first_name+"'";
        const surname = "'"+req.body.last_name+"'";
        const email = "'"+req.body.email_address+"'";

        const sqlQuery = `doctor_schema.fn_update_user(${name},${surname},${email})`;

        postgres.callFnWithResultsAdd(sqlQuery)
        .then((data) => {
            res.status(200).json({
                message: 'User successfully updated',
                user: data
            });

            resolve(data);

        }).catch((error) => {
            res.status(500).json({
                message: 'Error',
                error: error,
                status: false
            });

            reject(error);

        });
    });
});

router.patch("/deactivateAccount", (req, res) => {
    return new Promise((resolve, reject) => {
        const email = "'"+req.body.email_address+"'";
        const sqlQuery = `doctor_schema.fn_deactivate_user(${email})`

        postgres.callFnWithResultsAdd(sqlQuery)
        .then((data) => {
            res.status(200).json({
                message: 'Deactivate Account API responded successfully!',
                user: data
            });

            resolve(data);

        }).catch((error) => {
            res.status(500).json({
                message: 'Error',
                error: error,
                status: false
            });

            reject(error);

        });
    });
});

router.patch("/cancel", (req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.body.id;
        const msg = "'"+req.body.message+"'";
        const sqlQuery = `doctor_schema.fn_cancel_account(${id}, ${msg})`

        postgres.callFnWithResultsAdd(sqlQuery)
        .then((data) => {
            res.status(200).json({
                message: 'API responded successfully!',
                user: data
            });

            resolve(data);

        }).catch((error) => {
            res.status(500).json({
                message: 'Error',
                error: error,
                status: false
            });

            reject(error);

        });
    });
});
    

module.exports = router;