import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
const INGREDIENT_PRICES = {
	salad: 1,
	cheese: 0.5,
	bacon: 2,
	meat: 2
};

const initialState = {
	ingredients: null,
	totalPrice: 4,
	erro: false
};

const reducer = (state = initialState, action) => {
	switch(action.type) {
		
		case actionTypes.ADD_INGREDIENT:
			const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1}
			const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
			const updatedState = {
				ingredients: updatedIngredients,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			}
			return updateObject(state, updatedState);
		
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName] : state.ingredients[action.ingredientName] - 1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			};
		
		case actionTypes.SET_INGREDIENTS:
			return {
				...state,
				ingredients: {
					salad: action.ingredients.salad,
					bacon: action.ingredients.bacon,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat
				},
				totalPrice: 4,
				error: false
			};
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: true
			};
		
		default:
			return state;
	}
};

export default reducer;