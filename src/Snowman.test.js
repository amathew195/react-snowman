import { render, fireEvent } from '@testing-library/react';
import Snowman from './Snowman';

it('renders', function () {
  render(<Snowman />);
});

it('matches snapshot', function () {
  const { container } = render(<Snowman />);
  expect(container).toMatchSnapshot();
})

it('game over after 6 wrong guesses', function(){
  const { container } = render(<Snowman />);
  const wrongLetters = "zyxwvu".split("");
  wrongLetters.forEach(l =>{
    fireEvent.click(container.querySelector(`button[value = ${l}]`));
  })
  expect(container.querySelector('button')).not.toBeInTheDocument()
  expect(container.querySelector('.lose')).toBeInTheDocument()
})