const express = require('express');
const router = express.Router();
const math = require('mathjs');
const calcArray = [];

router.post('/', (req, res) => {
    console.log('in calculation route', req.body);
    let expression = req.body.expression;
    calcArray.push(`${expression} = ${math.evaluate(expression)}`);
    console.log(calcArray);
    
}) 

router.get('/event-stream', (req, res) => {
    // SSE Setup
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    res.write('\n');
})








module.exports = router