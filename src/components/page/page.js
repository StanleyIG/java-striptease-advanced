import { DivComponent } from "../../common/div-component";
import "./page.css";

export class PageComponent extends DivComponent {
  constructor(state, onPageChange) {
    super();
    this.state = state;
    this.onPageChange = onPageChange;
  }

  render() {
    if (this.state.list.length == 0) {
      return this.el;
    }

    const hasPrevPage = this.state.offset > 0;
    const hasNextPage = this.state.offset + 10 < this.state.numFound;

    this.el.classList.add('page__wrapper');
    this.el.innerHTML = `
      <div class="page__switch prev-page ${!hasPrevPage ? 'disabled' : ''}">
        <img src="/static/arrow_back_left.svg" alt="предыдущая страница" />
        <div>Предыдущая страница</div>
      </div>
      <div class="page__switch next-page ${!hasNextPage ? 'disabled' : ''}">
        <div>Следующая страница</div>
        <img src="/static/arrow_back_right.svg" alt="Следующая страница" />
      </div>
    `;

    // Добавляем обработчики только если кнопки активны
    const prevButton = this.el.querySelector('.prev-page');
    const nextButton = this.el.querySelector('.next-page');

    prevButton.addEventListener('click', () => {
      if (hasPrevPage) {
        this.onPageChange(this.state.offset - 10);
      }
    });

    nextButton.addEventListener('click', () => {
      if (hasNextPage) {
        this.onPageChange(this.state.offset + 10);
      }
    });

    return this.el;
  }
}