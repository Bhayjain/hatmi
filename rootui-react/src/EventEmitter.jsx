class EventEmitter {
    constructor() {
      this.events = {};
    }
  
    subscribe(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
  
      return () => {
        this.events[eventName] = this.events[eventName].filter((eventCallback) => eventCallback !== callback);
      };
    }
  
    emit(eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach((callback) => callback(data));
      }
    }
  }
  
  const eventEmitter = new EventEmitter();
  
  export default eventEmitter;
  