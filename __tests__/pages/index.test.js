import { render, screen } from '../test-utils';
import Home from '../../pages/index';

describe('Home', () => {
  it('Should render home page', () => {
    render(<Home />);
    const heading = screen.getByText(/Welcome/i);
    expect(heading).toBeInTheDocument();
  });
});
