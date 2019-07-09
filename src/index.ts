/*
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
*/

import { IWaveParameters, IWave } from 'rvl-node-types';
import clone from 'clone-deep';

const EMPTY_WAVE: IWave = {
  h: { a: 0, w_t: 0, w_x: 0, phi: 0, b: 0 },
  s: { a: 0, w_t: 0, w_x: 0, phi: 0, b: 0 },
  v: { a: 0, w_t: 0, w_x: 0, phi: 0, b: 0 },
  a: { a: 0, w_t: 0, w_x: 0, phi: 0, b: 0 }
};

export function createEmptyWave(): IWave {
  return clone(EMPTY_WAVE);
}

export function createWaveParameters(wave1?: IWave, wave2?: IWave, wave3?: IWave, wave4?: IWave): IWaveParameters {
  return {
    waves: [
      wave1 || createEmptyWave(),
      wave2 || createEmptyWave(),
      wave3 || createEmptyWave(),
      wave4 || createEmptyWave()
    ]
  };
}

function validateNum(num: number, min: number, max: number, name: string): void {
  if (typeof num !== 'number' || num < min || num > max) {
    throw new Error(`Invalid ${name} ${num}. ` +
      `${name[0].toUpperCase() + name.substring(1)} must be a number between ${min} and ${max}`);
  }
}

export function createSolidColorWave(brightness: number, h: number, s: number, a: number): IWave {
  validateNum(brightness, 0, 255, 'brightness');
  validateNum(h, 0, 255, 'hue');
  validateNum(s, 0, 255, 'saturation');
  validateNum(a, 0, 255, 'alpha');
  const wave = createEmptyWave();
  wave.h.b = Math.round(h);
  wave.s.b = Math.round(s);
  wave.v.b = Math.round(brightness);
  wave.a.b = Math.round(a);
  return wave;
}

export function createColorCycleWave(brightness: number, rate: number, a: number): IWave {
  validateNum(brightness, 0, 255, 'brightness');
  validateNum(rate, 1, 32, 'rate');
  validateNum(a, 0, 255, 'alpha');
  const wave = createEmptyWave();
  wave.h.a = 255;
  wave.h.w_t = Math.round(rate);
  wave.h.w_x = 0;
  wave.s.b = 255;
  wave.v.b = Math.round(brightness);
  wave.a.b = Math.round(a);
  return wave;
}

export function createMovingWave(brightness: number, h: number, s: number, rate: number, spacing: number): IWave {
  validateNum(brightness, 0, 255, 'brightness');
  validateNum(rate, 0, 32, 'rate');
  validateNum(spacing, 1, 16, 'spacing');
  validateNum(h, 0, 255, 'hue');
  validateNum(s, 0, 255, 'saturation');
  const wave = createEmptyWave();
  wave.h.b = Math.round(h);
  wave.s.b = Math.round(s);
  wave.v.b = Math.round(brightness);
  wave.a.a = 255;
  wave.a.w_t = Math.round(rate);
  wave.a.w_x = Math.round(spacing);
  return wave;
}

export function createPulsingWave(brightness: number, h: number, s: number, rate: number): IWave {
  validateNum(brightness, 0, 255, 'brightness');
  validateNum(rate, 1, 32, 'rate');
  validateNum(h, 0, 255, 'hue');
  validateNum(s, 0, 255, 'saturation');
  const wave = createEmptyWave();
  wave.h.b = Math.round(h);
  wave.s.b = Math.round(s);
  wave.v.b = Math.round(brightness);
  wave.a.w_t = Math.round(rate);
  wave.a.a = 255;
  return wave;
}

export function createRainbowWave(brightness: number, a: number, rate: number): IWave {
  validateNum(brightness, 0, 255, 'brightness');
  validateNum(rate, 1, 32, 'rate');
  validateNum(a, 0, 255, 'alpha');
  const wave = createEmptyWave();

  wave.h.a = 255;
  wave.h.w_t = Math.round(rate);
  wave.h.w_x = 2;
  wave.s.b = 255;
  wave.v.b = Math.round(brightness);
  wave.a.b = Math.round(a);
  return wave;
}
