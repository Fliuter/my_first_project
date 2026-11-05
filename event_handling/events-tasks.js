"use strict";

// Общие вспомогательные функции
const getElement = (selector) => document.querySelector(selector);
const showText = (selector, text) => {
  const element = getElement(selector);
  if (element) element.textContent = text;
};

// Задание 1. Базовые обработчики событий
function handleBasicClick(event) {
  const button = event.currentTarget;
  showText("#basic-output",
    `Событие: ${event.type}\nКоординаты: X=${event.clientX}, Y=${event.clientY}\nЦель события: ${event.target.tagName}`);
  button.classList.remove("pulse");
  void button.offsetWidth;
  button.classList.add("pulse");
  setTimeout(() => button.classList.remove("pulse"), 500);
}

function handleMouseEvents(event) {
  const box = event.currentTarget;
  if (event.type === "mouseenter") box.style.backgroundColor = "#e74c3c";
  if (event.type === "mouseleave") box.style.backgroundColor = "#3498db";
  if (event.type === "mousemove") {
    showText("#mouse-output", `Координаты внутри блока: X=${event.offsetX}, Y=${event.offsetY}`);
  }
}

function setupBasicEvents() {
  getElement("#basic-btn")?.addEventListener("click", handleBasicClick);
  const box = getElement("#color-box");
  ["mouseenter", "mouseleave", "mousemove"].forEach(type =>
    box?.addEventListener(type, handleMouseEvents)
  );
}

// Задание 2. События клавиатуры
function handleKeyEvents(event) {
  const combinations = {
    "s": event.ctrlKey,
    "c": event.altKey,
    "a": event.shiftKey
  };
  const key = event.key.toLowerCase();
  let message = `Клавиша: ${event.key}\nКод: ${event.code}\nCtrl: ${event.ctrlKey}\nAlt: ${event.altKey}\nShift: ${event.shiftKey}`;

  if ((key === "s" && combinations.s) ||
      (key === "c" && combinations.c) ||
      (key === "a" && combinations.a)) {
    event.preventDefault();
    const combo = key === "s" ? "Ctrl+S" : key === "c" ? "Alt+C" : "Shift+A";
    message += `\nКомбинация ${combo} перехвачена. Стандартное действие отменено.`;
  }
  showText("#key-output", message);
}

function setupKeyboardEvents() {
  const input = getElement("#key-input");
  input?.addEventListener("keydown", handleKeyEvents);
  input?.addEventListener("keyup", event => {
    if (!event.key) showText("#key-output", "Клавиша отпущена.");
  });
}

// Задание 3. Делегирование событий
let nextItemId = 4;

function updateDelegationOutput() {
  const selected = [...document.querySelectorAll("#item-list .item.selected")]
    .map(item => item.querySelector("span")?.textContent || item.dataset.id);
  showText("#delegation-output",
    selected.length ? `Выбрано элементов: ${selected.length}\n${selected.join(", ")}` : "Нет выбранных элементов.");
}

function handleDelegationClick(event) {
  const deleteButton = event.target.closest(".delete");
  if (deleteButton && event.currentTarget.contains(deleteButton)) {
    deleteButton.closest(".item")?.remove();
    updateDelegationOutput();
    return;
  }
  const item = event.target.closest(".item");
  if (item && event.currentTarget.contains(item)) {
    item.classList.toggle("selected");
    updateDelegationOutput();
  }
}

function addNewItem() {
  const list = getElement("#item-list");
  if (!list) return;
  const item = document.createElement("li");
  item.className = "item";
  item.dataset.id = String(nextItemId);
  const label = document.createElement("span");
  label.textContent = `Элемент ${nextItemId}`;
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "delete";
  remove.textContent = "Удалить";
  item.append(label, remove);
  list.append(item);
  nextItemId += 1;
}

function setupDelegationEvents() {
  getElement("#item-list")?.addEventListener("click", handleDelegationClick);
  getElement("#add-item-btn")?.addEventListener("click", addNewItem);
}

// Задание 4. Предотвращение стандартного поведения
function preventLinkDefault(event) {
  event.preventDefault();
  showText("#prevention-output", "Переход по ссылке отменён методом preventDefault().");
  const link = event.currentTarget;
  link.classList.remove("shake");
  void link.offsetWidth;
  link.classList.add("shake");
}

function preventFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const value = form.elements.name.value.trim();
  if (!value) {
    showText("#prevention-output", "Ошибка: поле имени не должно быть пустым.");
    form.elements.name.focus();
    return;
  }
  showText("#prevention-output", `Форма обработана без перезагрузки страницы.\nИмя: ${value}`);
}

function setupPreventionEvents() {
  getElement("#prevent-link")?.addEventListener("click", preventLinkDefault);
  getElement("#prevent-form")?.addEventListener("submit", preventFormSubmit);
}

// Задание 5. Кастомные события
function triggerCustomEvent() {
  const customEvent = new CustomEvent("customAction", {
    detail: { message: "Привет от кастомного события!" },
    bubbles: true
  });
  document.dispatchEvent(customEvent);
}

function handleCustomEvent(event) {
  showText("#custom-output", event.detail?.message || "Получено кастомное событие.");
  const button = getElement("#trigger-custom");
  button?.classList.add("pulse");
  setTimeout(() => button?.classList.remove("pulse"), 500);
}

function setupMultipleListeners() {
  document.dispatchEvent(new CustomEvent("customAction", {
    detail: { message: "Событие обработано тремя слушателями." }
  }));
}

function setupCustomEvents() {
  document.addEventListener("customAction", handleCustomEvent);
  document.addEventListener("customAction", event => {
    console.log("Обработчик 1:", event.detail);
  });
  document.addEventListener("customAction", () => {
    console.log("Обработчик 2: событие получено.");
  });
  document.addEventListener("customAction", () => {
    showText("#custom-output", `${getElement("#custom-output").textContent}\nОбработчик 3 выполнен.`);
  });
  getElement("#trigger-custom")?.addEventListener("click", triggerCustomEvent);
  getElement("#multiple-listeners")?.addEventListener("click", setupMultipleListeners);
}

// Задание 6. События загрузки и ошибок
function loadImageWithEvents() {
  const container = getElement("#image-container");
  if (!container) return;
  container.replaceChildren();
  showText("#loading-output", "Начата загрузка изображения...");
  const image = document.createElement("img");
  image.alt = "Изображение, загруженное с Picsum";
  image.addEventListener("load", () => showText("#loading-output", "Изображение успешно загружено."));
  image.addEventListener("error", () => showText("#loading-output", "Не удалось загрузить изображение."));
  image.addEventListener("loadstart", () => showText("#loading-output", "Началась загрузка..."));
  image.addEventListener("loadend", () => console.log("Завершена попытка загрузки изображения."));
  image.src = "https://picsum.photos/300/200";
  container.append(image);
}

function simulateLoadError() {
  const image = new Image();
  image.addEventListener("error", () => showText("#loading-output", "Ошибка обработана: изображение не найдено или недоступно."));
  image.addEventListener("load", () => showText("#loading-output", "Неожиданно: тестовое изображение загрузилось."));
  image.src = "https://example.invalid/non-existent-image.jpg";
}

function setupLoadingEvents() {
  getElement("#load-image")?.addEventListener("click", loadImageWithEvents);
  getElement("#load-error")?.addEventListener("click", simulateLoadError);
}

// Задание 7. Таймеры и асинхронные события
let timerInterval = null;
let timerValue = 0;

function startTimer() {
  if (timerInterval !== null) return;
  timerInterval = setInterval(() => {
    timerValue += 1;
    showText("#timer-output", `${timerValue} сек.`);
  }, 1000);
}

function stopTimer() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerValue = 0;
  showText("#timer-output", "0 сек.");
}

function createDebounce(func, delay) {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}

function createThrottle(func, interval) {
  let lastCall = 0;
  let timeoutId = null;
  return function (...args) {
    const context = this;
    const now = Date.now();
    const remaining = interval - (now - lastCall);
    if (remaining <= 0) {
      clearTimeout(timeoutId);
      timeoutId = null;
      lastCall = now;
      func.apply(context, args);
    } else if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        func.apply(context, args);
      }, remaining);
    }
  };
}

function testDebounce() {
  const output = getElement("#async-output");
  if (!output) return;
  output.textContent = "Debounce: нажимай кнопку несколько раз — результат появится после паузы 600 мс.\n";
  const debounced = createDebounce(() => {
    output.textContent += "Debounce-вызов выполнен после паузы.\n";
  }, 600);
  debounced();
  debounced();
  debounced();
  output.textContent += "Выполнено 3 быстрых вызова, но отложенный вызов будет один.\n";
}

function testThrottle() {
  const output = getElement("#async-output");
  if (!output) return;
  let count = 0;
  output.textContent = "Throttle: серия вызовов ограничена интервалом 500 мс.\n";
  const throttled = createThrottle(() => {
    count += 1;
    output.textContent += `Throttle-вызов №${count}\n`;
  }, 500);
  for (let i = 0; i < 6; i += 1) throttled();
}

function setupTimerEvents() {
  getElement("#start-timer")?.addEventListener("click", startTimer);
  getElement("#stop-timer")?.addEventListener("click", stopTimer);
  getElement("#debounce-btn")?.addEventListener("click", testDebounce);
  getElement("#throttle-btn")?.addEventListener("click", testThrottle);
}

// Инициализация всех обработчиков после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  setupBasicEvents();
  setupKeyboardEvents();
  setupDelegationEvents();
  setupPreventionEvents();
  setupCustomEvents();
  setupLoadingEvents();
  setupTimerEvents();
});
