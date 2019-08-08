import EventEmitter from "wolfy87-eventemitter";

const eventEmitter = new EventEmitter();

export default class EventManager {
    subscribe(eventId, cb) {
        eventEmitter.addListener(eventId, cb);
    }

    trigger(eventId, data) {
      const eventData = data || {};
      eventEmitter.emit(eventId, eventData);
    }

    unsubscribe(eventId, cb) {
        eventEmitter.removeListener(eventId, cb);
    }
}