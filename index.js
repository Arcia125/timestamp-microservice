'use strict';
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const getTime = (inputTime) => {
	let inputTimeNum = Number(inputTime);
	return Number.isNaN(inputTimeNum) ? {
		unix: new Date(inputTime).getTime() / 1000 - (new Date().getTimezoneOffset() * 60),
		natural: new Date(inputTime).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
	} : {
		unix: new Date(inputTimeNum).getTime(),
		natural: new Date(inputTimeNum * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
	}
}

app.get('/:time', (req, res) => {
	res.send(getTime(req.params.time));
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});