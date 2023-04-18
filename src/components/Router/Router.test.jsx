import { render, screen } from '@testing-library/react';
import Router from './Router';


describe('<Router />', () => {
	it('should render correctly', () => {
		render(<Router />);
		expect(screen.getByTestId('list')).toBeInTheDocument();
	});
});
