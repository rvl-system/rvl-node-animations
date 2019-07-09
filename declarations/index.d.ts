import { IWaveParameters, IWave } from 'rvl-node-types';
export declare function createEmptyWave(): IWave;
export declare function createWaveParameters(wave1?: IWave, wave2?: IWave, wave3?: IWave, wave4?: IWave): IWaveParameters;
export declare function createSolidColorWave(brightness: number, h: number, s: number, a: number): IWave;
export declare function createColorCycleWave(brightness: number, rate: number, a: number): IWave;
export declare function createMovingWave(brightness: number, h: number, s: number, rate: number, spacing: number): IWave;
export declare function createPulsingWave(brightness: number, h: number, s: number, rate: number): IWave;
export declare function createRainbowWave(brightness: number, a: number, rate: number): IWave;
