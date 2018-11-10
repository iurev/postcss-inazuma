# PostCSS Inazuma [![Build Status][ci-img]][ci]

[PostCSS] plugin which converts `px` to `vw` (or anything else) based on coefficients and media queries.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/iurev/postcss-inazuma.svg
[ci]:      https://travis-ci.org/iurev/postcss-inazuma

<!-- TODO: https://www.npmjs.com/package/markdown-magic -->

```css
/* from */

    @media (min-width: 320px) and (max-width: 719px) {
        .awesomeTitle {
            font-size: 14px;
        }
    }

/* to */

    @media (min-width: 320px) and (max-width: 719px) {
        .awesomeTitle {
            font-size: 4.375vw;
        }
    }

/* ↓↓↓ BUT, that's not all, see below ↓↓↓ */
```

## What plugin does well

1. Converts from `px` (or anything) to `vw` (or anything)
2. Multiplies each value on a custom coefficient
3. Splits media queries
4. Allows you to customize almost everything in .css and build files

## Recepies

### Convert from  `px` to `vw`

```css
/*
{
    "inazuma": {
        "320": 3.2
    }
}
*/

/* from */
    @media (min-width: 320px) and (max-width: 719px) {
        .awesomeTitle {
            font-size: 16px;
        }
    }

/* to */

    @media (min-width: 320px) and (max-width: 719px) {
        .awesomeTitle {
            font-size: 4.375vw;
        }
    }
```

### Generate new media query ranges

TODO: implement it

```css
/*
{
    "inazuma": {
        "320": {
            "value": 3.2,
            "split": {
                "at: [480],
                "480": 4.8
            }
        }
    }
}
*/

/* from */

    @media (min-width: 360px) and (max-width: 720px) {
        .awesomeTitle {
            font-size: 16px;
        }
    }

/* to */

    @media (min-width: 360px) and (max-width: 480px) {
        .awesomeTitle {
            font-size: 16px;
        }
    }
    @media (min-width: 481px) and (max-width: 720px) {
        .awesomeTitle {
            font-size: 16px;
        }
    }
```

### Place floating elements, so they don't intersect each other

TODO: Нужно продумать какой-то сайт средней сложности с текстами и тд и сверстать его, используя этот плагин, добавить туда летающие картинки.

### Use with other plugins

```css
/*

https://github.com/WolfgangKluge/postcss-media-variables
<- ❗️ use it after postcss-media-variables and before postcss-nested
https://github.com/postcss/postcss-nested

*/

    .awesomeTitle {
        @media (--small) {
            font-size: 16px;
        }
    }
```

### Use `iz` instead of `px`

With just one setting – you could use fancy `iz` instead of `px` 😺

It might be useful if you still want to use `px`

```js
    { iz: true }
```

```css
    @media (min-width: 320px) {
        .awesomeTitle {
            font-size: 14iz;
        }
    }
```

## Usage

```bash
yarn add postcss-inazuma
```

```js
const inazuma = require('postcss-inazuma')
const inazumaConf = {}
postcss([inazuma(inazumaConf)])
```

## Configuration

| Values | Type | Description | Example |
|--------|------|-------------|---------|
| width | `integer` | Value in (min-width: `width`) | `{ 320: ... }` |
| coefficient | `float` / `Object` | `float` – multiplier of all values in `px` <br /> `Object` – media query would be splitted | `{ ...: 0.9 }` <br /> `{ ...: { ... } }` |
| splitAt | Array | How to split media query | `{ splitAt: [480] }` |
| iz | Bool | Use `iz` instead of `px` | `{ splitAt: [480] }` |


## Restrictions

1. Can't use outside  `iz` media queries
2. Currently you can use it only for not intersected media rules
3. Functions in `.css` files are not supported

```css
/* Not-intersected ✅
>-------<
         >-------<
*/
(min-width: 320) and (max-width: 720)
(min-width: 721) and (max-width: 1023)



/* Going up – not fully supported 😢
>------------∞
        >----∞
*/
(min-width: 320)
(min-width: 720)



/* Going down – not fully supported 😢
-----<
------------<
*/
(max-width: 720)
(max-width: 320)



/* Shuffled – not supported ⛔️
>------------∞
-------<
*/

(min-width: 320)
(max-width: 721)
```

## Analogs

[github.com/evrone/postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport)
