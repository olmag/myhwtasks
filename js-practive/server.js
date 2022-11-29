var express = require("express"),
	nodeStatic = require("node-static"),
	cors = require('cors'),
	file = new nodeStatic.Server("."),
	bodyParser = require("body-parser"),
	fs = require("fs"),
	app = express(),
	userHandlerInit = require("./backend/handlers/user-handler"),
	USERS_PATH = __dirname + "/resources/data.json",
	LISTEN_PORT = 8081;

app.use(bodyParser.json());
app.use(cors());

var users = [];

fs.readFile(USERS_PATH, "utf8", function(err, usersJsonStr) {
	users = JSON.parse(usersJsonStr);
	var userHandler = userHandlerInit(users);
	app.post("/user", userHandler.add);

	app.put("/user", userHandler.update);

	app.get("/user", userHandler.get);

	app.delete("/user", userHandler.del);

	app.get("/countries", function(req, res) {
		var c = [];
		for (var i = 0; i < users.length; i++) {
			if (c.indexOf(users[i].country) === -1) {
				c.push(users[i].country);
			}
		}

		res.send(c);
	});

	console.log("Users API is ready...");

});


app.get("/", function(req, res) {
	file.serve(req, res);
});

app.get("/user-form.html", function(req, res) {
	file.serve(req, res);
});

app.get("/sample", function(req, res) {
	res.send({
		data: JSON.stringify(req.query)
	});
});

app.get("/css*", function(req, res) {
	file.serve(req, res);
});
app.get("/js*", function(req, res) {
	file.serve(req, res);
});

app.listen(LISTEN_PORT);
console.log("Listen port " + LISTEN_PORT);