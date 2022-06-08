const express = require('express');
const app1 = express();
const app2 = express();

// Handler method
const handler = num => (req,res)=>{
	const { method, url, headers, body } = req;
	res.send('Response from server ' + num);
}

// Only handle GET and POST requests
// Receive request and pass to handler method
app1.get('*', handler(1)).post('*', handler(1));
app2.get('*', handler(2)).post('*', handler(2));

// Start server on PORT 3000
app1.listen(3000, err =>{
	err ?
	console.log("Failed to listen on PORT 3000"):
	console.log("Application Server listening on PORT 3000");
});

// Start server on PORT 3001
app2.listen(3001, err =>{
	err ?
	console.log("Failed to listen on PORT 3001"):
	console.log("Application Server listening on PORT 3001");
});