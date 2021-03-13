const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config()
//mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"))
mongoose.connect('mongodb://localhost/myTable').then(() => console.log("conected to mongodb...")).catch(err => console.log("could not connect to mongDB...", err));

app.use(bodyParser.json({ limit: '500mb' }))
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
}));
const PORT = 4000
app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)
app.listen(PORT, () => console.log(`server is up and running on port: ${PORT}`))