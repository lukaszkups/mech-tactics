export default class Engine {
  constructor (options) {
    this.wrapper = options.wrapper;
    this.levels = options.levels;
  }

  loadLevel (level) {

  }

  loadMainMenu (options) {
    this.render(options.contents, options.events);
  }

  render (contents, events) {
    const domElement = document.getElementById(this.wrapper);
    if (domElement) {
      domElement.innerHTML = contents;
      if (events) {
        setTimeout(() => {
          this.bindEvents(events);
        }, 0);
      }
    } else {
      throw new Error('There is no such wrapper element available');
    }
  }

  bindEvents (events) {
    events.map((ev) => {
      this.bindEvent(ev);
    });
  }

  bindEvent (event) {
    if (event.target) {
      if (typeof event.target === 'string') {
        const domElements = document.querySelectorAll(event.target);
        domElements.forEach((domElement) {
          domElement.addEventListener(event.type, event.callback);
        });
      } else if (event.target.hasOwnProperty('addEventListener')) {
        event.target.addEventListener(event.type, event.callback);
      }
    } else {
      throw new Error('Event needs to provide a target');
    }
  }

  unbindEvents (events) {
    events.map((ev) => {
      this.unbindEvent(ev);
    });
  }

  unbindEvent (event) {
    if (event.target) {
      if (typeof event.target === 'string') {
        const domElements = document.querySelectorAll(event.target);
        domElements.forEach((domElement) {
          domElement.removeEventListener(event.type, event.callback);
        });
      } else if (event.target.hasOwnProperty('removeEventListener')) {
        event.target.removeEventListener(event.type, event.callback);
      }
    } else {
      throw new Error('Event needs to provide a target');
    }
  }
}
