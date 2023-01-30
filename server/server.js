// Boilerplate
const express = require("express");
const app = express();
app.use(express.static("server/public"));
app.use(express.urlencoded({ extended: true }));

// Importing
const expressionParse = require("./Modules/parse");
const isValidExpression = require("./Modules/validate");
const calculate = require("./Modules/calculate");

// State
let calculationsArray = [];

// Endpoints
app.post("/expressions", (req, res) => {
	const { expressionStr } = req.body;
	if (!isValidExpression(expressionStr)) {
		res.sendStatus(400);
		return;
	}

	const expressionArray = expressionParse(expressionStr);
	const answer = calculate([...expressionArray]);

	const newExpressionObj = {
		expressionArray,
		answer,
	};

	calculationsArray.push(newExpressionObj);
	res.sendStatus(201);
});

app.get("/expressions", (req, res) => {
	res.status(200);
	res.send(calculationsArray);
});

app.delete("/delete-expressions", (req, res) => {
	res.status(204);
	calculationsArray.length = 0;
	res.send(calculationsArray);
});

// Listen
console.log("My name is", process.env.MY_NAME);
const PORT = 5000;
app.listen(PORT, () => {
	console.log("Port Listening", PORT);
});
