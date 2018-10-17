import { EventEmitter } from 'events';

export type Listener = (...args: any[]) => void;

export default class EventEmitterProxy {
  
  private listeners = new Map<string | symbol, Listener[]>();

  constructor(
    private target: EventEmitter) {
  }

  on(event: string | symbol, listener: Listener) {
    this.addListener(event, listener);
  }

  addListener(event: string | symbol, listener: Listener) {
    const listeners = this.listeners.get(event);
    if (listeners !== undefined) {
      listeners.push(listener);
    } else {
      this.listeners.set(event, [listener]);
    }
    this.target.addListener(event, listener);
  }

  removeListeners(event?: string | symbol) {
    if (event !== undefined) {
      const listeners = this.listeners.get(event);
      if (listeners !== undefined) {
        for (const listener of listeners) {
          this.target.removeListener(event, listener);
        }
      }
    } else {
      for (const [event, listeners] of this.listeners) {
        for (const listener of listeners) {
          this.target.removeListener(event, listener);
        }
      }
    }
  }

  removeAllListeners(event?: string | symbol) {
    this.removeListeners(event);
  }

}