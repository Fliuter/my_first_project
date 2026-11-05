// Практическая работа №10. JavaScript: работа с функциями

// 1. Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, number) => total + number, 0);
}

// 2. Деструктуризация параметров и значение по умолчанию
function createUser({ name, age, email = "не указан" }) {
    return `Пользователь: ${name}, возраст: ${age}, email: ${email}`;
}

// 3. Замыкание
function secretMessage(password, message) {
    return function (attempt) {
        return attempt === password ? message : "Доступ запрещен";
    };
}

// 4. Композиция функций: функции применяются справа налево
function compose(...functions) {
    return function (value) {
        return functions.reduceRight((result, fn) => fn(result), value);
    };
}

// 5. Собственная реализация map
function myMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (i in array) {
            result[i] = callback(array[i], i, array);
        }
    }
    return result;
}

// 6. Собственная реализация filter
function myFilter(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (i in array && callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}

// 7. Собственная реализация reduce
function myReduce(array, callback, initialValue) {
    if (array == null) {
        throw new TypeError("Ожидался массив");
    }

    const length = array.length;
    let i = 0;
    let accumulator;

    if (arguments.length >= 3) {
        accumulator = initialValue;
    } else {
        while (i < length && !(i in array)) i++;
        if (i >= length) {
            throw new TypeError("Нельзя выполнить reduce для пустого массива без initialValue");
        }
        accumulator = array[i++];
    }

    for (; i < length; i++) {
        if (i in array) {
            accumulator = callback(accumulator, array[i], i, array);
        }
    }
    return accumulator;
}

// 8. Каррирование
function curry(fn) {
    function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function (...nextArgs) {
            return curried.apply(this, args.concat(nextArgs));
        };
    }
    return curried;
}

// 9. Мемоизация
function memoize(fn) {
    const cache = new Map();
    return function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// 10. Debounce
function debounce(fn, delay) {
    let timerId;
    return function (...args) {
        const context = this;
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(context, args), delay);
    };
}

// 11. Throttle: первый вызов выполняется сразу, следующие — не чаще interval
function throttle(fn, interval) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= interval) {
            lastCall = now;
            return fn.apply(this, args);
        }
    };
}

// 12. Валидатор строки/пароля
// options: { minLength: number, requireDigit: boolean, requireUppercase: boolean }
function createValidator(options = {}) {
    const {
        minLength = 0,
        requireDigit = false,
        requireUppercase = false
    } = options;

    return function (value) {
        const text = String(value ?? "");
        return text.length >= minLength
            && (!requireDigit || /\d/.test(text))
            && (!requireUppercase || /[A-ZА-ЯЁ]/.test(text));
    };
}

// Экспорт для Node.js и автоматических тестов; в браузере функции доступны глобально.
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        sum, createUser, secretMessage, compose, myMap, myFilter,
        myReduce, curry, memoize, debounce, throttle, createValidator
    };
}
