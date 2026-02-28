import { MainView } from './views/main/main';

class App {
	routes = [
		{path: "", view: MainView }
	];
	appState = {
		favorites: []
	};

	constructor() {
		// Способ 1: Вызов через объект
		// app.route();  this = app ✅

		// Способ 2: Переменная с функцией
		// const func = app.route;
		// func();  this = window (потеряли контекст) ❌

		// Почему bind решает проблему:
		// const boundFunc = app.route.bind(app); // Создаем НОВУЮ функцию
		// boundFunc(); // this = app всегда ✅
		// bind "запоминает" внутри новой функции, что this должен быть app
		window.addEventListener('hashchange', this.route.bind(this));
		this.route();
	}

	route() {
		if (this.currentView) {
			this.currentView.destroy();
		}
		const view = this.routes.find(r => r.path == location.hash).view;
		this.currentView = new view(this.appState);
		this.currentView.render();
	}
}

new App();