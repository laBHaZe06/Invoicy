import React from 'react';
import { render, screen } from '@testing-library/react'
import {describe, expect, test} from '@jest/globals';

import HomePage from '../src/app/home/page';


describe('Page', () => {
  test('renders the home page', () => {
    render(<HomePage />);
    const homeHeading =  screen.getByRole('heading', { level: 1 })
    expect(homeHeading).toBeDefined();
  });

});