 import React from 'react';

 import classes from './Modal.css';
 import Aux from "../../../hoc/Auxillary";
 import Backdrop from "../Backdrop/Backdrop";

 const modal = (props) => (
 //dynamic thing must be a js object..that is why we need double curly braces
 	<Aux>
 		<Backdrop show={props.show} clicked={props.modalClosed}/>
	 	<div 
	 		className = {classes.Modal}
	 		style={{
	 			transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
	 			opacity: props.show ? '1': ''
	 		}}>
	 		{props.children}
	 	</div>
 	</Aux>


 );


 export default modal;