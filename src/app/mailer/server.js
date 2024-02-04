const express = require('express');
const appRoute = require('./routes/route')
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(express.json());
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

/**routes */
app.use('/api', appRoute)

/*Start*/
//C:\Develop\myteamfeed\my-team-moodfeed\src\app\mailer> npm start

app.listen(PORT, () => {
     console.log(`Server is running on PORT ${PORT}`)
})


