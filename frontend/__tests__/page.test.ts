import { render, screen } from '@testing-library/react'
import {describe, expect, test} from '@jest/globals';
import HomePage from '../src/app/home/page';
 
describe('Page', () => {
  test('renders a heading', () => {
    render(typeof HomePage)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading);
  })
})