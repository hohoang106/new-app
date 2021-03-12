const { request } = require('express');
const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../models/signupModels')
const submitTemplateCopy = require('../models/submitModels')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const Joi = require('@hapi/joi')

dotenv.config()

const schema = Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    faculty: Joi.string(),
    role: Joi.string(),
    isChecked: Joi.boolean()
})

router.post('/signup', async (request, response) => {

    const { error } = schema.validate(request.body)
    if (error) return response.status(400).send(error.details[0].message);

    const emailExist = await signUpTemplateCopy.findOne({ email: request.body.email })
    if (emailExist) return response.status(400).send('Email already exists');


    const signedUpUser = new signUpTemplateCopy({
        fullName: request.body.fullName,
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
        faculty: request.body.faculty,
        role: request.body.role,
        isChecked: request.body.isChecked
    })
    signedUpUser.save().then(data => { response.json(data) }).catch(err => { response.json(err) })
});

router.post('/submit', (request, response) => {
    const picture = new submitTemplateCopy({
        title: request.body.title,
        description: request.body.description,
        imageFiles: request.body.imageFiles,
        docsUrl: request.body.docsUrl,
        docsName: request.body.docsName
    })
    picture.save().then(data => {
        response.json(data);
        signUpTemplateCopy.updateOne(
            { email: request.body.email },
            { $push: { submitId: data._id } },
            function (err, result) {
                if (err) {
                    response.send(err)
                }
            }
        )
    }).catch(err => { response.json(err) })
})



router.get('/getAccountToCheck', (request, response) => {
    signUpTemplateCopy.find({ isChecked: false })
        .then(result => {
            response.status(200).json({
                account: result
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({ error: err })
        });
});
//79
router.post('/getAccountByFaculty', (request, response) => {
    signUpTemplateCopy.find({ faculty: request.body.faculty })
        .then(result => {
            response.status(200).json({
                account: result
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({ error: err })
        });
});

router.get('/getAccountChecked', (request, response) => {
    signUpTemplateCopy.find({ isChecked: true })
        .then(result => {
            response.status(200).json({
                account: result
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({ error: err })
        });
});

router.get('/getAccountById/:id', (request, response) => {
    const id = request.params.id;
    signUpTemplateCopy.find({ _id: id })
        .then(result => {
            response.status(200).json({
                account: result
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({ error: err })
        });
});

router.get('/getSubmitById/:id', (request, response) => {
    const id = request.params.id;
    submitTemplateCopy.find({ _id: id })
        .then(result => {
            response.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({ error: err })
        })
})

router.patch('/checked/:id', async (request, response) => {
    try {
        const id = request.params.id;
        //const update = request.body;
        const update = { isChecked: true }
        const options = { new: true }
        const result = await signUpTemplateCopy.findByIdAndUpdate(id, update, options);
        response.send(result);
        //console.log("Update value:", update)
    } catch (error) {
        console.log(error.message);
    }
})
//77
router.patch('/submitchecked/:id', async (request, response) => {
    try {
        const id = request.params.id;
        //const update = request.body;
        const update = { isChecked: true }
        const options = { new: true }
        const result = await submitTemplateCopy.findByIdAndUpdate(id, update, options);
        response.send(result);
        //console.log("Update value:", update)
    } catch (error) {
        console.log(error.message);
    }
})

router.patch('/updateAccount/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const updates = request.body;
        const options = { new: true }

        const result = await signUpTemplateCopy.findByIdAndUpdate(id, updates, options);
        response.send(result);
    } catch (error) {
        console.log(error.message)
    }
});

router.post('/login', async (request, response) => {
    try {
        const user = await signUpTemplateCopy.findOne({ email: request.body.email, isChecked: true });
        if (!user) return response.status(400).send('Email is not exited');
        if (user.password !== request.body.password) return response.status(400).send('Password is incorrect');

        //create and assign token
        const token = jwt.sign({ user: user }, process.env.TOKEN_SECRECT);
        //console.log(token);
        response.header('auth-token', token).send(token)
    } catch (error) {
        console.log(error.message)
    }
})

router.delete('/deleteAccount/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const result = await signUpTemplateCopy.findByIdAndDelete(id);
        response.send(result);
    } catch (error) {
        console.log(error.message);
    }
});



module.exports = router