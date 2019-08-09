import EventEmitter from "wolfy87-eventemitter";

const eventEmitter = new EventEmitter();

export function subscribe(eventId, cb) {
    eventEmitter.addListener(eventId, cb);
}

export function trigger(eventId, data) {
    const eventData = data || {};
    eventEmitter.emit(eventId, eventData);
}