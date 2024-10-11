
import { render, screen } from '@testing-library/react'
import {describe, expect} from '@jest/globals';
import NavBarComponent from '@/app/components/NavBarComponent';



describe("Components", () => {
  it("renders a heading", () => {
    render(<NavBarComponent/>);

    const heading = screen.getByRole("heading", {level: 1});

    expect(heading).toBeDefined();
  });
});