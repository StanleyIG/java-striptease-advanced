import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";
import { Loader } from "../loader/loader";
import { PageComponent } from "../page/page";
import "./card-list.css";

export class CardList extends DivComponent {
  constructor(appState, parentState, onPageChange) {
    super();
    this.appState = appState;
    this.parentState = parentState;
    this.onPageChange = onPageChange;
  }

  render() {
    if (this.parentState.loading) {
      this.el.innerHTML = "";
      this.el.appendChild(new Loader("Ищем книги...").render());
      return this.el;
    }

    const cardGrid = document.createElement("div");
    cardGrid.classList.add("card_grid");
    this.el.append(cardGrid);

    for (const card of this.parentState.list) {
      cardGrid.append(new Card(this.appState, card).render());
    }

    this.el.append(
      new PageComponent(this.parentState, this.onPageChange).render(),
    );
    return this.el;
  }
}
