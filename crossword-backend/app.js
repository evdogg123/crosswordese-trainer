
const express = require('express')
const getProblemSet = require('./src/problemset').getProblemSet;
const { register, login } = require("./src/authentication")
var mongoose = require('mongoose');
const cors = require("cors")
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const { MONGO_URL } = require('./config');


const cookieParser = require('cookie-parser');


const corsOptions = {
    origin: 'http://localhost:8100'
};
mongoose.connect(
    MONGO_URL + "/crossword-trainer",
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, res) {
        try {
            console.log('Connected to Database');
        } catch (err) {
            throw err;
        }
    });
/**
 * This configures all of the following routes to use the cors middleware
 * with the options defined above.
 */
app.use(cors(corsOptions));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


app.get('/problemSet', async (req, res) => {

    console.log(req.query);
    let psetParams = req.query;
    if (typeof psetParams["puzzles"] == "string") {
        psetParams["puzzles"] = [psetParams["puzzles"]]
    }
    let psetRes = await getProblemSet(psetParams["numProblems"], psetParams["diversity"], psetParams["puzzles"])
    console.log(psetRes);
    console.log("Sending Results")
    res.send(psetRes);

})

app.post('/users/register', async (req, res) => {
    console.log("here!")
    console.log(req.body);
    let user = req.body;
    await register(user);
    res.send('Hello World!')

})

app.post('/users/authenticate', async (req, res) => {
    console.log("here!")
    console.log(req.body);
    let user = req.body;
    await res.send(login(user));
    console.log("Here22")
    res.send('Hello World!')

})







