import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
//configure enables enzyme's interaction with the adapter
//Shallow rendering is useful to constrain yourself to testing a component as a unit, and 
//to ensure that your tests aren't indirectly asserting on behavior of child components.

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;
    //function that gets executed before each test
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });
    //write the actual test here
    it('it should render two <NavigationItem/> elements if not authenticated', () => {
        
        //write the expectation
        expect(wrapper.find(NavigationItem)).toHaveLength(2);

    }); //it() takes two arguments
    it('it should render three <NavigationItem/> elements if authenticated', () => {
        //One way to pass props needed -> wrapper = shallow(<NavigationItems isAuthenticated />);
        //Another way
        wrapper.setProps({isAuthenticated: true});
        //write the expectation
        expect(wrapper.find(NavigationItem)).toHaveLength(3);

    }); //it() takes two arguments
});