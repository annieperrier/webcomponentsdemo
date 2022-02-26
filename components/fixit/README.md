# Component: Fix It!

A button to solve all your problems.

Tracks its number of clicks and displays it.

## Usage

```html
<fix-it id="fix-it-demo" mode="advanced" initial-count="20"></fix-it>
```

## Attribubes

* `mode`
  * a mode to display the button
  * values:
    * `basic` (default)
    * `advanced`

* `initial-count`
  * the initial value of the counter
  * default value: 0

## Features

The `fixCount` can be obtained from the element at any time:

```javascript
let currentFixCount = document.querySelector('fix-it').fixCount;
```

The `mode` can be updated dynamically:

```javascript
document.querySelector('fix-it').setAttribute('mode', 'advanced');
```
