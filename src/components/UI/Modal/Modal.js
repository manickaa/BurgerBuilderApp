 import React from 'react';

 import classes from './Modal.css';

 const modal = (props) => (
 //dynamic thing must be a js object..that is why we need double curly braces
 	<div 
 		className = {classes.Modal}
 		style={{
 			transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
 			opacity: props.show ? '1': ''
 		}}>
 		{props.children}
 	</div>


 );


 export default modal;