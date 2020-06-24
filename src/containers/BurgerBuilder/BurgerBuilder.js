import React, {Component} from 'react';
import axios from '../../axios-orders';

import Aux from "../../hoc/Aux/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';

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
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false
	}

	componentDidMount () {
		axios.get('https://react-burger-builder-81094.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data})
			});
	}

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients)
					.map(igKey => {
						return ingredients[igKey];
					})
					.reduce((sum, el) => {
						return sum + el;
					},0);
		this.setState({purchasable: sum >0});
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
		this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <=0) {
			return;
		}
		const newCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = newCount;
		const oldPrice = this.state.totalPrice;
		const priceToBeDeducted = INGREDIENT_PRICES[type];
		const newPrice = oldPrice - priceToBeDeducted;
		this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		//alert('You continue');
		
		const queryParams = [];
		for(let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});

	}
 	//lifecycle method to implement
	render() {

		const disableInfo = {
			...this.state.ingredients
		};
		for(let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <=0 //returns true or false
			//{salad:true, meat:false...}
		}

		let orderSummary = null;
		
		let burger = <Spinner />;

		if(this.state.ingredients) {
			burger = (
			<Aux>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls 
					ingredientAdded = {this.addIngredientHandler}
					ingredientRemoved = {this.removeIngredientHandler}
					disabled = {disableInfo}
					price = {this.state.totalPrice}
					purchasable = {this.state.purchasable}
					ordered={this.purchaseHandler} /> 
			</Aux>
			);
			orderSummary = <OrderSummary 
							ingredients={this.state.ingredients}
							price={this.state.totalPrice}
							purchaseCancelled={this.purchaseCancelHandler}
							purchaseContinued={this.purchaseContinueHandler} />;		
		}

		if(this.state.loading) {
			orderSummary = <Spinner />;
		}
		
		return(
		//returns some jsx code
		//wrap it in hoc
		<Aux>
			<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
				{orderSummary}
			</Modal>
			{burger}
		</Aux>

		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);