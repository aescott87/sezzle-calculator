const express = require('express');
const router = express.Router();
const math = require('mathjs');
const calcArray = [];
let clients = [];


//GET route to set up Server Sent Event
router.get('/event-stream', (req, res) => {
    // New client connected to event stream
    // Maintain connection to client event stream
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    // Sends solved expressions to the client
    res.write(`data: ${JSON.stringify(calcArray)}\n\n`);
    // Pushes the res to the clients array
    clients.push(res);
    
}) // end GET

// POST route
router.post('/', (req, res) => {
    let expression = req.body.expression;
    // use mathjs to evaluate the expression and push the expression and sum to calcArray
    let solvedExpression = `${expression} = ${math.evaluate(expression)}`
    calcArray.push(solvedExpression);
    // Send new solved expression to each client
    for(let client of clients) {
        client.write(`data: ${JSON.stringify([solvedExpression])}\n\n`)
    }
    // Make sure calcArray contains max of 10 solved expressions
    if(calcArray.length > 10) {
        calcArray.shift()
    }
    res.sendStatus(200);
}) // end POST










module.exports = router