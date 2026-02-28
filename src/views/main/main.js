import { AbstractView } from "../../common/view.js";
import onChange from "on-change";

export class MainView extends AbstractView {
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    offset: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState; // this.appState = переданный appState
    // onChange - это библиотека, которая следит за изменениями объекта.
    // Она создает "обернутый" объект (прокси), который ловит любые изменения.
    // 1. Создаем слежку за this.appState
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    // 				                                         ↑
    //				                                      привязываем MainView
    // 2. Теперь this.appState - это не обычный объект,
    // а "прокси" (объект-обертка), который следит за изменениями

    // 3. Когда вы меняете любое свойство в this.appState:
    // this.appState.favorites = [...];  // какое-то изменение

    // 4. onChange перехватывает изменение и вызывает appStateHook с параметрами:
    //    - path: путь к измененному свойству ("favorites")
    //    - value: новое значение
    //    - previousValue: старое значение

    //////////////////////////////////////////////////////////////////////
    // Создаем стрелочную функцию на лету
    // this.appState = onChange(this.appState, (path) => {
    // this берется из окружающего контекста (конструктора)
    //   this.appStateHook(path, value, previousValue);
    // });

    // this.appState = onChange(this.appState, this.appStateHook);
    this.setTitle("Поиск книг");
  }

  //   appStateHook(path) {
  //     if (path === "favorites") {
  //       console.log(path);
  //     }
  //   }

  appStateHook(path, value) {
    if (path === "favorites") {
      console.log(path, value); // path: favorites value: ['d']
    }
  }

  //   Стрелочная функция автоматически привязывает this к экземпляру класса
  //   appStateHook = (path) => {
  //     // this всегда указывает на MainView
  //     console.log(this.state); // ✅ работает
  //   };

  render() {
    const main = document.createElement("div");
    main.innerHTML = `Число книг: ${this.appState.favorites.length}`;
    this.app.innerHTML = "";
    this.app.append(main);
    this.appState.favorites.push("d");
  }
}
