import React, { Component } from "react";
import Card from "./Card";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import ReactDOM from "react-dom";
import axios from "axios";
import { debounce } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

// Replacing caret with search icon in React Select.
library.add(faSearch);

const SearchIcon = () => {
  return <FontAwesomeIcon icon="search" />;
};

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <SearchIcon />
    </components.DropdownIndicator>
  );
};

// Loader functions
let loadData = function(inputValue, callback) {
	// Used for getting characters via name lookup.
	if(isNaN(inputValue) && inputValue.length > 2) {
		axios.get(`http:\/\/127.0.0.1:8000/person/name/${inputValue}/`).then(response => {
			let results = [];
			let data = response.data;
			for(let i = 0; i < data.length; i++) {
				const element = data[i];
				results.push({value: element.url, label: element.name});
			}
		
			// Filter results
			callback(results);
		});

	}

	// Used for getting a specific person via ID lookup.
	else if(!isNaN(inputValue)){
		axios.get(`http:\/\/127.0.0.1:8000/person/${inputValue}/`).then(response => {
			let results = [];
			let data = response.data;
			results.push({value: data.url, label: data.name});

			// Filter results
			callback(results);
		});
	}

	// Otherwise, return an empty list.
	else {
		callback([]);
	}
};

let selectPerson = function(person) {
	// Use the URL to get all relevant data to that person.
	// We'll only send over the required data.

	// Have to verify welcome message is deleted
    if(document.getElementById('welcomeScreen')){
        document.getElementById('welcomeScreen').remove();
    }

	let personId = person.value.match(/\d+/)[0];

	axios.get(`http:\/\/127.0.0.1:8000/person/full/${personId}/`).then(response => {
		let attributes = [];
		let data = response.data;
		console.log(data);

		attributes.push({
			name: data.name,
			height: data.height,
			mass: data.mass,
			hairColor: data.hair_color,
			skinColor: data.skin_color,
			gender: data.gender,
			birthYear: data.birth_year,
			homePlanet: data.homeworld,
			species: data.species,
			films: data.films,
			custom: data.custom
		});

		const element = <Card data={attributes} />;

		ReactDOM.render(element,
			document.getElementById('personDataContainer')
		);
	});

	return person;
};

// Prevent API from being called numerous times per keystroke.
const debouncedFetch = debounce((inputValue, callback) => {
	loadData(inputValue, callback);
}, 500);

// Main class

class Header extends Component {
	state = { inputValue: '' };
	handleInputChange = (newValue) => {
		const inputValue = newValue;
		this.setState({ inputValue });
		return inputValue;
	};

	render() {
		return (
			<header className="container-fluid">
			            <div className="row">
			                <div className="col-md-2 col-sm-3 mt-2 d-none d-sm-block">
			                    <h5 id="headerText" title="Star Wars DB">Star Wars DB</h5>
			                </div>
			                <div id="searchBarContainer" className="col-md-8 col-sm-9 col-xs-12">
			                    <div id="searchBar">
			                        <AsyncSelect
			                            placeholder="Search (example: Luke Skywalker)"
			                            cacheOptions
										components={{ DropdownIndicator }}
			                            loadOptions={debouncedFetch}
			                            onInputChange={this.handleInputChange}
			                            onChange={selectPerson}
			                        />
			                    </div>
			                </div>
			            </div>
			        </header>
		);
	}
}

export default Header;
