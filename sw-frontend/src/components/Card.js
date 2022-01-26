import React, { Component } from "react";

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {person: this.props.data}
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
		// let homePlanetData = data.homePlanet[0];

		let name = data.name;
		let height = `Height: ${data.height}cm`;
		let mass = `Mass: ${data.mass}kg`;
		let hairColor = `Hair Color: ${data.hairColor}`;
		let skinColor = `Skin Color: ${data.skinColor}`;
		let gender = `Gender: ${data.gender}`;
		let birthYear = `Birth Year: ${data.birthYear}`;
		// let homePlanet = `Home Planet: ${homePlanetData.name}`;
		// let homeTerrain = `Home Terrain: ${homePlanetData.terrain}`;
		// let homePopulation = `Home Population: ${homePlanetData.population}`;

		let attributes = [height, mass, hairColor, skinColor, gender, birthYear];

		return(
			<div className="card">
				<div className="card-body">
					<h5 className="card-title">{name}</h5>
				</div>
				<ul className="list-group list-group-flush">
					{attributes.map((e, index) => (<li key={e + "-" + index} className="list-group-item">{e}</li>))}
				</ul>
			</div>
		);
	}
}

export default Card;
