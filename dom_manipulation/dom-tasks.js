"use strict";

// Задание 1. Создание и вставка элементов
function createCard(title, content) {
  const target = document.getElementById("target1");
  if (!target) return null;
  const card = document.createElement("div");
  card.className = "card";
  const heading = document.createElement("h4");
  heading.textContent = String(title);
  const paragraph = document.createElement("p");
  paragraph.textContent = String(content);
  card.append(heading, paragraph);
  target.append(card);
  return card;
}

function createList(items) {
  const target = document.getElementById("target1");
  if (!target || !Array.isArray(items)) return null;
  const list = document.createElement("ol");
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = String(item);
    list.append(li);
  });
  target.append(list);
  return list;
}

// Задание 2. Навигация по DOM
function countChildren() {
  const parent = document.getElementById("parent-element");
  return parent ? parent.children.length : 0;
}

function findSpecialChild() {
  const parent = document.getElementById("parent-element");
  const special = parent?.querySelector(".special");
  return special ? special.textContent.trim() : null;
}

function getParentBackground() {
  const child = document.querySelector("#parent-element .child");
  if (!child || !child.parentElement) return null;
  return getComputedStyle(child.parentElement).backgroundColor;
}

// Задание 3. Работа с классами и стилями
function setupStyleToggle() {
  const button = document.getElementById("toggle-style");
  const target = document.getElementById("style-target");
  if (!button || !target) return;
  button.addEventListener("click", () => target.classList.toggle("active-style"));
}

function changeHeaderColor() {
  const header = document.querySelector("header");
  if (!header) return null;
  const color = `hsl(${Math.floor(Math.random() * 360)}, 55%, 35%)`;
  header.style.backgroundColor = color;
  return color;
}

function animateElement() {
  const target = document.getElementById("style-target");
  if (!target) return;
  target.classList.remove("animated");
  // Перезапуск CSS-анимации
  void target.offsetWidth;
  target.classList.add("animated");
  window.setTimeout(() => target.classList.remove("animated"), 650);
}

// Задание 4. Обработка событий
function setupClickCounter() {
  const button = document.getElementById("click-btn");
  const output = document.getElementById("click-counter");
  if (!button || !output) return;
  let count = 0;
  button.addEventListener("click", () => {
    count += 1;
    output.textContent = String(count);
  });
}

function setupInputDisplay() {
  const input = document.getElementById("text-input");
  const output = document.getElementById("input-display");
  if (!input || !output) return;
  input.addEventListener("input", () => {
    output.textContent = input.value || "Поле ввода пустое";
  });
}

function setupKeyboardEvents() {
  document.addEventListener("keydown", event => {
    console.log("keydown:", event.code, event.key);
  });
  document.addEventListener("keyup", event => {
    console.log("keyup:", event.code, event.key);
  });
}

// Задание 5. Динамические списки
function addListItem() {
  const input = document.getElementById("item-input");
  const list = document.getElementById("dynamic-list");
  if (!input || !list) return null;
  const value = input.value.trim();
  if (!value) {
    input.focus();
    return null;
  }
  const li = document.createElement("li");
  li.className = "list-item";
  const text = document.createElement("span");
  text.textContent = value;
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "remove-item";
  removeButton.textContent = "Удалить";
  removeButton.setAttribute("aria-label", `Удалить пункт: ${value}`);
  li.append(text, removeButton);
  list.append(li);
  input.value = "";
  input.focus();
  return li;
}

function removeListItem(event) {
  const button = event.target.closest("button.remove-item");
  if (!button) return;
  const list = document.getElementById("dynamic-list");
  if (list && list.contains(button)) button.closest("li")?.remove();
}

function clearList() {
  const list = document.getElementById("dynamic-list");
  if (list) list.replaceChildren();
}

function setupListEvents() {
  const addButton = document.getElementById("add-item");
  const clearButton = document.getElementById("clear-list");
  const input = document.getElementById("item-input");
  const list = document.getElementById("dynamic-list");
  addButton?.addEventListener("click", addListItem);
  input?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      addListItem();
    }
  });
  clearButton?.addEventListener("click", clearList);
  list?.addEventListener("click", removeListItem); // делегирование событий
}

// Задание 6. Работа с формами
function validateForm(formData) {
  const data = formData instanceof FormData
    ? Object.fromEntries(formData.entries())
    : (formData || {});
  const errors = {};
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const ageText = String(data.age ?? "").trim();
  const age = Number(ageText);

  if (name.length < 2) errors.name = "Имя должно содержать минимум 2 символа.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Введите корректный email.";
  if (!ageText || !Number.isInteger(age) || age < 1 || age > 120) {
    errors.age = "Возраст должен быть целым числом от 1 до 120.";
  }
  return Object.keys(errors).length ? errors : null;
}

function displayFormErrors(errors) {
  const output = document.getElementById("form-output");
  if (!output) return;
  output.replaceChildren();
  const list = document.createElement("ul");
  list.className = "error-list";
  Object.values(errors || {}).forEach(message => {
    const li = document.createElement("li");
    li.textContent = message;
    list.append(li);
  });
  output.append(list);
}

function displayFormSuccess(userData) {
  const output = document.getElementById("form-output");
  if (!output) return;
  output.replaceChildren();
  const box = document.createElement("div");
  box.className = "success-message";
  const title = document.createElement("h3");
  title.textContent = "Форма успешно проверена!";
  const details = document.createElement("p");
  details.textContent = `Имя: ${userData.name}; Email: ${userData.email}; Возраст: ${userData.age}`;
  box.append(title, details);
  output.append(box);
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const errors = validateForm(data);
  if (errors) displayFormErrors(errors);
  else displayFormSuccess(data);
}

function setupForm() {
  document.getElementById("user-form")?.addEventListener("submit", handleFormSubmit);
}

// Инициализация интерфейса после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  setupStyleToggle();
  setupClickCounter();
  setupInputDisplay();
  setupKeyboardEvents();
  setupListEvents();
  setupForm();

  document.getElementById("create-card")?.addEventListener("click", () => {
    createCard("Карточка DOM", "Элемент создан с помощью createElement и добавлен в документ.");
  });
  document.getElementById("create-list")?.addEventListener("click", () => {
    createList(["Создание элемента", "Добавление в DOM", "Изменение содержимого"]);
  });
  document.getElementById("count-children")?.addEventListener("click", () => {
    document.getElementById("dom-info").textContent = `Дочерних элементов: ${countChildren()}`;
  });
  document.getElementById("find-special")?.addEventListener("click", () => {
    document.getElementById("dom-info").textContent = `Особый элемент: ${findSpecialChild() ?? "не найден"}`;
  });
  document.getElementById("parent-background")?.addEventListener("click", () => {
    document.getElementById("dom-info").textContent = `Фон родителя: ${getParentBackground() ?? "не найден"}`;
  });
  document.getElementById("random-header")?.addEventListener("click", changeHeaderColor);
  document.getElementById("animate-element")?.addEventListener("click", animateElement);
});
