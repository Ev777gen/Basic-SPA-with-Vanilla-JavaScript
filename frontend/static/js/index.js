import Home from "./views/Home.js";
import Posts from "./views/Posts.js";
import PostView from "./views/PostView.js";
import Settings from "./views/Settings.js";

// Создаем асинхронную функцию router
const router = async () => {
  const routes = [
    { path: '/', view: Home },
    { path: '/posts', view: Posts },
    { path: '/posts/:id', view: PostView },
    { path: '/settings', view: Settings },
  ];

  // Добавляем маршрутам свойство params
  const potentialMatches = routes.map(route => {
    // Выделяем значения параметров из URL-пути браузера:
    // Для маршрута { path: '/posts/:id', view: Posts }
    // при URL-адресе http://localhost:8080/posts/1
    // match.result будет равен [ "/posts/1", "1" ]
    // Убираем первый элемент массива с помощью .slice(1) 
    const params = location.pathname.match(pathToRegex(route.path));
    return {
      ...route,
      params: params ? params.slice(1) : null
    };
  });
  
  // Ищем среди них текущую страницу 
  let currentRoute = potentialMatches.find(potentialMatch => potentialMatch.params !== null);

  // Если страницы с таким URL-адресом нет в routes, выдаем домашнюю страницу
  if (!currentRoute) {
    currentRoute = {
      ...routes[0],
      params: [location.pathname]
    }
  }

  // Создаем новый экземпляр страницы (т.е. объект)
  const view = new currentRoute.view(getParams(currentRoute));
  
  // И вставляем содержимое этой страницы в приложение
  document.querySelector('#app').innerHTML = await view.getHtml();
};

// Преобразуем URL-путь '/posts/1' в регулярное выражение /^\/posts\/(.+)$/
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// Возвращаем объект, в котором:
// ключи - это названия параметров в свойстве path массива routes, 
// а значения - это соответствующие им значения в URL-пути браузера
const getParams = currentRoute => {
  // Значения параметров из URL-пути браузера:
  const values = currentRoute.params;
  
  // Определяем названия ключей для полученных значений
  // Метод .matchAll - возвращает итератор (RegExp String Iterator {}). 
  // Делаем из него массив с помощью Array.from() 
  // и получаем массив массивов: [ [ ":id", "id" ] ]
  // С помощью .map из каждого вложенного массива берем
  // только элемент под индексом 1 (в нашем случае это будет "id")
  const keys = Array.from(currentRoute.path.matchAll(/:(\w+)/g)).map(params => params[1]);
  
  // Теперь собирем из ключей и значений объект и возвращаем его
  return Object.fromEntries(keys.map((key, i) => {
    return [key, values[i]];
  }));
};

// Используем History API
const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

// Запускаем функцию router когда документ загружен
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    // Запускаем функцию navigateTo только для ссылок с атрибутом data-link
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href)
    }
  });
  
  router();
});

// Запускаем router для отрисовки страницы при переходе вперед/назад по истории в браузере 
window.addEventListener('popstate', router);