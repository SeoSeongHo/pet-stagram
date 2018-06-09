import React from 'react';
import { shallow, mount, render } from 'enzyme';
import LoginView from './loginView'
import { LoginActions } from './loginState'
//import  reducer from '../../store/reducer'

describe('LoginView', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LoginView />);
    expect(wrapper.length).toBe(1);
  });

  // check LoginView has 2 inputs : username and password
  it('has 2 inputs', () => {
    const wrapper = mount(<LoginView />);
    expect(wrapper.find('input').length).toBe(2);
  });

  // check username change
  it('username should be changed', () => {
    const wrapper = mount(<LoginView />);
    const mockedEvent = { target: { value: 'username@test.com' } };
    wrapper.find('input').at(0).simulate('change', mockedEvent);
    expect(wrapper.state().username).toBe('username@test.com');
  });

  // check password change
  it('password should be changed', () => {
    const wrapper = mount(<LoginView />);
    const mockedEvent = { target: { value: 'password123' } };
    wrapper.find('input').at(1).simulate('change', mockedEvent);
    expect(wrapper.state().password).toBe('password123');
  });
});

  /*

  describe('insert new text', () => {
    it('has a form', () => {
      expect(component.find('form').exists()).toBe(true);
    });
    it('has an input', () => {
      expect(component.find('input').exists()).toBe(true);
    });
    it('simulates input change', () => {
      const mockedEvent = {
        target: {
          value: 'hello'
        }
      };
      // 이벤트를 시뮬레이트 합니다. 두번째 파라미터는 이벤트 객체입니다.
      component.find('input').simulate('change', mockedEvent); 
      expect(component.state().name).toBe('hello');
    });
    it('simulates form submit', () => {
      const mockedEvent = {
        preventDefault: () => null // onSubmit 에서 preventDefault 를 호출하게 되므로, 가짜 함수 추가
      };
      component.find('form').simulate('submit', mockedEvent);
      expect(component.state().name).toBe(''); // 등록 하면 값이 공백으로 변하며
      expect(changed).toBe('hello');
    })
  })

});

describe('Add todo', () => {
  it('Add todo change state', () => {
    expect(reducer(
      {"form": {}, "login": {"loading": false}, "routing": {"locationBeforeTransitions": null}},
      LoginActions.loginRequest()
    )).toEqual( {"form": {}, "login": {"loading": true}, "routing": {"locationBeforeTransitions": null}})
  })
});


describe('toggle todo', () => {
  it('toggle todo change state', () => {
    expect(reducer(
      [{ id:0, text:"eat dinner", completed: false}],
      toggleTodo(0)
    )).toEqual([{ id:0, text:"eat dinner", completed: true}])
  })
})
*/
