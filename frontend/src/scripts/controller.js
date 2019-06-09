/**
 * Hello World Sift. Frontend controller entry point.
 */
import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';

export default class MyController extends SiftController {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    this._suHandler = this.onStorageUpdate.bind(this);
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftcontroller
  loadView(state) {
    console.log('hello-world: loadView', state);
    // Register for storage update events on the "x" bucket so we can update the UI
    this.storage.subscribe(['who'], this._suHandler);
    switch (state.type) {
      case 'email-thread':
        return {
          html: 'email-thread.html',
          data: {}
        };
      case 'summary':
        return {
          html: 'summary.html',
          data: this.getWebhook().then(d => ({
            name: 'no-one',
            webhook_uri: d
          }))
        };
      default:
        console.error('hello-world: unknown Sift type: ', state.type);
    }
  }

  // Event: storage update
  onStorageUpdate(value) {
    console.log('hello-world: onStorageUpdate: ', value);
    return this.getWho().then(xe => {
      // Publish events from 'x' to view
      this.publish('name', xe);
    });
  }

  getWebhook() {
    return this.storage.get({
      bucket: '_redsift',
      keys: ['webhooks/curl_input'],
    }).then((d) => d[0].value);
  }

  getWho() {
    return this.storage.getAll({
      bucket: 'who'
    }).then((values) => {
      console.log('hello-world: getWho returned:', values);
      return {
        name: values[0].value
      };
    });
  }

}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new MyController());
