import { DivComponent } from '../../common/div-component';
import { Loader } from '../loader/loader';
import './card-list.css';

export class CardList extends DivComponent {
  constructor(appState, parentState) {
    super();
    this.appState = appState;
    this.parentState = parentState;
  }

  render() {
    if (this.parentState.loading) {
      this.el.innerHTML = '';
      this.el.appendChild(new Loader('Ищем книги...').render());
      return this.el;
    }
    
    this.el.classList.add('card_list');
    this.el.innerHTML = `
      <h1>Найдено книг – ${this.parentState.list.length}</h1>
    `;
    return this.el;
  }
}