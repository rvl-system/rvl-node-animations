import { IWaveParameters, IWave } from 'rvl-node-types';
export declare function createEmptyWave(): IWave;
export declare function createWaveParameters(wave1?: IWave, wave2?: IWave, wave3?: IWave, wave4?: IWave): IWaveParameters;
export declare function createSolidColorWave(h: number, s: number, v: number, a: number): IWave;
export declare function createColorCycleWave(rate: number, a: number): IWave;
