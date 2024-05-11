const express = require('express')
const admin = require('firebase-admin');
const axios = require('axios');
require('dotenv').config()

const app = express()
const PORT = 3000

var serviceAccount = require("./serviceAccount.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

const db = admin.database()
const ref = db.ref('/profiles')

app.get('/profile/:muid', async (req, res) => {
    try {
    const { muid } = req.params;
    const apiUrl = `https://mulearn.org/api/v1/dashboard/profile/user-profile/${muid}`;
    
    // Making a GET request to the specified API
    const response = await axios.get(apiUrl);
    const responseData = [response.data][0].response;
    const dbData = {userName:responseData.full_name,muid:muid, profile_pic:responseData.profile_pic, roles:responseData.roles, rating:[]}
    ref.child(muid).set(dbData);

    res.send([response.data][0].response);
    }
    catch(err) {
        console.log(err)
    }
})

app.get('/profiles', async (req, res) => {
    console.log(process.env.DATABASE_URL)
    const data = await ref.get()
    res.send(data)
})


app.listen(PORT, ()=>console.log('listening on port',PORT));