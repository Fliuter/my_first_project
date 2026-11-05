// Автоматические тесты для ПР10
(function () {
    const tests = [];
    const add = (name, fn) => tests.push({ name, fn });
    const equal = (a, b) => {
        if (JSON.stringify(a) !== JSON.stringify(b)) {
            throw new Error(`Получено ${JSON.stringify(a)}, ожидалось ${JSON.stringify(b)}`);
        }
    };
    const throws = fn => {
        let didThrow = false;
        try { fn(); } catch (_) { didThrow = true; }
        if (!didThrow) throw new Error("Ожидалась ошибка");
    };

    add("sum: любое количество аргументов", () => equal(sum(1, 2, 3), 6));
    add("sum: пустой набор аргументов", () => equal(sum(), 0));
    add("createUser: email по умолчанию", () => equal(createUser({name:"Иван", age:18}), "Пользователь: Иван, возраст: 18, email: не указан"));
    add("createUser: email указан", () => equal(createUser({name:"Анна", age:20, email:"a@mail.ru"}), "Пользователь: Анна, возраст: 20, email: a@mail.ru"));
    add("secretMessage: правильный пароль", () => equal(secretMessage("123","Секрет")("123"), "Секрет"));
    add("secretMessage: неправильный пароль", () => equal(secretMessage("123","Секрет")("000"), "Доступ запрещен"));
    add("compose: применение справа налево", () => equal(compose(x => x + 3, x => x * 2)(4), 11));
    add("compose: без функций", () => equal(compose()(7), 7));
    add("myMap: преобразование", () => equal(myMap([1,2,3], x => x * 2), [2,4,6]));
    add("myMap: индекс элемента", () => equal(myMap(["a","b"], (x,i) => x+i), ["a0","b1"]));
    add("myFilter: фильтрация", () => equal(myFilter([1,2,3,4], x => x % 2 === 0), [2,4]));
    add("myFilter: пустой массив", () => equal(myFilter([], () => true), []));
    add("myReduce: с начальным значением", () => equal(myReduce([1,2,3], (a,b) => a+b, 10), 16));
    add("myReduce: без начального значения", () => equal(myReduce([1,2,3], (a,b) => a+b), 6));
    add("myReduce: пустой массив без начального значения", () => throws(() => myReduce([], (a,b) => a+b)));
    add("curry: по одному аргументу", () => equal(curry((a,b,c)=>a+b+c)(1)(2)(3), 6));
    add("curry: несколько аргументов за раз", () => equal(curry((a,b,c)=>a+b+c)(1,2)(3), 6));
    add("memoize: кэширует повторный вызов", () => {
        let calls = 0; const fn = memoize(x => { calls++; return x*x; });
        equal(fn(4),16); equal(fn(4),16); equal(calls,1);
    });
    add("createValidator: все условия выполнены", () => equal(createValidator({minLength:8,requireDigit:true,requireUppercase:true})("Password1"), true));
    add("createValidator: минимальная длина", () => equal(createValidator({minLength:8})("abc"), false));
    add("createValidator: обязательная цифра", () => equal(createValidator({requireDigit:true})("Password"), false));
    add("createValidator: заглавная буква", () => equal(createValidator({requireUppercase:true})("password"), false));

    async function run() {
        const output = document.getElementById("results");
        output.innerHTML = "";
        const results = [];
        for (const item of tests) {
            try { item.fn(); results.push({name:item.name, ok:true}); }
            catch (error) { results.push({name:item.name, ok:false, error:error.message}); }
        }
        // Таймерные тесты
        try {
            let count = 0;
            const debounced = debounce(() => count++, 35);
            debounced(); debounced(); debounced();
            await new Promise(resolve => setTimeout(resolve, 65));
            if (count !== 1) throw new Error("Debounce должен выполнить один вызов");
            results.push({name:"debounce: серия вызовов объединяется", ok:true});
        } catch (error) { results.push({name:"debounce: серия вызовов объединяется", ok:false, error:error.message}); }

        try {
            let count = 0;
            const throttled = throttle(() => count++, 1000);
            throttled(); throttled(); throttled();
            if (count !== 1) throw new Error("Throttle должен ограничить частоту вызовов");
            results.push({name:"throttle: частота вызовов ограничена", ok:true});
        } catch (error) { results.push({name:"throttle: частота вызовов ограничена", ok:false, error:error.message}); }

        const passed = results.filter(x => x.ok).length;
        output.innerHTML = `<h2>Результат: ${passed} из ${results.length} тестов пройдено</h2><ul>${
            results.map(x => `<li class="${x.ok ? "passed" : "failed"}">${x.ok ? "✓" : "✗"} ${x.name}${x.error ? `<br><small>${x.error}</small>` : ""}</li>`).join("")
        }</ul>`;
    }
    window.addEventListener("DOMContentLoaded", () => {
        document.getElementById("runButton").addEventListener("click", run);
    });
})();
