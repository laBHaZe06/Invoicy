import { render } from '@testing-library/react'
import HomePage from '../src/app/home/page';
import {expect, test} from '@jest/globals';
test('renders homepage unchanged', () => {
  const { container } = render(typeof HomePage)
  expect(container).toMatchSnapshot()
})