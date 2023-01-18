const express = require('express');
const router = express.Router();
const Database = require('../database');

var postgres = new Database();

router.post('/bookAppointment', (req, res, next) => {

    return new Promise((resolve, reject) => {
        let names = "'" + req.body.client_full_names + "'";
        let phone = "'" + req.body.client_phone_no + "'";
        let description = "'" + req.body.description + "'";
        let date = "'" + req.body.appointment_date + "'";
        //let email = "'" + req.body.booked_by_email_foreign + "'";
        //let doctor_email = "'" + req.body.doctor_email + "'";

        const functionName = `doctor_schema.fn_book_appointment(${names}, ${phone}, ${description}, ${date})`;

        postgres.callFnWithResultsAdd(functionName)
            .then((data) => {
                console.log(data);

                res.status(201).json({
                    message: 'Appointment booked',
                    newAppointment: data
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
    });
});

router.get('/userAppointments', (req, res, next) => {

    return new Promise((resolve, reject) => {
        let email = "'" + req.body.client_email + "'";

        const functionName = `doctor_schema.fn_user_appointment_by_email(${email})`;

        postgres.callFnWithResultsAdd(functionName)
            .then((data) => {
                console.log(data);

                res.status(201).json({
                    message: 'Appointments',
                    appointmentsList: data
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
    });
});

router.get('/', (req, res, next) => {

    const functionName = "doctor_schema.fn_get_all_appointments";

    return new Promise((resolve, reject) => {

        postgres.callFnWithResults(functionName)
            .then((data) => {
                console.log(data);
                res.status(200).json({
                    message: 'Handling GET requests to /appointments',
                    appointments: data,
                    status: true
                });
                resolve(data);

            })
            .catch((error => {
                console.log(error);
                res.status(500).json({
                    message: 'bad Request',
                    error: error,
                    status: false
                });
                reject(error);
            }))

    })
});

router.get("/getAppointment", (req, res) => {
    return new Promise((resolve, reject) => {
        const id = "'"+req.body.apt_id+"'";
        const sqlQuery = `doctor_schema.fn_get_appointment_by_id(${id})`;

        postgres.callFnWithResultsAdd(sqlQuery)
        .then((data) => {
            res.status(200).json({
                message: 'Appointment retrieved successfully!',
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