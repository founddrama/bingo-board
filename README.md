# bingo-board

A [React](https://reactjs.org/) component for creating playable in-browser Bingo games.
You know the kind I mean -- like on Oscar night? or during a Presidential debate?

## Using bingo-board

A very vanilla game of Bingo:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Bingo, { getBingoPhrases } from 'bingo-board';

const phrases = [ /* your list of phrases -- try to give it at least 30 */ ];

ReactDOM.render(
  <React.StrictMode>
    <Bingo phrases={getBingoPhrases(phrases)} />
  </React.StrictMode>,
  document.getElementById('root')
);
```

This will:

1. The `<Bingo>` component will create your standard 5 × 5 grid
2. `getBingoPhrases` will randomly select 24 items from `phrases`
3. ...and then stick `FREE` in the middle.

And that's it! Load it in your browser and click away to play.

### Custom styles per square

Let's say one of your phrases was `:fun:` and you wanted to style the text larger
and in a specific color. You can add a `squareClassResolver` function for that.

Let's revisit our vanilla example:

```jsx
import Bingo, { getBingoPhrases, squareClassResolver } from 'bingo-board';

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
      phrases={getBingoPhrases(phrases)}
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
  board; use `getBingoPhrases` to randomize the list and add the `FREE` space
- **`squareClassResolver`** (optional) -- A function applied to each phrase that
  will output a CSS class for the square its in; use it to grant custom styles
  to each square

### `getBingoPhrases`

Given a list of strings, `getBingoPhrases` will return a randomized subset of 24
of them, with the `FREE` square phrase in the center of the list. Accepts an
optional second parameter to override the text of the `FREE` space.

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
