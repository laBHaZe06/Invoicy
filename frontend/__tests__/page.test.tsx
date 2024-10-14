
import { render, screen } from '@testing-library/react'
import {describe, expect} from '@jest/globals';

import HomePage from '../src/app/home/page';
import Page from '@/app/page';


describe("Page App", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", {level: 1});
    // const buttonStart = screen.getByRole('button', { name: 'start' });
    expect(heading).toBeDefined();
    // expect(buttonStart).toBeDefined();
  });
});

describe("Home Page", () => {
  it("renders a heading", () => {
    render(<HomePage />);

    const heading = screen.getByRole("heading", {level: 1});
    expect(heading).toBeDefined();
  });
});


