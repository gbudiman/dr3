import React from 'react';
import BarGrid from './BarGrid.js';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<BarGrid />', () => {
  const perGrid = 10;
  
  const wrapper = shallow(<BarGrid />);
  const instance = wrapper.instance();

  function innate(x=perGrid) {
    return ['innate', x];
  }

  function innates(...xs) {
    return xs.map((x) => innate(x));
  }

  function bought(x=perGrid) {
    return ['bought', x];
  }

  function boughts(...xs) {
    return xs.map((x) => bought(x));
  }

  function mixed(a, b) {
    return ['mixed', a, b];
  }

  function ep(innate, total) {
    return expect(instance.compute(innate, total));
  }

  test('6i > 5', () => { expect(() => { ep(6, 5) }).toThrow('total is less than innate') })
  test('-2i', () => { expect(() => { ep(-2, 0) }).toThrow('innate cannot be negative') })

  test('0i + 0 = 0', () => { ep(0,0).toEqual([]); })
  test('0i + 7 = 7', () => { ep(0, 7).toEqual(boughts(7)); })
  test('0i + 10 = 10', () => { ep(0, 10).toEqual(boughts(10)); })
  test('0i + 11 = 11', () => { ep(0, 11).toEqual(boughts(10, 1)); })
  test('0i + 22 = 22', () => { ep(0, 22).toEqual(boughts(10, 10, 2)); })
  test('1i + 7 = 8', () => { ep(1, 8).toEqual([mixed(1,7)]); })
  test('1i + 21 = 22', () => { ep(1, 22).toEqual([mixed(1, 9)].concat(boughts(10, 2))); })
  test('6i + 0 = 6', () => { ep(6, 6).toEqual([mixed(6, 0)]); })
  test('6i + 1 = 7', () => { ep(6, 7).toEqual([mixed(6, 1)]); })
  test('6i + 4 = 10', () => { ep(6, 10).toEqual([mixed(6, 4)]); })
  test('6i + 5 = 11', () => { ep(6, 11).toEqual([mixed(6, 4)].concat(boughts(1))); })
  test('6i + 14 = 20', () => { ep(6, 20).toEqual([mixed(6,4)].concat(boughts(10))); })
  test('6i + 22 = 28', () => { ep(6, 28).toEqual([mixed(6,4)].concat(boughts(10, 8))); })
  test('10i + 0 = 10', () => { ep(10, 10).toEqual(innates(10)); })
  test('12i + 0 = 12', () => { ep(12, 12).toEqual([innate(10), mixed(2, 0)]); })
  test('12i + 8 = 20', () => { ep(12, 20).toEqual([innate(10), mixed(2, 8)]); })
  test('12i + 9 = 21', () => { ep(12, 21).toEqual([innate(10), mixed(2, 8), bought(1)]); })
  test('24i + 0 = 24', () => { ep(24, 24).toEqual([innate(10), innate(10), mixed(4, 0)]); })
  test('24i + 24 = 48', () => { ep(24, 48).toEqual([innate(10), innate(10), mixed(4, 6), bought(10), bought(8)]); })
})