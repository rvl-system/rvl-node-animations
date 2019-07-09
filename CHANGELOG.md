## 2.0.0 (2019-7-9)

- BREAKING CHANGE: Modified each method so that it's first argument is `brightness`, between 0 and 255
    - The `createSolidColorWave` method no longer takes a `value` argument because it was replaced with the `brightness` argument (which does exactly the same thing under the hood)
- Added the `createRainbowWave` method

## 1.1.0 (2019-5-29)

- Relaxed the `rate` parameter for createMovingWave so that you can now pass in `0` to create a perfectly still wave.

## 1.0.1 (2019-5-16)

- Bug fixes with some animations not rendering correctly

## 1.0.0 (2019-5-16)

- Initial release
