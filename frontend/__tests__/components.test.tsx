
import { render, screen } from '@testing-library/react'
import {describe, expect} from '@jest/globals';



describe("Components", () => {
  it("renders a heading", () => {
    render('');

    const heading = screen.getByRole("heading", {level: 1});

    expect(heading).toBeDefined();
  });
});