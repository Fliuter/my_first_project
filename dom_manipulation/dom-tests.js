// Простые автоматические тесты для основных функций.
// Откройте index.html, затем подключите этот файл через DevTools Console:
// const s = document.createElement('script'); s.src = 'dom-tests.js'; document.body.append(s);

(function runDOMTests() {
  const results = [];
  function test(name, callback) {
    try {
      const passed = callback() === true;
      results.push({ test: name, result: passed ? "PASS" : "FAIL" });
    } catch (error) {
      results.push({ test: name, result: "ERROR", details: error.message });
    }
  }

  test("countChildren возвращает число дочерних элементов", () =>
    countChildren() === document.getElementById("parent-element").children.length);

  test("findSpecialChild находит особый элемент", () =>
    findSpecialChild() === "Особый элемент");

  test("getParentBackground возвращает строку цвета", () =>
    typeof getParentBackground() === "string");

  test("createCard создаёт карточку", () => {
    const before = document.querySelectorAll("#target1 .card").length;
    createCard("Тест", "Содержимое");
    return document.querySelectorAll("#target1 .card").length === before + 1;
  });

  test("createList создаёт список из массива", () => {
    const list = createList(["А", "Б", "В"]);
    return !!list && list.children.length === 3;
  });

  test("validateForm отклоняет некорректные данные", () =>
    validateForm({ name: "А", email: "ошибка", age: "0" }) !== null);

  test("validateForm принимает корректные данные", () =>
    validateForm({ name: "Иван", email: "ivan@example.com", age: "18" }) === null);

  test("validateForm проверяет верхнюю границу возраста", () =>
    validateForm({ name: "Иван", email: "ivan@example.com", age: "121" }) !== null);

  console.table(results);
  const failed = results.filter(item => item.result !== "PASS").length;
  console.log(`Итог: ${results.length - failed}/${results.length} тестов пройдено.`);
})();
