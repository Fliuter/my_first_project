// Автоматические проверки функций из algorithms.js
// Откройте index.html в браузере и нажмите «Запустить тесты».

function runTests() {
    const tests = [
        ['isPrime: простое число', () => isPrime(7) === true],
        ['isPrime: составное число', () => isPrime(9) === false],
        ['isPrime: число меньше двух', () => isPrime(1) === false],
        ['factorial: 5! = 120', () => factorial(5) === 120],
        ['factorial: 0! = 1', () => factorial(0) === 1],
        ['fibonacci: первые 6 чисел', () => JSON.stringify(fibonacci(6)) === '[0,1,1,2,3,5]'],
        ['gcd: НОД 24 и 18', () => gcd(24, 18) === 6],
        ['isPalindrome: русская фраза', () => isPalindrome('А роза упала на лапу Азора') === true],
        ['countVowels: гласные', () => countVowels('Привет') === 2],
        ['reverseString: переворот', () => reverseString('hello') === 'olleh'],
        ['findLongestWord: длинное слово', () => findLongestWord('Я изучаю программирование') === 'программирование'],
        ['findMax: максимум', () => findMax([1, 9, 3]) === 9],
        ['removeDuplicates: удаление повторов', () => JSON.stringify(removeDuplicates([1,2,2,3])) === '[1,2,3]'],
        ['bubbleSort: сортировка', () => JSON.stringify(bubbleSort([5,1,4,2])) === '[1,2,4,5]'],
        ['binarySearch: найден элемент', () => binarySearch([1,3,5,7], 5) === 2],
        ['binarySearch: элемент не найден', () => binarySearch([1,3,5,7], 4) === -1],
        ['formatCurrency: формат суммы', () => formatCurrency(1234.56) === '1 234.56 ₽'],
        ['isValidEmail: корректный email', () => isValidEmail('test@example.com') === true],
        ['isValidEmail: некорректный email', () => isValidEmail('test@') === false],
        ['generatePassword: длина', () => generatePassword(12).length === 12]
    ];

    const output = document.getElementById('test-results');
    let passed = 0;
    output.innerHTML = '';
    for (const [name, test] of tests) {
        let success = false;
        try { success = test(); } catch (error) { success = false; }
        if (success) passed++;
        const item = document.createElement('li');
        item.textContent = `${success ? '✓' : '✗'} ${name}`;
        item.className = success ? 'passed' : 'failed';
        output.appendChild(item);
    }
    document.getElementById('summary').textContent =
        `Пройдено тестов: ${passed} из ${tests.length}`;
}
