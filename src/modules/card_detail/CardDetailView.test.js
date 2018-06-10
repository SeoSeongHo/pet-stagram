import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CardDetailView from './CardDetailView'
//import { MainPageActions } from './loginState'

describe('CardDetailView', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CardDetailView />);
    expect(wrapper.length).toBe(1);
  });
});