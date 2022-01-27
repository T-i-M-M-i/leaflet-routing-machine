declare type EventMap = Record<string, unknown>;
declare type EventKey<T extends EventMap> = string & keyof T;
declare type EventReceiver<T> = (params: T) => void;
interface IEventHub<T extends EventMap> {
    on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
    off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
    trigger<K extends EventKey<T>>(eventName: K, params: T[K]): void;
}
export default class EventHub<T extends EventMap> implements IEventHub<T> {
    private readonly eventTarget;
    constructor();
    on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
    off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>): void;
    trigger<K extends EventKey<T>>(eventName: K, params?: T[K]): void;
    private customEventFunctionWrapper;
}
export {};
