import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";
import { ENGLISH_WORDS } from "./words";

it("renders", function () {
  render(<Snowman />);
});

it("matches snapshot", function () {
  const { container } = render(<Snowman />);
  expect(container).toMatchSnapshot();
});

it("game over after wrong guesses", function () {
  const words = ["apple"];
  const maxWrong = words[0].length + 1;
  const lettersUsed = new Set(..."apple");
  const { container } = render(<Snowman words={words} maxWrong={maxWrong} />);
  let count = 0;
  for (const c of "abcdefghijlklmnopqrstuvwxyz") {
    if (!lettersUsed.has(c) && count <= maxWrong) {
      count++;
      fireEvent.click(container.querySelector(`button[value = ${c}]`));
    }
  }
  expect(
    container.querySelector("button:not([value='reset'])")
  ).not.toBeInTheDocument();
  expect(container.querySelector(".lose")).toBeInTheDocument();
});

it("should get a random word", function () {
  const words = ENGLISH_WORDS.slice(0, 3);
  const { container } = render(<Snowman words={words} />);
  const value = container.querySelector(`span`).getAttribute("value");
  expect(words.includes(value)).toBe(true);
});

it("should reset the game", function () {
  const { container } = render(<Snowman words={["apple"]} />);
  const cButton = container.querySelector('button[value="c"]');
  fireEvent.click(cButton);
  const resetBtn = container.querySelector("button[value='reset']");
  fireEvent.click(resetBtn);
  const buttons = container.querySelectorAll("button");
  expect(
    Array.from(buttons).every((btn) => btn.disabled === false)
  ).toBeTruthy();
  expect(container.querySelector('img[alt="0"]')).toBeInTheDocument();
});
