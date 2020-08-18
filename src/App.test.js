import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//dont test libraries
//dont test complex connections 
//only test if a react component is rendered correctly
//click a button and check if specific props are triggered
//test reducer thunk
//test conditional outputs

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
