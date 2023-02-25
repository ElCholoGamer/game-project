import EventEmitter from 'node:events';

interface TypedEventEmitter<
	T extends Record<E, unknown[]>,
	E extends string = Extract<keyof T, string>
> {
	on(eventName: E, listener: (...args: T[E]) => void): this;
	addListener(eventName: E, listener: (...args: T[E]) => void): this;
	prependListener(eventName: E, listener: (...args: T[E]) => void): this;
	once(eventName: E, listener: (...args: T[E]) => void): this;
	prependOnceListener(eventName: E, listener: (...args: T[E]) => void): this;
	emit(eventName: E, ...args: T[E]): boolean;
	rawListeners(eventName: E): Function[];
	removeAllListeners(event?: E): this;
	removeListener(eventName: E, listener: (...args: T[E]) => void): this;
	off(eventName: E, listener: (...args: T[E]) => void): this;
	listenerCount(eventName: E): number;
	listeners(eventName: E): Function[];
}

class TypedEventEmitter<T extends Record<E, unknown[]>, E extends string> extends EventEmitter {}

export default TypedEventEmitter;
