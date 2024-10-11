import { render } from '@testing-library/react'
import HomePage from '../src/app/home/page';
import {expect, test} from '@jest/globals';

/**
 * @jest-environment jsdom
 */

test('renders homepage unchanged', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
  expect(element.tagName).toBe('DIV');
  expect(element.className).toBe('container');
  expect(element.querySelector('h1')).not.toBeNull();
  expect(element.querySelector('h1').textContent).toBe('Welcome to Next.js');
  render(<HomePage />, element);
})