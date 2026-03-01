import { DivComponent } from '../../common/div-component';
import { Card } from '../card/card';
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
			this.el.innerHTML = ''
            this.el.appendChild(new Loader('Ищем книги...').render());
			return this.el;
		}
		this.el.classList.add('card_list');
		this.el.innerHTML = `
			<h1>Найдено книг – ${this.parentState.numFound}</h1>
		`
		for (const card of this.parentState.list) {
			this.el.append(new Card(this.appState, card).render());
		}
		return this.el;
	}
}