const express = require('express');
const router = express.Router();
const math = require('mathjs');
const calcArray = [];

//POST route
router.post('/', (req, res) => {
    let expression = req.body.expression;
    // use mathjs to evaluate the expression and push the expression and sum to calcArray
    calcArray.push(`${expression} = ${math.evaluate(expression)}`);
    if(calcArray.length > 10) {
        calcArray.unshift()
    }
}) // end POST

let id = 0;
//GET route to set up Server Sent Event
router.get('/event-stream', (req, res) => {
    console.log('in GET route for SSE');
    
    // SSE Setup
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    //res.write(`data: ${JSON.stringify(calcArray)}`);
    //let clientId = id++;

    res.write(`data: message${JSON.stringify(calcArray)}\n\n`);
    res.flush();
    const intervalId = setInterval(() => {
        console.log('in setInterval stuff', res);
        
        // set data to stringified calcArray
        //res.write(`data: message${JSON.stringify(calcArray)}\n\n`);
        res.write('event: ping\n');  // added these
        res.write(`data: SHANE`);
        res.write("\n\n");
    }, 1000);

    req.on('close', () => {
        clearInterval(intervalId);
    });
}) // end GET








module.exports = router