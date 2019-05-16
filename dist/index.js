"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clone_deep_1 = __importDefault(require("clone-deep"));
const EMPTY_WAVE = {
    h: { a: 0, w_t: 0, w_x: 0, phi: 0, b: 0 },
    s: { a: 0, w_t: 0, w_x: 0, phi: 0, b: 0 },
    v: { a: 0, w_t: 0, w_x: 0, phi: 0, b: 0 },
    a: { a: 0, w_t: 0, w_x: 0, phi: 0, b: 0 }
};
function createEmptyWave() {
    return clone_deep_1.default(EMPTY_WAVE);
}
exports.createEmptyWave = createEmptyWave;
function createWaveParameters(wave1, wave2, wave3, wave4) {
    return {
        waves: [
            wave1 || createEmptyWave(),
            wave2 || createEmptyWave(),
            wave3 || createEmptyWave(),
            wave4 || createEmptyWave()
        ]
    };
}
exports.createWaveParameters = createWaveParameters;
function validateNum(num, min, max, name) {
    if (typeof num !== 'number' || num < min || num > max) {
        throw new Error(`Invalid ${name} ${num}. ` +
            `${name[0].toUpperCase() + name.substring(1)} must be a number between ${min} and ${max}`);
    }
}
function createSolidColorWave(h, s, v, a) {
    validateNum(h, 0, 255, 'hue');
    validateNum(s, 0, 255, 'saturation');
    validateNum(v, 0, 255, 'value');
    validateNum(a, 0, 255, 'alpha');
    const wave = createEmptyWave();
    wave.h.b = Math.round(h);
    wave.s.b = Math.round(s);
    wave.v.b = Math.round(v);
    wave.a.b = Math.round(a);
    return wave;
}
exports.createSolidColorWave = createSolidColorWave;
function createColorCycleWave(rate, a) {
    validateNum(rate, 1, 32, 'rate');
    validateNum(a, 0, 255, 'alpha');
    const wave = createEmptyWave();
    wave.h.a = 255;
    wave.h.w_t = Math.round(rate);
    wave.h.w_x = 0;
    wave.s.b = 255;
    wave.v.b = 255;
    wave.a.b = Math.round(a);
    return wave;
}
exports.createColorCycleWave = createColorCycleWave;
function createMovingWave(h, s, rate, spacing) {
    validateNum(rate, 1, 32, 'rate');
    validateNum(spacing, 1, 16, 'spacing');
    validateNum(h, 0, 255, 'hue');
    validateNum(s, 0, 255, 'saturation');
    const wave = createEmptyWave();
    wave.h.b = Math.round(h);
    wave.s.b = Math.round(s);
    wave.v.b = 255;
    wave.a.a = 255;
    wave.a.w_t = Math.round(rate);
    wave.a.w_x = Math.round(spacing);
    return wave;
}
exports.createMovingWave = createMovingWave;
function createPulsingWave(h, s, rate) {
    validateNum(rate, 1, 32, 'rate');
    validateNum(h, 0, 255, 'hue');
    validateNum(s, 0, 255, 'saturation');
    const wave = createEmptyWave();
    wave.h.b = Math.round(h);
    wave.s.b = Math.round(s);
    wave.v.a = 255;
    wave.v.w_t = Math.round(rate);
    wave.a.b = 255;
    return wave;
}
exports.createPulsingWave = createPulsingWave;
//# sourceMappingURL=index.js.map