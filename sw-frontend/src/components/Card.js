import React, { Component } from "react";

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = { person: this.props.data }
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.data !== prevState.person) {
			return { person: nextProps.data }
		}

		else {
			return null;
		}
	}

	render() {
		let data = this.state.person;
		data = data[0];

		let name = data.name;
		let height = `Height: ${data.height}cm`;
		let mass = `Mass: ${data.mass}kg`;
		let hairColor = `Hair Color: ${data.hairColor}`;
		let skinColor = `Skin Color: ${data.skinColor}`;
		let gender = `Gender: ${data.gender}`;
		let birthYear = `Birth Year: ${data.birthYear}`;

		let attributes = [height, mass, hairColor, skinColor, gender, birthYear];

		// Custom attributes pulled from other endpoints
		let homeworld = [];
		let species = [];
		let films = [];
		if(data.custom) {
			let custom = data.custom;
			if(custom.homeworld) {
				let homePlanet = `Home Planet: ${custom.homeworld.name}`;
				let homeTerrain = `Terrain: ${custom.homeworld.terrain}`;
				let homePopulation = `Population: ${custom.homeworld.population}`;
				homeworld.push(homePlanet, homeTerrain, homePopulation);
			}

			if(custom.species) {
				custom.species.forEach(element => {
					species.push(element.name, `Average Lifespan: ${element.average_lifespan} years`, `Classification: ${element.classification}`, `Language: ${element.language}`);
					console.log(species);
				});
			}

			if(custom.films) {
				custom.films.forEach(element => {
					films.push(element.title, `Director: ${element.director}`, `Producer(s): ${element.producer}`, `Release Date: ${element.release_date}`);
					console.log(films);
				});
			}
		}

		return(
			<div className="card">
				<div className="card-body">
					<h1 className="card-title">{name}</h1>
				</div>
				<ul className="list-group list-group-flush attributes">
					{attributes.map((e, index) => (<li key={e + "-" + index} className="list-group-item">{e}</li>))}
				</ul>
				<div className="card-body">
					<h3 className="card-title">{homeworld.length > 0 ? "Home Planet Details" : ""}</h3>
				</div>
				<ul className="list-group list-group-flush homeworld">
					{homeworld.map((e, index) => (<li key={e + "-" + index} className="list-group-item">{e}</li>))}
				</ul>
				<div className="card-body">
					<h3 className="card-title">{species.length > 0 ? "Species" : ""}</h3>
				</div>
				<ul className="list-group list-group-flush species">
					{species.map((e, index) => (<li key={e + "-" + index} className="list-group-item">{e}</li>))}	
				</ul>
				<div className="card-body">
					<h3 className="card-title">{films.length > 0 ? "Featured In" : ""}</h3>
				</div>
				<ul className="list-group list-group-flush films">
					{films.map((e, index) => (<li key={e + "-" + index} className="list-group-item">{e}</li>))}	
				</ul>
			</div>
		);
	}
}

export default Card;
