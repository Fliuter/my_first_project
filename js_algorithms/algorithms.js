// Практическая работа №9. JavaScript: базовые алгоритмы

// Проверка простого числа.
// Временная сложность: O(√n), так как достаточно проверять делители до корня из n.
function isPrime(number) {
    if (!Number.isInteger(number) || number < 2) return false;
    if (number === 2) return true;
    if (number % 2 === 0) return false;

    for (let i = 3; i * i <= number; i += 2) {
        if (number % i === 0) return false;
    }
    return true;
}

// Факториал числа.
// Временная сложность: O(n).
function factorial(n) {
    if (!Number.isInteger(n) || n < 0) return null;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

// Первые n чисел Фибоначчи.
// Временная сложность: O(n).
function fibonacci(n) {
    if (!Number.isInteger(n) || n < 0) return [];
    const result = [];
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
        result.push(a);
        [a, b] = [b, a + b];
    }
    return result;
}

// Наибольший общий делитель (алгоритм Евклида).
// Временная сложность: O(log(min(a, b))).
function gcd(a, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b)) return null;
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const remainder = a % b;
        a = b;
        b = remainder;
    }
    return a;
}

// Проверка строки на палиндром. Пробелы и регистр не учитываются.
// Временная сложность: O(n).
function isPalindrome(str) {
    const normalized = String(str).toLowerCase().replace(/[\sё]/g, ch => ch === 'ё' ? 'е' : '');
    let left = 0, right = normalized.length - 1;
    while (left < right) {
        if (normalized[left] !== normalized[right]) return false;
        left++;
        right--;
    }
    return true;
}

// Подсчёт русских и английских гласных.
// Временная сложность: O(n).
function countVowels(str) {
    const vowels = 'аеёиоуыэюяaeiou';
    let count = 0;
    for (const char of String(str).toLowerCase()) {
        if (vowels.includes(char)) count++;
    }
    return count;
}

// Переворот строки без split/reverse/join.
// Временная сложность: O(n).
function reverseString(str) {
    let result = '';
    for (let i = String(str).length - 1; i >= 0; i--) {
        result += String(str)[i];
    }
    return result;
}

// Поиск самого длинного слова.
// Временная сложность: O(n).
function findLongestWord(sentence) {
    const words = String(sentence).match(/[A-Za-zА-Яа-яЁё0-9]+/g) || [];
    let longest = '';
    for (const word of words) {
        if (word.length > longest.length) longest = word;
    }
    return longest;
}

// Максимальный элемент массива без Math.max.
// Временная сложность: O(n).
function findMax(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

// Удаление дубликатов с сохранением порядка.
// Средняя временная сложность: O(n).
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

// Сортировка пузырьком.
// Временная сложность: O(n²) в худшем случае, O(n) в лучшем.
function bubbleSort(arr) {
    const result = arr.slice();
    for (let i = 0; i < result.length - 1; i++) {
        let swapped = false;
        for (let j = 0; j < result.length - 1 - i; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return result;
}

// Бинарный поиск в отсортированном массиве.
// Временная сложность: O(log n).
function binarySearch(sortedArr, target) {
    let left = 0, right = sortedArr.length - 1;
    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        if (sortedArr[middle] === target) return middle;
        if (sortedArr[middle] < target) left = middle + 1;
        else right = middle - 1;
    }
    return -1;
}

// Форматирование денежной суммы.
// Временная сложность: O(n), где n — длина строки результата.
function formatCurrency(amount, currency = '₽') {
    if (!Number.isFinite(Number(amount))) return 'Некорректная сумма';
    const formatted = Number(amount).toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formatted} ${currency}`;
}

// Простая проверка адреса электронной почты.
// Временная сложность: O(n).
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
}

// Генерация пароля с буквами обоих регистров, цифрами и спецсимволами.
// Временная сложность: O(n).
function generatePassword(length = 8) {
    if (!Number.isInteger(length) || length < 4) {
        throw new Error('Длина пароля должна быть целым числом не меньше 4');
    }
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const special = '!@#$%^&*()-_=+';
    const all = lower + upper + digits + special;
    const pick = chars => chars[Math.floor(Math.random() * chars.length)];

    const chars = [pick(lower), pick(upper), pick(digits), pick(special)];
    while (chars.length < length) chars.push(pick(all));

    // Перемешивание Фишера — Йетса.
    for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
}
