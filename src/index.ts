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

export function createSolidColorWave(h: number, s: number, v: number, a: number): IWave {
  if (typeof h !== 'number' || h < 0 || h > 255) {
    throw new Error(`Invalid hue ${h}. Hue must be a number between 0 and 255`);
  }
  if (typeof s !== 'number' || s < 0 || s > 255) {
    throw new Error(`Invalid saturation ${s}. Saturation must be a number between 0 and 255`);
  }
  if (typeof v !== 'number' || v < 0 || v > 255) {
    throw new Error(`Invalid value ${v}. Value must be a number between 0 and 255`);
  }
  if (typeof a !== 'number' || a < 0 || a > 255) {
    throw new Error(`Invalid alpha ${a}. Alpha must be a number between 0 and 255`);
  }
  const wave = createEmptyWave();
  wave.h.b = Math.round(h);
  wave.s.b = Math.round(s);
  wave.v.b = Math.round(v);
  wave.a.b = Math.round(a);
  return wave;
}

export function createColorCycleWave(rate: number, a: number) {
  if (typeof rate !== 'number' || rate < 1 || rate > 32) {
    throw new Error(`Invalid rate ${rate}. Rate must be a number between 1 and 32`);
  }
  if (typeof a !== 'number' || a < 0 || a > 255) {
    throw new Error(`Invalid alpha ${a}. Alpha must be a number between 0 and 255`);
  }
  const wave = createEmptyWave();
  wave.h.a = 255;
  wave.h.w_t = Math.round(rate);
  wave.h.w_x = 0;
  wave.s.b = 255;
  wave.v.b = 255;
  wave.a.b = Math.round(a);
  return wave;
}
