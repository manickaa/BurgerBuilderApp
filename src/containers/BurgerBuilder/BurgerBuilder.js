import React, {Component} from 'react';


import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
class BurgerBuilder extends Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {..}
	// }
	state = {
		ingredients: {
			salad: 1,
			bacon: 1,
			cheese: 2,
			meat: 2
		}
	}
	//lifecycle method to implement
	render() {
		return(
		//returns some jsx code
		//wrap it in hoc
		<Aux>
			<Burger ingredients={this.state.ingredients}/>
			<div>Build controls</div>
		</Aux>

		);
	}
}

export default BurgerBuilder;