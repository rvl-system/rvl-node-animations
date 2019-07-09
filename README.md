# RVL-Node Animations

A set of helper methods to create animations for [RVL-Node](https://github.com/nebrius/RVL-Node) and friends.

## System Requirements

- A supported LTS version of Node.js. This module should work on other versions, but hasn't been tested.

## Installation

Install using npm:

```bash
npm install rvl-node-animations
```

## Usage

Basic usage:

```typescript
import {
  createWaveParameters,
  createSolidColorWave,
  createColorCycleWave
} from 'rvl-node-animations';

const waveParameters = createWaveParameters(
  // Create a solid-cyan, half-way transparent color
  createSolidColorWave(255, 128, 255, 128),

  // Create a fully opaque, slow color cycle that will show throw the cyan wave
  createColorCycleWave(255, 2, 255)
);
```

If you intend to create these animations on the same device that will be controlling the LEDs, here is an example integrating rvl-node-animations and [rvl-node](https://github.com/nebrius/rvl-node):

```typescript
import {
  createWaveParameters,
  createSolidColorWave,
  createColorCycleWave
} from 'rvl-node-animations';
import { RVL } from 'rvl-node';

const rvl = new RVL({
  networkInterface: 'wlan0',
  logLevel: 'debug',
  mode: 'controller'
});

rvl.on('initialized', () => {
  rvl.setWaveParameters(createWaveParameters(
    // Create a solid-cyan, half-way transparent color
    createSolidColorWave(255, 128, 255, 128),

    // Create a fully opaque, slow color cycle that will show throw the cyan wave
    createColorCycleWave(255, 2, 255)
  ));
});
```

## Notes

If you're using TypeScript, you don't need to install separate `@types` type definitions because this package ships with them. To support sharing of interfaces between this module and `rvl-node` itself, I created another module called [rvl-node-types](https://github.com/nebrius/rvl-node-types), which may be of interest to you.

All waves are defined in the [HSV color space](https://en.wikipedia.org/wiki/HSL_and_HSV) that has been mapped to 8-bit integers (e.g. the hue is 0-255, not 0-360). Please familiarize yourself with the HSV color space before using this library.

## API

Note: API signatures are declared using [TypeScript syntax](https://www.typescriptlang.org/). This provides a concise, formal definition for all signatures in a syntax that is familiar to at least some developers.

### createWaveParameters(wave1, wave2, wave3, wave4)

This method creates a fully formed set of wave parameters that can be passed directly to `rvl-node#setWaveParameters()`.

_Signature:_

```typescript
function createWaveParameters(
  wave1?: IWave,
  wave2?: IWave,
  wave3?: IWave,
  wave4?: IWave
): IWaveParameters
```

_Arguments:_

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>wave1 (optional)</td>
      <td>IWave</td>
      <td>The wave parameters for the top-most wave in the stack. If this wave is fully opaque, it will obscure the other waves. Use one of the <pre>create*Wave</pre> methods to generate it. If this parameter is not supplied, a fully transparent wave is created instead.</td>
    </tr>
    <tr>
      <td>wave2 (optional)</td>
      <td>IWave</td>
      <td>The wave parameters for the second top-most wave in the stack. If this parameter is not supplied, a fully transparent wave is created instead.</td>
    </tr>
    <tr>
      <td>wave3 (optional)</td>
      <td>IWave</td>
      <td>The wave parameters for the third top-most wave in the stack. If this parameter is not supplied, a fully transparent wave is created instead.</td>
    </tr>
    <tr>
      <td>wave4 (optional)</td>
      <td>IWave</td>
      <td>The wave parameters for the bottom-most wave in the stack. If this parameter is not supplied, a fully transparent wave is created instead.</td>
    </tr>
  </tbody>
</table>

_Returns:_ an `IWaveParamters` instance. Details can be found at [rvl-node-types](https://github.com/nebrius/rvl-node-types), but for all intents and purposes it can be treated as a black box.

### createEmptyWave()

This method creates an empty wave, aka a fully-transparent wave that allows waves below it in the stack to be fully visible.

_Signature:_

```typescript
function createEmptyWave(): IWave
```

_Arguments:_ none

_Returns:_ an `IWave` instance. Details can be found at [rvl-node-types](https://github.com/nebrius/rvl-node-types), but for all intents and purposes it can be treated as a black box.

### createSolidColorWave(brightness, h, s, a)

This method creates a solid color wave that does not change over distance or time.

_Signature:_

```typescript
function createSolidColorWave(brightness: number, h: number, s: number, a: number): IWave
```

_Arguments:_

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>brightness</td>
      <td>number</td>
      <td>The brightness of the wave, mapped to between 0 (0%) and 255 (100%).</td>
    </tr>
    <tr>
      <td>h</td>
      <td>number</td>
      <td>The hue, mapped to between 0 (0 degrees) and 255 (360 degrees).</td>
    </tr>
    <tr>
      <td>s</td>
      <td>number</td>
      <td>The saturation, mapped to between 0 (0%) and 255 (100%).</td>
    </tr>
    <tr>
      <td>a</td>
      <td>number</td>
      <td>The alpha, mapped to between 0 (0%) and 255 (100%).</td>
    </tr>
  </tbody>
</table>

_Returns:_ an `IWave` instance. Details can be found at [rvl-node-types](https://github.com/nebrius/rvl-node-types), but for all intents and purposes it can be treated as a black box.

### createColorCycleWave(brightness, rate, a)

This method creates a wave that cycles through colors over time.

From a technical perspective, it linearly varies the hue over time while keeping the saturation and value at 100%.

_Signature:_

```typescript
function createColorCycleWave(brightness: number, rate: number, a: number): IWave
```

_Arguments:_

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>brightness</td>
      <td>number</td>
      <td>The brightness of the wave, mapped to between 0 (0%) and 255 (100%).</td>
    </tr>
    <tr>
      <td>rate</td>
      <td>number</td>
      <td>The rate that the color changes, between 1 and 32. The higher the number, the faster the color changes</td>
    </tr>
    <tr>
      <td>a</td>
      <td>number</td>
      <td>The alpha, mapped to between 0 (0%) and 255 (100%).</td>
    </tr>
  </tbody>
</table>

_Returns:_ an `IWave` instance. Details can be found at [rvl-node-types](https://github.com/nebrius/rvl-node-types), but for all intents and purposes it can be treated as a black box.

### createMovingWave(brightness, h, s, rate, spacing)

This method creates a moving wave, with the alpha varying between 0% and 100% over distance, creating a "roving wave" effect.

From a technical perspective, it varies the alpha over distance, and varies the y-value of the start of wave with time.

_Signature:_

```typescript
function createMovingWave(brightness: number, h: number, s: number, rate: number, spacing: number): IWave
```

_Arguments:_

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>brightness</td>
      <td>number</td>
      <td>The brightness of the wave, mapped to between 0 (0%) and 255 (100%).</td>
    </tr>
    <tr>
      <td>h</td>
      <td>number</td>
      <td>The hue, mapped to between 0 (0 degrees) and 255 (360 degrees).</td>
    </tr>
    <tr>
      <td>s</td>
      <td>number</td>
      <td>The saturation, mapped to between 0 (0%) and 255 (100%).</td>
    </tr>
    <tr>
      <td>rate</td>
      <td>number</td>
      <td>The rate that the wave "moves", between 0 and 32. The higher the number, the faster the wave moves. Setting the rate to 0 means the wave does not move at all.</td>
    </tr>
    <tr>
      <td>spacing</td>
      <td>number</td>
      <td>The distance between "peaks" of the waves, between 1 and 16. The higher the number, the shorter the distance.</td>
    </tr>
  </tbody>
</table>

_Returns:_ an `IWave` instance. Details can be found at [rvl-node-types](https://github.com/nebrius/rvl-node-types), but for all intents and purposes it can be treated as a black box.

### createPulsingWave(brightness, h, s, rate)

This method creates a wave that pulses, aka it varies from fully transparent to fully opaque over time.

From a technical perspective, it varies the alpha over time with nothing else that varies.

_Signature:_

```typescript
function createPulsingWave(brightness: number, h: number, s: number, rate: number): IWave
```

_Arguments:_

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  <tbody>
    <tr>
      <td>brightness</td>
      <td>number</td>
      <td>The brightness of the wave, mapped to between 0 (0%) and 255 (100%).</td>
    </tr>
    <tr>
      <td>h</td>
      <td>number</td>
      <td>The hue, mapped to between 0 (0 degrees) and 255 (360 degrees).</td>
    </tr>
    <tr>
      <td>s</td>
      <td>number</td>
      <td>The saturation, mapped to between 0 (0%) and 255 (100%).</td>
    </tr>
    <tr>
      <td>rate</td>
      <td>number</td>
      <td>The rate that the wave "pulses", between 1 and 32. The higher the number, the faster the wave pulses.</td>
    </tr>
  </tbody>
</table>

_Returns:_ an `IWave` instance. Details can be found at [rvl-node-types](https://github.com/nebrius/rvl-node-types), but for all intents and purposes it can be treated as a black box.

### createRainbowWave(brightness, rate, a)

This method creates a wave that looks like a rainbow, and slowly moves.

From a technical perspective it varies the hue over distance, and varies the y-value of the start of wave with time.

_Signature:_

```typescript
function createRainbowWave(brightness: number, a: number, rate: number): IWave
```

_Arguments:_

<table>
  <thead>
    <tr>
      <th>Argument</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
  <tbody>
    <tr>
      <td>brightness</td>
      <td>number</td>
      <td>The brightness of the wave, mapped to between 0 (0%) and 255 (100%).</td>
    </tr>
    <tr>
      <td>a</td>
      <td>number</td>
      <td>The alpha, mapped to between 0 (0%) and 255 (100%).</td>
    </tr>
    <tr>
      <td>rate</td>
      <td>number</td>
      <td>The rate that the wave "pulses", between 1 and 32. The higher the number, the faster the wave pulses.</td>
    </tr>
  </tbody>
</table>

_Returns:_ an `IWave` instance. Details can be found at [rvl-node-types](https://github.com/nebrius/rvl-node-types), but for all intents and purposes it can be treated as a black box.

## Background

Note: you do not need to know this information to use this library at all. Some might find it interesting though.

 RVL-Node uses a rendering engine based on sin waves. RVL-Node layers four waves on top of each other to create interesting and aesthetically pleasing LED animations. Think of this like CSS layers. They can include transparency to create a layering effect.

All waves are defined in the HSV color space that has been mapped to 8-bit integers. A hue of 180 degrees is represented by the value `128`, a saturation of 25% is represented by the value `64`, and so on and so forth.

A wave is defined using the following mathematical formula:

```
ledChannelValue(t, x) = a * sin(w_t * t + w_x * x + phi) + b
```

This function takes 5 variables from the user (a, w_x, w_t, phi, b), and 2 from the engine (x, t). This allows someone to create a wave that can vary over time, over the length of the LED strip, can be constant, or any of the above. Each channel (hue, saturation, value, and alpha) have their own wave assigned to them. 4 channels per layer, times 4 layers, means 80 coefficients total!

# License

Copyright (c) Bryan Hughes <bryan@nebri.us>

This file is part of Raver Lights Node Animations.

Raver Lights Node Animations is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Raver Lights Node Animations is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Raver Lights Node Animations.  If not, see <http://www.gnu.org/licenses/>.
