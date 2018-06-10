import React from 'react';
import { shallow, mount, render } from 'enzyme';
import SearchView from './SearchView'
//import { MainPageActions } from './loginState'

describe('SearchView', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SearchView />);
    expect(wrapper.length).toBe(1);
  });
});