const gamesel = document.getElementById('gameSelect')
const message = document.getElementById('message')
const borbutton = document.getElementById('borrowButton')
const retbutton = document.getElementById('returnButton')
const gamelist = document.getElementById('gameList')
const borname = document.getElementById('borrowerName')
const filter = document.getElementById('filter')
const hint = document.getElementById('hint');
const player = document.getElementById('player')
const game = document.getElementById('game')
const addbutton = document.getElementById('add')
let list = [
    { game: 'Каркассон', player: '4', name: null },
    { game: 'Доббль', player: '6', name: 'Анна' },
    { game: 'Шахматы', player: '2', name: null }
]
addbutton.addEventListener('click', () => {
    const mes = { game, player, name: null }
    mes.game = game.value
    mes.player = player.value
    list.push(mes)
    console.log(mes)
    render()
    renderoption()
})
borbutton.addEventListener('click', () => {
    const ind = Number(gamesel.value)
    if (list[ind].name != null) {
        message.textContent = 'Игра уже выдана'
        return
    }
    list[ind].name = borname.value
    const p = list[ind].game
    message.textContent = `Игра ${p} выдана ${borname.value}`
    render()
})
retbutton.addEventListener('click', () => {
    const ind = Number(gamesel.value)
    if (list[ind].name == null) {
        message.textContent = 'Игра свободна'
        return
    } const p = list[ind].game
    list[ind].name = null
    message.textContent = `Игра ${p} вернулась`
    render()
})
filter.addEventListener('change', () => {
    render()
});
function renderoption() {
    gamesel.textContent = ""
    list.forEach((el, i) => {
        const pull = document.createElement('option')
        pull.append(el.game)
        pull.value = i
        gamesel.append(pull)
    });
}
function render() {
    gamelist.textContent = ""
    list.forEach((el) => {
        const item = document.createElement('li')
        if (filter.checked) {
            if (el.name === null) {
                item.append(el.game + ' ', el.player + ' игрока(ов) ' + ' ', 'свободно')
                gamelist.append(item)
            }
        } else {
            if (el.name === null) {
                item.append(el.game + ' ', el.player + ' игрока(ов) ', 'свободно')
            } else {
                item.append(el.game + ' ', el.player + ' игрока(ов) ', 'взял(а) ' + el.name)
            }
            gamelist.append(item)
        }
        console.log(item)
    });
}
renderoption()
render()