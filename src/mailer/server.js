const express = require('express');
const appRoute = require('./routes/route')
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(express.json());
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     next();
})

/**routes */
app.use('/api', appRoute)

/*Start*/
//C:\Develop\myteamfeed\my-team-moodfeed\src\app\mailer> npm start

app.listen(PORT, () => {
     console.log(`Server is running on PORT ${PORT}`)
})


