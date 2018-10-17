/// <reference types="node" />
import { EventEmitter } from 'events';
export declare type Listener = (...args: any[]) => void;
export default class EventEmitterProxy {
    private target;
    private listeners;
    constructor(target: EventEmitter);
    on(event: string | symbol, listener: Listener): void;
    addListener(event: string | symbol, listener: Listener): void;
    removeListeners(event?: string | symbol): void;
    removeAllListeners(event?: string | symbol): void;
}
