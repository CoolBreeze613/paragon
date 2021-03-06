import React from 'react';
import { mount } from 'enzyme';

import Icon from './index';

const testId = 'testId';
const classNames = [
  'fa',
  'fa-check',
];
const srTest = 'srTest';

let wrapper;

describe('<Icon />', () => {
  describe('props received correctly', () => {
    it('receives required props', () => {
      wrapper = mount(<Icon className={classNames} />);
      const iconSpans = wrapper.find('span');
      const iconSpan = iconSpans.at(0);

      expect(iconSpan.prop('id')).toContain('Icon');
      expect(iconSpan.hasClass(classNames[0])).toEqual(true);
      expect(iconSpan.hasClass(classNames[1])).toEqual(true);
    });
    it('handles null id properly', () => {
      const nullId = null;
      wrapper = mount(<Icon id={nullId} className={classNames} />);
      const iconSpans = wrapper.find('span');
      const iconSpan = iconSpans.at(0);

      expect(iconSpan.prop('id')).toContain('Icon');
      expect(iconSpan.hasClass(classNames[0])).toEqual(true);
      expect(iconSpan.hasClass(classNames[1])).toEqual(true);
    });
    it('handles screenReaderText correctly', () => {
      wrapper = mount(<Icon id={testId} className={classNames} screenReaderText={srTest} />);
      const iconSpans = wrapper.find('span');

      expect(iconSpans.length).toEqual(2);
      expect(iconSpans.at(0).prop('id')).toEqual(testId);
      expect(iconSpans.at(1).hasClass('sr-only')).toEqual(true);
    });
  });
});
