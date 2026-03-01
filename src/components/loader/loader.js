import { DivComponent } from '../../common/div-component';
import './loader.css';

export class Loader extends DivComponent {
  constructor(text = 'Загрузка...') {
    super();
    this.text = text;
  }

  render() {
    this.el.classList.add('loader_container');
    this.el.innerHTML = `
      <div class="loader_wrapper">
        <div class="loader_spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span class="loader_text">${this.text}</span>
      </div>
    `;
    return this.el;
  }
}