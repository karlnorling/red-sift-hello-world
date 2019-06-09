/**
 * Hello World Sift. Frontend view entry point.
 */
import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';

const dataKey = 'name';

export default class MyView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    this.controller.subscribe(dataKey, this.onHello.bind(this));

  }

  // for more info: http://docs.redsift.com/docs/client-code-siftview
  presentView(value) {
    console.log('hello-world: presentView: ', value);
    document.getElementById(dataKey).textContent = value.data[dataKey];
    const webhookUri = value.data['webhook_uri'];
    const webhookUriElement = document.getElementById('webhook_uri');
    webhookUriElement.getElementsByTagName('code')[0].textContent = `curl ${webhookUri}`;
    webhookUriElement.setAttribute('href', webhookUri);
  };

  willPresentView(value) {
    console.log('hello-world: willPresentView: ', value);
  };

  onHello(data) {
    console.log('tutorial-sift: onHello:', data);
    Object.keys(data).forEach((k) => {
      document.getElementById(k).textContent = data[k];
    });
  }
}

registerSiftView(new MyView(window));
