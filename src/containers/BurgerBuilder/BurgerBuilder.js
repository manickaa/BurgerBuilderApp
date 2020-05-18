import React, {Component} from 'react';


import Aux from "../../hoc/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
	salad: 1,
	cheese: 0.5,
	bacon: 2,
	meat: 2
};

class BurgerBuilder extends Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {..}
	// }
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = newCount;
		const oldPrice = this.state.totalPrice;
		const priceToBeAdded = INGREDIENT_PRICES[type];
		const newPrice = oldPrice + priceToBeAdded;
		this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const newCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = newCount;
		const oldPrice = this.state.totalPrice;
		const priceToBeAdded = INGREDIENT_PRICES[type];
		const newPrice = oldPrice - priceToBeAdded;
		this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
	}
	//lifecycle method to implement
	render() {
		return(
		//returns some jsx code
		//wrap it in hoc
		<Aux>
			<Burger ingredients={this.state.ingredients}/>
			<BuildControls 
				ingredientAdded = {this.addIngredientHandler}
				ingredientRemoved = {this.removeIngredientHandler}/>
		</Aux>

		);
	}
}

export default BurgerBuilder;