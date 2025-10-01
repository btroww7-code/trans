import { render, screen } from '@testing-library/react';
import ListingCard from './ListingCard';

describe('ListingCard', () => {
  it('renders listing title', () => {
    render(<ListingCard listing={{ title: 'Test', category: {}, from_address_json: {}, to_address_json: {} }} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
