// Простые автоматические проверки ключевых функций.
// Результаты можно посмотреть в консоли браузера (F12 -> Console).
document.addEventListener("DOMContentLoaded", () => {
  const checks = [];
  const assert = (name, condition) => checks.push({ name, passed: Boolean(condition) });

  assert("На странице есть кнопка базового события", Boolean(document.querySelector("#basic-btn")));
  assert("На странице есть поле клавиатуры", Boolean(document.querySelector("#key-input")));
  assert("На странице есть список для делегирования", Boolean(document.querySelector("#item-list")));
  assert("На странице есть форма", Boolean(document.querySelector("#prevent-form")));
  assert("На странице есть область кастомных событий", Boolean(document.querySelector("#custom-output")));

  if (typeof createDebounce === "function") {
    let calls = 0;
    const debounced = createDebounce(() => { calls += 1; }, 20);
    debounced();
    debounced();
    debounced();
    setTimeout(() => {
      assert("Debounce объединяет быстрые вызовы в один", calls === 1);
      printResults();
    }, 50);
  } else {
    assert("Функция createDebounce существует", false);
    printResults();
  }

  function printResults() {
    console.table(checks);
    const failed = checks.filter(check => !check.passed);
    console.log(`Проверки завершены: ${checks.length - failed.length}/${checks.length} успешно.`);
    if (failed.length) console.warn("Проверки с ошибками:", failed);
  }
});
