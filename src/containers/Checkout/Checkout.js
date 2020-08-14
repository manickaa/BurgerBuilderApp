import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
class Checkout extends Component {	

	checkoutCancelHandler = () => {
		this.props.history.goBack();   //goes back to the last page
	} 

	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

 	render() {
 		let summary = <Redirect to="/" />
 		if(this.props.ings) {
 			const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
 			summary = (
 				<div>
 					{purchasedRedirect}
	 				<CheckoutSummary 
						ingredients={this.props.ings} 
						checkoutCancelled={this.checkoutCancelHandler}
						checkoutContinued={this.checkoutContinueHandler} />
					<Route path={this.props.match.path + '/contact-data'} 
						   component = {ContactData} />
				</div>
			);
 		}
		return summary;
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerbuilder.ingredients,
		purchased: state.order.purchased
		//price: state.totalPrice
	};
};

export default connect(mapStateToProps)(Checkout);