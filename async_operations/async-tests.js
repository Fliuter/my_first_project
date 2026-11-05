// Простые автоматические тесты для ПР №13
"use strict";

async function runAsyncTests() {
  const results = [];
  const assert = (condition, name) => results.push({ name, passed: Boolean(condition) });
  const expectReject = async (promise) => {
    try { await promise; return false; } catch (_) { return true; }
  };

  try {
    assert(typeof createBasicPromise === "function", "createBasicPromise существует");
    assert(await createBasicPromise(true) === "Успех!", "Промис успешно завершается");
    assert(await expectReject(createBasicPromise(false)), "Промис корректно отклоняется");
    assert(await delayWithPromise(1) === undefined, "delayWithPromise завершается");
    assert(await expectReject(delayWithPromise(-1)), "Отрицательная задержка отклоняется");
    assert(typeof createRequestCache === "function", "createRequestCache существует");
    assert(typeof retryWithBackoff === "function", "retryWithBackoff существует");

    let attempts = 0;
    const retryResult = await retryWithBackoff(async () => {
      attempts += 1;
      if (attempts < 2) throw new Error("Повтор");
      return "готово";
    }, 2);
    assert(retryResult === "готово" && attempts === 2, "Повторная попытка выполняется после ошибки");

    const all = await Promise.all([Promise.resolve(1), Promise.resolve(2)]);
    assert(all.length === 2 && all[0] === 1, "Promise.all возвращает результаты в исходном порядке");

    const settled = await Promise.allSettled([Promise.resolve("ok"), Promise.reject(new Error("fail"))]);
    assert(settled[0].status === "fulfilled" && settled[1].status === "rejected", "Promise.allSettled сохраняет оба статуса");

    const race = await Promise.race([wait(5).then(() => "first"), wait(30).then(() => "second")]);
    assert(race === "first", "Promise.race возвращает первый результат");

    assert(await expectReject(retryWithBackoff(async () => { throw new Error("Всегда ошибка"); }, 1)), "После лимита попыток ошибка возвращается");
    assert(await expectReject(retryWithBackoff("не функция", 1)), "Проверяется тип operation");
    assert(await expectReject(retryWithBackoff(async () => "ok", -1)), "Проверяется значение maxRetries");
  } catch (error) {
    results.push({ name: `Неожиданная ошибка тестирования: ${error.message}`, passed: false });
  }

  const passed = results.filter(item => item.passed).length;
  const failed = results.length - passed;
  const report = results.map(item => `${item.passed ? "✓" : "✗"} ${item.name}`).join("\n");
  const summary = `Результат: ${passed}/${results.length} успешно, ошибок: ${failed}\n\n${report}`;
  const output = document.querySelector("#test-output");
  if (output) output.textContent = summary;
  return { passed, failed, results };
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#run-tests")?.addEventListener("click", runAsyncTests);
});
