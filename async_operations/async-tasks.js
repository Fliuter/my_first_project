// ПР №13. JavaScript: асинхронные операции
"use strict";

const $ = (selector) => document.querySelector(selector);
const writeOutput = (selector, message) => {
  const element = $(selector);
  if (element) element.textContent = String(message);
};
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function createBasicPromise(shouldResolve = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => shouldResolve ? resolve("Успех!") : reject(new Error("Ошибка!")), 1000);
  });
}

function handleBasicPromise() {
  writeOutput("#promise-output", "Ожидание результата...");
  return createBasicPromise(true)
    .then(result => writeOutput("#promise-output", result))
    .catch(error => writeOutput("#promise-output", error.message));
}

function createPromiseChain() {
  writeOutput("#promise-output", "Запущена цепочка...");
  return wait(500).then(() => "Шаг 1")
    .then(value => { writeOutput("#promise-output", value); return wait(500).then(() => value + " → Шаг 2"); })
    .then(value => { writeOutput("#promise-output", value); return wait(500).then(() => value + " → Шаг 3"); })
    .then(value => writeOutput("#promise-output", value))
    .catch(error => writeOutput("#promise-output", `Ошибка: ${error.message}`));
}

function handlePromiseError() {
  writeOutput("#promise-output", "Проверка обработки ошибки...");
  return createBasicPromise(false)
    .then(result => writeOutput("#promise-output", result))
    .catch(error => writeOutput("#promise-output", `Ошибка обработана: ${error.message}`));
}

function setupPromiseEvents() {
  $("#basic-promise")?.addEventListener("click", handleBasicPromise);
  $("#promise-chain")?.addEventListener("click", createPromiseChain);
  $("#promise-error")?.addEventListener("click", handlePromiseError);
}

async function basicAsyncAwait() {
  writeOutput("#async-output", "Ожидание...");
  try {
    const result = await createBasicPromise(true);
    await wait(300);
    writeOutput("#async-output", `Результат после задержки: ${result}`);
    return result;
  } catch (error) {
    writeOutput("#async-output", error.message);
    throw error;
  }
}

async function handleAsyncError() {
  try {
    await createBasicPromise(false);
  } catch (error) {
    writeOutput("#async-output", `try/catch обработал ошибку: ${error.message}`);
    return error.message;
  }
}

async function parallelAsyncExecution() {
  const started = performance.now();
  const results = await Promise.all([wait(700).then(() => "Операция A"), wait(1000).then(() => "Операция B"), wait(500).then(() => "Операция C")]);
  const elapsed = Math.round(performance.now() - started);
  writeOutput("#async-output", `${results.join(", ")}\nОбщее время: ${elapsed} мс (операции выполнялись параллельно).`);
  return { results, elapsed };
}

function setupAsyncEvents() {
  $("#basic-async")?.addEventListener("click", () => basicAsyncAwait().catch(() => {}));
  $("#async-error")?.addEventListener("click", () => handleAsyncError());
  $("#async-parallel")?.addEventListener("click", () => parallelAsyncExecution().catch(error => writeOutput("#async-output", error.message)));
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  return response.json();
}

async function fetchUsers() {
  writeOutput("#api-output", "Загрузка пользователей...");
  $("#api-data").innerHTML = "";
  try {
    const users = await fetchJson("https://jsonplaceholder.typicode.com/users");
    const container = $("#api-data");
    users.forEach(user => {
      const card = document.createElement("article");
      card.className = "user-card";
      const title = document.createElement("h3");
      title.textContent = user.name;
      const email = document.createElement("p");
      email.textContent = user.email;
      const company = document.createElement("p");
      company.textContent = `Компания: ${user.company.name}`;
      card.append(title, email, company);
      container.append(card);
    });
    writeOutput("#api-output", `Загружено пользователей: ${users.length}`);
    return users;
  } catch (error) {
    writeOutput("#api-output", `Не удалось загрузить пользователей: ${error.message}`);
    return [];
  }
}

async function createPost() {
  const post = { title: "Практическая работа №13", body: "Пример отправки POST-запроса с помощью fetch.", userId: 1 };
  try {
    const result = await fetchJson("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(post)
    });
    writeOutput("#api-output", `POST выполнен:\n${JSON.stringify(result, null, 2)}`);
    return result;
  } catch (error) {
    writeOutput("#api-output", `Ошибка POST-запроса: ${error.message}`);
    return null;
  }
}

async function testApiError() {
  try {
    await fetchJson("https://jsonplaceholder.typicode.com/invalid-endpoint-for-pr13");
  } catch (error) {
    writeOutput("#api-output", `Ошибка API успешно обработана: ${error.message}`);
    return error;
  }
}

function setupApiEvents() {
  $("#fetch-users")?.addEventListener("click", fetchUsers);
  $("#fetch-post")?.addEventListener("click", createPost);
  $("#fetch-error")?.addEventListener("click", testApiError);
}

let intervalId = null;
let intervalCounter = 0;

async function startAsyncInterval() {
  if (intervalId !== null) return;
  intervalId = setInterval(async () => {
    await wait(0);
    intervalCounter += 1;
    writeOutput("#interval-output", `Счётчик: ${intervalCounter}`);
  }, 1000);
  writeOutput("#interval-output", "Счётчик запущен: 0");
}

function stopAsyncInterval() {
  if (intervalId !== null) clearInterval(intervalId);
  intervalId = null;
  intervalCounter = 0;
  writeOutput("#interval-output", "Счётчик остановлен и сброшен: 0");
}

function delayWithPromise(ms) {
  if (!Number.isFinite(ms) || ms < 0) return Promise.reject(new TypeError("Задержка должна быть неотрицательным числом."));
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testDelay() {
  writeOutput("#timer-output", "Начало последовательности...");
  for (let step = 1; step <= 3; step += 1) {
    await delayWithPromise(700);
    writeOutput("#timer-output", `Выполнен этап ${step} из 3`);
  }
  writeOutput("#timer-output", "Все задержки завершены.");
}

function setupTimerEvents() {
  $("#start-interval")?.addEventListener("click", startAsyncInterval);
  $("#stop-interval")?.addEventListener("click", stopAsyncInterval);
  $("#delay-promise")?.addEventListener("click", testDelay);
}

async function asyncTryCatch() {
  const messages = [];
  try {
    await createBasicPromise(true);
    messages.push("Первая операция выполнена.");
    try {
      await createBasicPromise(false);
    } catch (error) {
      messages.push(`Внутренняя ошибка обработана: ${error.message}`);
    }
  } catch (error) {
    messages.push(`Внешняя ошибка: ${error.message}`);
  }
  writeOutput("#error-output", messages.join("\n"));
  return messages;
}

async function handleMultipleErrors() {
  const tasks = [
    wait(200).then(() => "Загрузка профиля завершена"),
    wait(300).then(() => { throw new Error("Не удалось загрузить настройки"); }),
    wait(100).then(() => "Загрузка сообщений завершена")
  ];
  const results = await Promise.allSettled(tasks);
  const fulfilled = results.filter(item => item.status === "fulfilled").length;
  const rejected = results.length - fulfilled;
  writeOutput("#error-output", `Успешно: ${fulfilled}; с ошибкой: ${rejected}\n${results.map(item => item.status === "fulfilled" ? `✓ ${item.value}` : `✗ ${item.reason.message}`).join("\n")}`);
  return results;
}

async function retryWithBackoff(operation, maxRetries = 3) {
  if (typeof operation !== "function") throw new TypeError("operation должна быть функцией.");
  if (!Number.isInteger(maxRetries) || maxRetries < 0) throw new RangeError("maxRetries должен быть целым числом не меньше 0.");
  let attempt = 0;
  while (true) {
    try {
      return await operation(attempt);
    } catch (error) {
      if (attempt >= maxRetries) throw error;
      const delay = 250 * (2 ** attempt);
      writeOutput("#error-output", `Попытка ${attempt + 1} не удалась. Повтор через ${delay} мс...`);
      await wait(delay);
      attempt += 1;
    }
  }
}

async function testRetryPattern() {
  let calls = 0;
  try {
    const result = await retryWithBackoff(async () => {
      calls += 1;
      if (calls < 3) throw new Error("Временная ошибка");
      return "Операция выполнена на третьей попытке.";
    }, 3);
    writeOutput("#error-output", `${result}\nКоличество попыток: ${calls}`);
    return result;
  } catch (error) {
    writeOutput("#error-output", `Повторные попытки исчерпаны: ${error.message}`);
    return null;
  }
}

function setupErrorEvents() {
  $("#try-catch")?.addEventListener("click", asyncTryCatch);
  $("#multiple-errors")?.addEventListener("click", handleMultipleErrors);
  $("#retry-pattern")?.addEventListener("click", testRetryPattern);
}

async function demonstratePromiseAll() {
  const started = performance.now();
  const tasks = [400, 800, 250, 600, 500].map((ms, index) => wait(ms).then(() => `Задача ${index + 1}`));
  const results = await Promise.all(tasks);
  const elapsed = Math.round(performance.now() - started);
  writeOutput("#parallel-output", `${results.join("\n")}\nВремя выполнения: ${elapsed} мс`);
  return results;
}

async function demonstratePromiseRace() {
  const winner = await Promise.race([
    wait(700).then(() => "Первый вариант (700 мс)"),
    wait(250).then(() => "Победил второй вариант (250 мс)"),
    wait(500).then(() => "Третий вариант (500 мс)")
  ]);
  writeOutput("#parallel-output", `Promise.race вернул первый завершившийся результат:\n${winner}\nОстальные операции при этом автоматически не отменяются.`);
  return winner;
}

async function demonstratePromiseAllSettled() {
  const results = await Promise.allSettled([
    wait(200).then(() => "Успешная операция 1"),
    wait(300).then(() => { throw new Error("Ошибка операции 2"); }),
    wait(100).then(() => "Успешная операция 3")
  ]);
  const report = results.map((item, index) => item.status === "fulfilled"
    ? `${index + 1}. fulfilled: ${item.value}`
    : `${index + 1}. rejected: ${item.reason.message}`);
  writeOutput("#parallel-output", report.join("\n"));
  return results;
}

function setupParallelEvents() {
  $("#promise-all")?.addEventListener("click", demonstratePromiseAll);
  $("#promise-race")?.addEventListener("click", demonstratePromiseRace);
  $("#promise-allSettled")?.addEventListener("click", demonstratePromiseAllSettled);
}

async function sequentialApiRequests() {
  writeOutput("#scenario-output", "Выполняются последовательные запросы...");
  try {
    const user = await fetchJson("https://jsonplaceholder.typicode.com/users/1");
    const posts = await fetchJson(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    const comments = posts.length ? await fetchJson(`https://jsonplaceholder.typicode.com/posts/${posts[0].id}/comments`) : [];
    const summary = `Пользователь: ${user.name}\nПостов: ${posts.length}\nКомментариев к первому посту: ${comments.length}`;
    writeOutput("#scenario-output", summary);
    return { user, posts, comments };
  } catch (error) {
    writeOutput("#scenario-output", `Ошибка последовательного запроса: ${error.message}`);
    return null;
  }
}

async function simulateFileUpload() {
  const bar = $("#progress-bar");
  if (bar) bar.style.width = "0%";
  writeOutput("#scenario-output", "Загрузка файла: 0%");
  try {
    await new Promise((resolve, reject) => {
      let progress = 0;
      const timer = setInterval(() => {
        progress += 10;
        if (bar) bar.style.width = `${progress}%`;
        writeOutput("#scenario-output", `Загрузка файла: ${progress}%`);
        if (progress >= 100) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
      if (!bar) reject(new Error("Индикатор загрузки не найден."));
    });
    writeOutput("#scenario-output", "Загрузка успешно завершена.");
    return true;
  } catch (error) {
    writeOutput("#scenario-output", error.message);
    return false;
  }
}

function createRequestCache() {
  const cache = new Map();
  return async function cachedRequest(url) {
    if (typeof url !== "string" || !url.trim()) throw new TypeError("Укажите URL запроса.");
    if (cache.has(url)) return cache.get(url);
    const requestPromise = fetchJson(url);
    cache.set(url, requestPromise);
    try {
      return await requestPromise;
    } catch (error) {
      cache.delete(url);
      throw error;
    }
  };
}

async function testRequestCache() {
  const cachedRequest = createRequestCache();
  const url = "https://jsonplaceholder.typicode.com/users/1";
  try {
    const first = await cachedRequest(url);
    const second = await cachedRequest(url);
    writeOutput("#scenario-output", `Первый запрос: ${first.name}\nВторой запрос получен из кэша: ${second.name}\nДанные совпадают: ${first.id === second.id}`);
    return { first, second };
  } catch (error) {
    writeOutput("#scenario-output", `Ошибка кэширования: ${error.message}`);
    return null;
  }
}

function setupRealScenarioEvents() {
  $("#sequential-requests")?.addEventListener("click", sequentialApiRequests);
  $("#upload-simulation")?.addEventListener("click", simulateFileUpload);
  $("#cache-requests")?.addEventListener("click", testRequestCache);
}

function setupAllEvents() {
  setupPromiseEvents();
  setupAsyncEvents();
  setupApiEvents();
  setupTimerEvents();
  setupErrorEvents();
  setupParallelEvents();
  setupRealScenarioEvents();
}

document.addEventListener("DOMContentLoaded", setupAllEvents);
