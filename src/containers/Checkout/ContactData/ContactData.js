import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from "./ContactData.css";
import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		orderForm:{
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zipcode'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your e-mail'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: ''
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'}
					]
				},
				value: ''
			}
		},

		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault();
		console.log(this.props.ingredients);
		this.setState( {loading: true});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price
		}
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false});
				this.props.history.push('/');
			})
			.catch(error => this.setState({loading: false}));
	}

	inputChangedHandler = (event, inputIdentifier) => {
		{/*Using the spread operator for copying all the keys and values in the object, orderForm becoz, 
		it wont be deeply cloned..So we cannot reach the nested key, value pairs in orderForm. So we need to clone multiple times*/}
		const updatedOrderForm = {
			...this.state.orderForm
		}
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedOrderForm[inputIdentifier] = updatedFormElement; 
		this.setState({orderForm: updatedOrderForm});
		//console.log(this.state.orderForm);
	}
	render() {
		const formElementArray = [];
		for(let key in this.state.orderForm) {
			formElementArray.push({
				id:key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
				<form>
					{/*<Input elementType='...' elementConfig='...' value='...' />*/}
					{formElementArray.map(formElement => (
							<Input 
								key={formElement.id}
								elementType={formElement.config.elementType} 
								elementConfig={formElement.config.elementConfig}
								value={formElement.config.value} 
								changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
						))}
					<Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
				</form>
		);

		if(this.state.loading) {
			form = <Spinner />
		}

		return(
			<div className={classes.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;