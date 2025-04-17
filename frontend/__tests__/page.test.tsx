
import { render, screen } from '@testing-library/react'
import {describe, expect} from '@jest/globals';
import Page from '@/app/page';
import ConnectComponent from '@/components/Connect/ConnectComponent';



// Test for Page App component
describe("Page App", () => {
  it("renders a heading", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", {level: 1});
    expect(heading).toBeDefined();
  
  });
});


// Test for ConnectComponent component
describe("ConnectComponent", () => {
  it("renders a form", () => {
    render(<ConnectComponent />);

    const form = screen.getByRole("form");
    expect(form).toBeDefined();
  });
});



