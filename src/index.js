// Requirements
const path = require('path');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Attributes
const port = process.env.PORT || 8000;
const SWAPI_URL = "https://swapi.dev/api/";

app.use(cors());

app.use(express.static(path.resolve(__dirname, '../sw-frontend/build')));

// Endpoints
app.get('/person/name/:personName', (req, res) => {
	const url = `${SWAPI_URL}people/?search=${req.params.personName}&format=json`;
	// Lookup names
	axios.get(url).then(function(response) {
		let data = response.data;
		data = data.results;
		let results = [];
		data.forEach(element => {
			const name = element.name;
			if(name.toLowerCase().includes(req.params.personName.toLowerCase())) {
				results.push({name: name, url: element.url});
			}
		});
		res.status(200).json(results);
	})
	.catch(function(error) {
		res.status(404).send("HTTP 404 Not Found: The requested resource could not be found.");
	});
});

app.get('/person/:personId', (req, res) => {
	// Getting a person based on a unique ID
	const url = `${SWAPI_URL}people/${req.params.personId}/?format=json`;
	axios.get(url).then(function(response) {
		res.status(200).json(response.data);
	})
	.catch(function(error) {
		res.status(404).send("HTTP 404 Not Found: The requested resource could not be found.");
	});
});

app.get('/person/full/:personId', (req, res) => {
	// Getting a person based on a unique ID
	const url = `${SWAPI_URL}people/${req.params.personId}/?format=json`;
	axios.get(url).then(function(response) {

		// Form URLs to make requests from.
		let requestsList = [];
		if(response.data.homeworld) {
			requestsList.push(`${response.data.homeworld}?format=json`);
		}

		if(response.data.species) {
			response.data.species.forEach(element => {
				requestsList.push(`${element}?format=json`);
			});
		}

		if(response.data.films) {
			response.data.films.forEach(element => {
				requestsList.push(`${element}?format=json`);
			});
		}

		let promiseArray = requestsList.map(e => axios.get(e));
		axios.all(promiseArray).then(function(results) { 
			let temp = results.map(r => r.data);
			let count = 0;
			let custom = {};
			if(response.data.homeworld) {
				custom.homeworld = temp[0];
				count++;
			}

			if(response.data.species) {
				let speciesList = [];
				for(let i = count; i < response.data.species.length + count; i++) {
					speciesList.push(temp[i]);
				}
				count += response.data.species.length;
				custom.species = speciesList;
			}

			if(response.data.films) {
				let filmsList = [];
				for(let i = count; i < response.data.films.length + count; i++) {
					filmsList.push(temp[i]);
				}
				count += response.data.films.length;
				custom.films = filmsList;
			}

			let finishedData = response.data;
			finishedData["custom"] = custom;

			res.status(200).json(finishedData);
		})
		.catch(error => console.log(error));
	})
	.catch(function(error) {
		res.status(404).send("HTTP 404 Not Found: The requested resource could not be found.");
	});
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../sw-frontend/build', 'index.html'));
});

app.listen(port, () => {
	console.log(`Star Wars API listening on port ${port}!`)
});
