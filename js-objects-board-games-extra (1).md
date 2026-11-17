# Прокат настольных игр. Дополнительные задания

Выполняйте эти задания после [основной работы](js-objects-board-games.md).

## Мини-лекция. Чекбокс

Чекбокс — поле с галочкой, которым можно включить или выключить настройку. В HTML его создаёт `<input type="checkbox">`. 

Для проверки галочки используйте `.checked`. Это логическое значение: `true`, когда галочка стоит, и `false`, когда её сняли. Свойство `.value` хранит значение поля и не показывает, стоит ли галочка.

Скопируйте пример в отдельный HTML-файл и откройте его в браузере. Событие `change` срабатывает каждый раз, когда вы ставите или снимаете галочку.

```html
<input type="checkbox" id="showHint">
<label for="showHint">Показать подсказку</label>
<p id="hint"></p>

<script>
  const showHint = document.getElementById('showHint');
  const hint = document.getElementById('hint');

  showHint.addEventListener('change', () => {
    if (showHint.checked) {
      hint.textContent = 'Нажмите «Вернуть», если игру принесли обратно.';
    } else {
      hint.textContent = '';
    }
  });
</script>
```

## Фильтр «Только свободные»

Добавьте над списком `<ul>` чекбокс «Только свободные». При событии `change` вызывайте `renderGames()`.

В `renderGames()` учитывайте состояние чекбокса. Если он отмечен, выводите только игры с `borrower === null`. Если свободных игр нет, покажите «Свободных игр пока нет».

В выпадающем списке оставьте все игры, чтобы сотрудник мог выбрать выданную игру и принять её обратно.

**Проверка.** Включите фильтр и выдайте «Каркассон». Он исчезнет из списка свободных. Выберите «Каркассон» в выпадающем списке и нажмите «Вернуть». Игра снова появится среди свободных.

## Добавление игры в каталог

Добавьте поля «Название игры» и «Число игроков» и кнопку «Добавить игру». Если название заполнено, а число игроков — положительное целое, создайте объект со свойствами `title`, `players` и `borrower`. Для новой игры запишите `borrower: null`. Добавьте объект через `games.push()` и обновите список на странице.

Теперь заполните `<select>` из того же массива. Уберите готовые `<option>` из HTML и напишите функцию `renderGameOptions()`. Перед перебором очистите `<select>`. Для каждой игры создайте `<option>` через `createElement()`, запишите её название в `textContent`, а индекс — в `value`. Вызовите эту функцию при открытии страницы и после добавления игры.

**Проверка.** Добавьте «Домино» на `4` игроков. Оно должно появиться среди свободных и в выпадающем списке. Выберите его, выдайте посетителю и примите обратно обычными кнопками.

const onlyFreeFilter = document.getElementById('onlyFreeFilter');
const gamesList = document.getElementById('gamesList');

// games — твой массив объектов с играми
function renderGames() {
  gamesList.innerHTML = ''; // очищаем список

  const showOnlyFree = onlyFreeFilter.checked;

  // фильтруем игры, если включён чекбокс
  const gamesToShow = showOnlyFree
    ? games.filter(game => game.borrower === null)
    : games;

  if (gamesToShow.length === 0) {
    gamesList.textContent = 'Свободных игр пока нет';
    return;
  }

  gamesToShow.forEach((game, index) => {
    const li = document.createElement('li');
    li.textContent = `${game.title} (${game.players} игроков)`;

    // Если игра выдана, можно показать, кому
    if (game.borrower !== null) {
      li.textContent += ` — выдана: ${game.borrower}`;
    } else {
      // Кнопки управления только для свободных игр
      const borrowBtn = document.createElement('button');
      borrowBtn.textContent = 'Выдать';
      borrowBtn.onclick = () => borrowGame(index);
      li.appendChild(borrowBtn);
    }

    gamesList.appendChild(li);
  });
}

// Навешиваем слушатель на чекбокс
onlyFreeFilter.addEventListener('change', renderGames);
