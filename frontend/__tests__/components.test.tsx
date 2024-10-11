
import { render } from '@testing-library/react'
import {describe, expect} from '@jest/globals';
import NavBarComponent from '@/app/components/NavBarComponent';



describe("Components", () => {
  it("renders a heading", () => {
    render(<NavBarComponent/>);
    expect(describe).toHaveBeenCalled();
  });
});