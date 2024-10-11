
import { render, screen } from '@testing-library/react'
import {describe, expect} from '@jest/globals';

import HomePage from '../src/app/home/page';


describe("Home", () => {
  it("renders a heading", () => {
    render(<HomePage />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeDefined();
  });
});