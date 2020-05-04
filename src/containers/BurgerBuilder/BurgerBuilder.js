import React, {Component} from 'react';


import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
class BurgerBuilder extends Component {

	//lifecycle method to implement
	render() {
		return(
		//returns some jsx code
		//wrap it in hoc
		<Aux>
			<Burger />
			<div>Build controls</div>
		</Aux>

		);
	}
}

export default BurgerBuilder;