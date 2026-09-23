# bingo-board

A [React](https://reactjs.org/) component for creating playable in-browser Bingo games.
You know the kind I mean -- like on Oscar night? or during a Presidential debate?

## Using bingo-board

A very vanilla game of Bingo:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Bingo from 'bingo-board';

const phrases = [ /* your list of phrases -- try to give it at least 30 */ ];

ReactDOM.render(
  <React.StrictMode>
    <Bingo phrases={phrases} />
  </React.StrictMode>,
  document.getElementById('root')
);
```

This will:

1. The `<Bingo>` component will create your standard 5 × 5 grid
2. Internally, `getBingoPhrases` will randomly select 24 items from `phrases`
3. ...and then stick `FREE` in the middle.

And that's it! Load it in your browser and click away to play.

### Custom styles per square

Let's say one of your phrases was `:fun:` and you wanted to style the text larger
and in a specific color. You can add a `squareClassResolver` function for that.

Let's revisit our vanilla example:

```jsx
import Bingo, { squareClassResolver } from 'bingo-board';

const phrases = [ ':fun:', /* and 30 more */ ];

const customSquareClassResolver = (phrase) => {
  // In this example, we want to keep the default styling for the 'FREE' square
  let cssClass = squareClassResolver(phrase);

  if (phrase === ':fun:') {
    cssClass = `${cssClass} fun-style`;
  }

  return cssClass.trim();
};

ReactDOM.render(
  <React.StrictMode>
    <Bingo
      phrases={phrases}
      squareClassResolver={customSquareClassResolver}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
```

Here we get our Bingo board as before, but now we'll apply the `fun-style` CSS
class to the square that gets the `:fun:` phrase. (I'll leave the actual CSS up
to you.)

## API

### `<Bingo>`

The main component. It takes the following props:

- **`phrases`** (required) -- An array of strings that it uses to fill out the
  board; internally, the component uses `getBingoPhrases` to randomize the list
  and add the `FREE` space
- **`freeSquare`** (optional) -- A string to use for the center 'FREE' square;
  this will be `FREE` if not provided
- **`seed`** (optional) -- A string or number used to seed the board's
  randomization; the same `phrases` and `seed` will always produce the same
  board, which makes it possible to share a specific board layout (e.g., via a
  URL param). Omit it to get a freshly randomized board every time. Providing
  a `seed` also turns on persistence: checked-off squares are saved to
  `localStorage` under that seed, so reloading the page (with the same
  `phrases` and `seed`) restores the same checks. Without a `seed`, checked
  squares are not persisted -- unless the URL already has a `#` fragment when
  the board loads (e.g., left there by an earlier "New board" click, see
  below), in which case that fragment is used as the seed automatically.
- **`squareClassResolver`** (optional) -- A function applied to each phrase that
  will output a CSS class for the square its in; use it to grant custom styles
  to each square
- **`hideNewBoardButton`** (optional) -- Set to `true` to hide the "New board"
  button
- **`hideClearBoardButton`** (optional) -- Set to `true` to hide the "Clear
  board" button

### Board actions

Beneath the grid, `<Bingo>` renders two small buttons:

- **New board** -- reshuffles the phrases into a brand new board, clears any
  checked squares, and writes the new seed to the URL's `#` fragment (so
  reloading, bookmarking, or sharing the link brings back that same board)
- **Clear board** -- unchecks every square on the *current* board, without
  reshuffling

Pass `hideNewBoardButton` and/or `hideClearBoardButton` to hide either (or
both).

### `squareClassResolver`

Given a string, return a string to be applied as a CSS class to a square on the
Bingo board. The library's default implementation returns `free-square` for the
`FREE` square phrase, and an empty string for everything else.

## Scripts

In the project directory, you can run:

### `npm test`

Run those tests.

### `npm run compile`

Compiles the [TypeScript](https://www.typescriptlang.org/) into the `dist`
folder and also copies the base CSS for the component.

**N.b.,** This is run as part of the continuous delivery script in the GitHub
workflow. Do _not_ commit to the `dist` directory unless you know what you're
doing.
