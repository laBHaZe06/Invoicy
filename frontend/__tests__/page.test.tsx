
import { render, screen } from '@testing-library/react'
import {describe, expect} from '@jest/globals';
import Page from '@/app/page';


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


