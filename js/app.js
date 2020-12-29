import '../css/app.scss';

import Loading from './modules/Loading';

class App {
  constructor() {
      new Loading();
  }
}

document.addEventListener('DOMContentLoaded', new App);