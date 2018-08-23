import React from 'react';
import renderer from 'react-test-renderer';

import {PasswordCreator} from '../../src/components/PasswordCreator';

it('renders correctly with defaults', () => {
  const input = renderer
    .create(<PasswordCreator value="123" onChangeText={(text => console.log(text))} textInputStyle={{}}  />)
    .toJSON();
  expect(input).toMatchSnapshot();
});