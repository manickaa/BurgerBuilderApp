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
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zipcode'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your e-mail'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'}
					]
				},
				value: 'fastest',
				valid: true
			}
		},
		formIsValid: false,
		loading: false
	}

	orderHandler = (event) => {
		event.preventDefault(); 
		//Dont want to send a request, which will reload the page..So we are preventing the default happening
		//console.log(this.props.ingredients);
		this.setState( {loading: true});
		const formData = {};
		
		for(let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
		}
		axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false});
				this.props.history.push('/');
			})
			.catch(error => this.setState({loading: false}));
	}

	checkValidity(value, rules) {

		let isValid=true;
		
		if(!rules) {
			return true;
		}

		if(rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if(rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if(rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		
		//console.log(isValid);
		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		/*Using the spread operator for copying all the keys and values in the object, orderForm becoz, 
		it wont be deeply cloned..So we cannot reach the nested key, value pairs in orderForm. So we need to clone multiple times*/
		const updatedOrderForm = {
			...this.state.orderForm
		}
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement; 
		
		let formIsValid = true;
		for(let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		//console.log(formIsValid);
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
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
		//console.log(formElementArray);

		let form = (
				<form onSubmit={this.orderHandler}>
					{/*<Input elementType='...' elementConfig='...' value='...' />*/}
					{formElementArray.map(formElement => (
							<Input 
								key={formElement.id}
								elementType={formElement.config.elementType} 
								elementConfig={formElement.config.elementConfig}
								value={formElement.config.value}
								invalid={!formElement.config.valid}
								shouldValidate={formElement.config.validation}
								touched = {formElement.config.touched}
								changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
						))}
					<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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