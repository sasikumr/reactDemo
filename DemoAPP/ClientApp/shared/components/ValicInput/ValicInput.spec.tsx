import React from 'react';
import ValicInput from '../ValicInput';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
//import TestUtils from 'react-addons-test-utils';
//import PropTypes from 'prop-types';
let generalProps;
beforeAll(() => {
  const props = {
    onChange: jest.fn(),
    type: 'text',
    name: 'valicInput'
  }
  generalProps = props;

  //return props; 
});
describe('ValicInput Component Test Case', () => {
  describe('General Case', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      const onChange = jest.fn();
      ReactDOM.render(<ValicInput {...generalProps} />, div);
    });
    it('required name property', () => {
      console.error = jest.genMockFn();
      const onChange = jest.fn();
      let component = TestUtils.renderIntoDocument(
        <ValicInput type='text' onChange={onChange} value="1111" />
      );

      expect(console.error).toBeCalled();
      expect(console.error.mock.calls.length).toBeGreaterThan(0);
    });
    it('required onChange property', () => {
      console.error = jest.genMockFn();
      let component = TestUtils.renderIntoDocument(
        <ValicInput type='text' name='input' value="1111" />
      );

      expect(console.error).toBeCalled();
      expect(console.error.mock.calls.length).toBeGreaterThan(0);
    });
    it('required type property', () => {
      console.error = jest.genMockFn();
      const onChange = jest.fn();
      let component = TestUtils.renderIntoDocument(
        <ValicInput onChange={onChange} name="input" value="1111" />
      );
      expect(console.error).toBeCalled();
      expect(console.error.mock.calls.length).toBeGreaterThan(0);
    });
    it('default type text', () => {
      const onChange = jest.fn();
      let component = TestUtils.renderIntoDocument(
        <ValicInput name="valicInput" type="mask" onChange={onChange} />
      );
      let element = ReactDOM.findDOMNode(component);
      expect(element.type).toBe('text');
    })

  });
  describe('Snapshot', () => {
    it('SSN snapshot', () => {
      const control = renderer.create(<ValicInput {...generalProps} type="ssn" value="123-11-1111" />);
      expect(control.toJSON()).toMatchSnapshot();
    });
    it('Email snapshot', () => {      
      const onChange = jest.fn();
      const control = renderer.create(<ValicInput name="valicInput" onChange={onChange} type="email" value="test@email.com" />);
      expect(control.toJSON()).toMatchSnapshot();
    });
    it('Phone snapshot', () => {      
      const onChange = jest.fn();
      const control = renderer.create(<ValicInput name="valicInput" onChange={onChange} type="phone" mask="\(999\)999\-9999" maskChar="_"/>);
      expect(control.toJSON()).toMatchSnapshot();
    });
    it('Text snapshot', () => {      
      const onChange = jest.fn();
      const control = renderer.create(<ValicInput {...generalProps} value="Text"/>);
      expect(control.toJSON()).toMatchSnapshot();
    });
    it('Number snapshot', () => {      
      const onChange = jest.fn();
      const control = renderer.create(<ValicInput {...generalProps} type="number" value="3"/>);
      expect(control.toJSON()).toMatchSnapshot();
    });
  })
  describe('ValicInput Type Text', () => {
    test('ValicInput component render text ', () => {

      const wrapper = shallow(<ValicInput {...generalProps} value='ValicInput' />)
      const val = wrapper.instance().props['value'];
      expect(val).toBe('ValicInput');
    });

  });

  describe('ValicInput Type SSN', () => {
    test('Render ssn ', () => {
      let component = TestUtils.renderIntoDocument(
        <ValicInput {...generalProps} value="A1111111A" type="ssn" mask="***\-**\-****" maskChar="_" />
      );
      let element = ReactDOM.findDOMNode(component);
      expect(element.value).toBe('A11-11-111A');
    });
    it('Event Simulate ssn change', () => {
      const mockfn = jest.fn();
      const wrapper = mount(<ValicInput name="valicInput" type="ssn" onChange={mockfn} value="" />);
      expect(wrapper.find('input').get(0).value).toBe('')
      let inputt = wrapper.find('input').get(0);
      wrapper.setProps({ value: 'A11-43-9999' })
      wrapper.simulate('change');
      expect(wrapper.find('input').get(0).isFormatValid).toBe(true)
      expect(wrapper.find('input').get(0).value).toBe('A11-43-9999')
    });
  });
  describe('ValicInput Type Email', () => {
    it('email type', () => {
      const onChange = jest.fn();
      let component = TestUtils.renderIntoDocument(
        <ValicInput name="valicInput" type="email" onChange={onChange} />
      );
      let element = ReactDOM.findDOMNode(component);
      expect(element.type).toBe('email');
    });
    it('Event Simulate email change', () => {
      const mockfn = jest.fn();
      const wrapper = mount(<ValicInput name="testinput" type="email" onChange={mockfn} value="invalid" />);
      expect(wrapper.find('input').get(0).value).toBe('invalid')
      let inputt = wrapper.find('input').get(0);
      wrapper.setProps({ value: 'test@gmail.com' })
      wrapper.simulate('change');
      expect(wrapper.find('input').get(0).isFormatValid).toBe(true)
      expect(wrapper.find('input').get(0).value).toBe('test@gmail.com')
  
      wrapper.setProps({ value: 'Test' })
      wrapper.simulate('change');
      expect(wrapper.find('input').get(0).isFormatValid).toBe(false)
      expect(wrapper.find('input').get(0).value).toBe('Test')
      // let component = TestUtils.renderIntoDocument(
      //   <ValicInput name="valicInput" type="email" onChange ={onChange} value="sasikuma" />
      // );
  
      // let element = ReactDOM.findDOMNode(component);  
      // element.value='sasikumar@gmail.com';
  
      // TestUtils.Simulate.change(element,inputt);
      // expect(inputt.value).toBe('')
      // let component = mount(<ValicInput required name="valicInput" onChange={onChange} type="email" value="sasikumar" />);
  
      //var rendered = component.find('input').render();
      //rendered.simulate('change');
  
      //expect(rendered.find('input')[0].attribs.maxlength).toEqual('10');
      //expect(component.toJSON()).toMatchSnapshot();
      // let inpt = <input type="text" value="sasi" name="valicInput" />
      // component.simulate('change', component.find('input'))
      // //expect(component.find('input').prop('value')).toEqual('sasikumar@gmail.com');
      // //TestUtils.simulate('change')
      // //component.find('input').simulate('change', {target: { value : 'sasikumar@gmail.com'}});  
      // expect(component.find('input').prop('value')).toBe('')
      // //component.find('input').simulate('change');
      // //expect(onChange.mock.calls.length).toEqual(1);
      //let inputProps = component.find('input').props;
  
      //component.find('input').simulate('onChange');    
      // component.find('input').simulate('change');
      //expect(component.find('input').isFormatValid).toBeTruthy();    
      //expect(element.type).toBe('email');
    });
    
  });
  describe('ValicInput Type Number',()=>{
    it('Number Type', () => {
      const onChange = jest.fn();
      let component = TestUtils.renderIntoDocument(
        <ValicInput name="valicInput" type="number" onChange={onChange} />
      );
      let element = ReactDOM.findDOMNode(component);
      expect(element.type).toBe('number');
    })    
  });

});