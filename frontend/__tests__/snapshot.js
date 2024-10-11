/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react'
import HomePage from '../src/app/home/page';
import {expect} from '@jest/globals';


it("renders homepage unchanged", () => {
  const { container } = render(<HomePage />);
  expect(container).toMatchSnapshot();
});