
const helpers = require('./utilities/helpers');
const constants = require('./utilities/constants');
const { MONGO_URL } = require('../config')
// Connection URI

// Create a new MongoClient
const { MongoClient } = require('mongodb');

async function getProblems(days) {
    console.log(MONGO_URL)
    const uri = MONGO_URL;
    const client = new MongoClient(uri);

    const query = { "Weekday": { $in: days } };
    console.log(query)
    try {

        await client.connect();
        crossword_db = client.db("crossword-trainer")
        const crossword = crossword_db.collection("problems");
        const allProblems = await crossword.find(query).toArray();


        return allProblems

    }
    catch (e) {
        console.error(e);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}




function getMaxWordOccurence(wordDiversity, problemCount) {
    if (wordDiversity == "high") {
        maxWordOccurence = 1
    }
    else if (wordDiversity == "medium") {
        maxWordOccurence = problemCount * .05
    }
    else if (wordDiversity == "low") {
        maxWordOccurence = problemCount * .1
    }
}
function createProblemSet(problems, problemCount, maxWordOccurence) {
    let wordsPickedCount = {};
    let problemSet = [];

    for (let i = 0; i < problems.length; i++) {
        if (wordsPickedCount.length == problemCount) {
            return problemSet;
        }
        let newProblem = problems[i]
        let newWord = newProblem["Word"]
        if (!wordsPickedCount[newWord]) {
            problemSet.push(newProblem);
            wordsPickedCount[newWord] = 1;
        }
        else if (wordsPickedCount[newWord] < maxWordOccurence) {
            problemSet.push(newProblem);
            wordsPickedCount[newWord] += 1;
        }


    }
    return problemSet

}

async function getProblemSet(problemCount, wordDiversity, days) {
    let problems = await getProblems(days);
    // let problemCount = constants.lengthToCount[length]
    problems = helpers.shuffle(problems)
    problems = problems.slice(0, problemCount)
    let maxWordOccurence = getMaxWordOccurence(wordDiversity, problemCount)
    let problemSet = createProblemSet(problems, problemCount, maxWordOccurence)
    return problemSet


}
module.exports = { getProblemSet };