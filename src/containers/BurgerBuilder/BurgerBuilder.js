import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import Aux from "../../hoc/Aux/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler.js';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {..}
	// }
	state = {
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount () {
	 	console.log(this.props);
	// 	axios.get('https://react-burger-builder-81094.firebaseio.com/ingredients.json')
	// 		.then(response => {
	// 			this.setState({ingredients: response.data})
	// 		});
	}

	updatePurchaseState (ingredients) {
		const sum = Object.keys(ingredients)
					.map(igKey => {
						return ingredients[igKey];
					})
					.reduce((sum, el) => {
						return sum + el;
					},0);
		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		//alert('You continue');
		this.props.history.push('/checkout');

	}
 	//lifecycle method to implement
	render() {

		const disableInfo = {
			...this.props.ings
		};

		for(let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <=0 //returns true or false
			//{salad:true, meat:false...}
		}

		let orderSummary = null;
		
		let burger = this.state.error ? <p>Something went wrong!</p> : <Spinner />;

		//console.log('Hello');
		
		if(this.props.ings) {
			//console.log(this.props.ings);
			//console.log('Inside if statement');
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings}/>
					<BuildControls 
						ingredientAdded = {this.props.onIngredientAdded}
						ingredientRemoved = {this.props.onIngredientRemoved}
						disabled = {disableInfo}
						price = {this.props.price}
						purchasable = {this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler} /> 
				</Aux>
			);
			orderSummary = <OrderSummary 
							ingredients={this.props.ings}
							price={this.props.price}
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

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
		onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
