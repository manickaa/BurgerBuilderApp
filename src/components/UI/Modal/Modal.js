 import React, {Component} from 'react';

 import classes from './Modal.css';
 import Aux from "../../../hoc/Aux/Auxillary";
 import Backdrop from "../Backdrop/Backdrop";

 class Modal extends Component {
 	
 	shouldComponentUpdate(nextProps, nextstate) {
 		return nextProps.show !== this.props.show; 
 	}
 	componentWillUpdate () {
 		console.log("[Modal] will update");
 	}
 	render() {
 		return (
 			<Aux>
		 		<Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
			 	<div 
			 		className = {classes.Modal}
			 		style={{
			 			transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
			 			opacity: this.props.show ? '1': ''
			 		}}>
			 		{this.props.children}
			 	</div>
		 	</Aux>
 		);
 	}
 }
 //dynamic thing must be a js object..that is why we need double curly braces


 export default Modal;