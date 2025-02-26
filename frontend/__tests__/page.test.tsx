
import { render, screen } from '@testing-library/react'
import {describe, expect} from '@jest/globals';

import HomePage from '../src/app/home/page';
import Page from '@/app/page';
import ConnectComponent from '@/app/components/ConnectComponent';

// Test for Page App component
describe("Page App", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", {level: 1});
    // const buttonStart = screen.getByRole('button', { name: 'start' });
    expect(heading).toBeDefined();
    // expect(buttonStart).toBeDefined();
  });
});


// Test for Home Page component
describe("Home Page", () => {
  it("renders a heading", () => {
    render(<HomePage />);

    const heading = screen.getByRole("heading", {level: 1});
    expect(heading).toBeDefined();
  });
});


// Test connection component
describe("Connection Component", () => {
  it("renders a heading", () => {
    render(<ConnectComponent />);

    const heading = screen.getByText(/se connecter/i);
    expect(heading).toBeDefined();
  });
});


