"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventEmitterProxy {
    constructor(target) {
        this.target = target;
        this.listeners = new Map();
    }
    on(event, listener) {
        this.addListener(event, listener);
    }
    addListener(event, listener) {
        const listeners = this.listeners.get(event);
        if (listeners !== undefined) {
            listeners.push(listener);
        }
        else {
            this.listeners.set(event, [listener]);
        }
        this.target.addListener(event, listener);
    }
    removeListeners(event) {
        if (event !== undefined) {
            const listeners = this.listeners.get(event);
            if (listeners !== undefined) {
                for (const listener of listeners) {
                    this.target.removeListener(event, listener);
                }
            }
        }
        else {
            for (const [event, listeners] of this.listeners) {
                for (const listener of listeners) {
                    this.target.removeListener(event, listener);
                }
            }
        }
    }
    removeAllListeners(event) {
        this.removeListeners(event);
    }
}
exports.default = EventEmitterProxy;
//# sourceMappingURL=EventEmitterProxy.js.map