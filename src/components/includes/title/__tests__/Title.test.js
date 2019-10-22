import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react';
import Title from '../Title';

afterEach(cleanup);

test('Component has changed', () => {
  const component = renderer.create(<Title title="New kit" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Title is displayed', () => {
  const { getByText } = render(<Title title="New kit" />);
  const title = getByText('New kit');
  expect(title.toBeInTheDocument);
});

it('h1 should match expected title', () => {
  const { container } = render(<Title title="New kit" />);
  const title = container.querySelector('h1');
  expect(title.textContent).toBe('New kit');
});
