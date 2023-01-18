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

router.get('/checkEmail/:email_address', (req, res, next) => {
    return new Promise((resolve, reject) => {
        let email = "'" + req.params.email_address + "'";

        const checkEmail = `doctor_schema.fn_email_address_exists(${email})`;

        postgres.callFnWithResultsAdd(checkEmail)
            .then((data) => {

                res.status(201).json({
                    message: 'Email exists',
                    emailExists: data
                });
                resolve(data);
            }).catch((error) => {
                console.log(error);
                res.status(500).json({
                    message: error,
                    error: error,
                    status: false
                });
                reject(error);
            })
    });
})

router.post('/register', (req, res, next) => {
    return new Promise((resolve, reject) => {
        let email = "'" + req.body.email_address + "'";
        let name = "'" + req.body.first_name + "'";
        let surname = "'" + req.body.last_name + "'";
        let user_pass = "'" + req.body.password + "'";

        const functionName = `doctor_schema.fn_user_registration(${email}, ${name}, ${surname}, ${user_pass})`;

        postgres.callFnWithResultsAdd(functionName)
            .then((data) => {
                console.log(data);

                res.status(201).json({
                    message: 'Newly Added user',
                    addedUser: data
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


router.patch('/reRegister', (req, res, next) => {
    return new Promise((resolve, reject) => {
        let email = "'" + req.body.email_address + "'";
        let user_pass = "'" + req.body.password + "'";

        const oldEmail = `doctor_schema.fn_register_with_old_email(${email},${user_pass})`;

        postgres.callFnWithResultsAdd(oldEmail)
            .then((data) => {

                res.status(201).json({
                    message: 'Welcome back',
                    returningUser: data
                });
                resolve(data);
            }).catch((error) => {
                console.log(error);
                res.status(500).json({
                    message: error,
                    error: error,
                    status: false
                });
                reject(error);
            })
    });
})


router.post('/login', (req, res, next) => {
    return new Promise((resolve, reject) => {
        let user = "'" + req.body.email_address + "'";
        let user_pass = "'" + req.body.password + "'";

        const loginFn = `doctor_schema.fn_user_login(${user},${user_pass})`;

        postgres.callFnWithResultsAdd(loginFn)
            .then((data) => {
                let loggedIn = data.data[0].fn_user_login;

                if (loggedIn) {
                    var token = createToken(req.body.email_address);

                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
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

router.patch("/updateProfile", (req, res) => {
    const token = req.cookies.jwt;

    jwt.verify(token, 'secreteToken', async (err, decodedToken) => {

        const { email } = decodedToken;
        const decodedEmail = "'" + email + "'";

        const name = "'" + req.body.first_name + "'";
        const surname = "'" + req.body.last_name + "'";

        const sqlQuery = `doctor_schema.fn_update_user(${name},${surname},${decodedEmail})`;

        const findUser = await postgres.callFnWithResultsAdd(sqlQuery);

        res.status(200).json(findUser);

    }).catch(err => {
        res.status(500).json(err);
    })

});

router.patch("/update", (req, res) => {
    return new Promise((resolve, reject) => {
        let name = "'" + req.body.first_name + "'";
        let surname = "'" + req.body.last_name + "'";
        const email = "'" + req.body.email_address + "'";
        const sqlQuery = `doctor_schema.fn_update_user(${name}, ${surname}, ${email})`

        postgres.callFnWithResultsAdd(sqlQuery)
            .then((data) => {
                res.status(200).json({
                    message: 'User updated successfully!',
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

router.get("/getByEmail", (req, res) => {
    const token = req.cookies.jwt;

    jwt.verify(token, 'secreteToken', async (err, decodedToken) => {

        const { email } = decodedToken;

        const decodedEmail = "'" + email + "'";

        const sqlQuery = `doctor_schema.fn_get_user_by_email(${decodedEmail})`;

        const findUser = await postgres.callFnWithResultsAdd(sqlQuery);

        res.status(200).json(findUser);

    }).catch(err => {
        res.status(500).json(err);
    })

});

module.exports = router;