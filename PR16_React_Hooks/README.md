# Практическая работа №16 — React: использование хуков

## Состав проекта
- `src/components/BasicHooks.js` — useState и useEffect: счётчик, форма, список задач, таймер, размер окна, загрузка данных.
- `src/components/AdvancedHooks.js` — useReducer, useContext, useCallback, useMemo и useRef.
- `src/components/CustomHooks.js` — useLocalStorage, useFetch, useToggle, useDebounce и useWindowSize.
- `src/components/HooksTests.js` — простые проверки наличия демонстрационных компонентов.
- `src/App.js` — главный компонент приложения.
- `src/index.js` — точка входа React.
- `answers.md` — ответы на 10 вопросов.

## Запуск
1. Установите Node.js LTS.
2. Откройте терминал в папке проекта.
3. Выполните `npm install`.
4. Выполните `npm start`.
5. Приложение откроется в браузере по адресу `http://localhost:3000`.

Для production-сборки выполните `npm run build`.

Данные пользователя из примера `useLocalStorage` сохраняются в localStorage текущего браузера. Запросы к JSONPlaceholder требуют подключения к интернету.
