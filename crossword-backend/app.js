
const express = require('express')
const getProblemSet = require('./src/getProblemSet').getProblemSet;
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:8100',];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    return next();

});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


app.get('/problemSet', async (req, res) => {

    console.log(req.query);
    let psetParams = req.query;
    if (typeof psetParams["puzzles"] == "string") {
        psetParams["puzzles"] = [psetParams["puzzles"]]
    }
    let psetRes = await getProblemSet(psetParams["length"], psetParams["diversity"], psetParams["puzzles"])
    console.log(psetRes);
    console.log("Sending Results")
    res.send(psetRes);

})





