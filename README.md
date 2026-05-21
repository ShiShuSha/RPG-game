# RPG Game

Проект выполнялся в  VS code

## Установка

1. Скачайте проект.
2. Откройте терминал в папке проекта.
3. Установите зависимости:

```bash
npm install
```

## Запуск проекта

Для запуска локального сервера:

```bash
npm start
```

## Сборка

Для сборки скриптов в папку `dist`:

```bash
npm run build
```

## Тесты

Для запуска тестов Jest и проверки покрытия:

```bash
npm test
```

## Результаты:

Тесты:

```
npm test
```

File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                 
-----------------|---------|----------|---------|---------|-----------------------------------
All files        |   88.88 |    74.57 |   95.65 |   88.69 |                                   
 js              |   66.66 |       25 |      80 |   55.55 |                                   
  game.js        |   66.66 |       25 |      80 |   55.55 | 16-24                             
 js/characters   |   88.37 |    75.51 |   96.55 |   88.37 |                                   
  Archer.js      |     100 |       75 |     100 |     100 | 21                                
  Crossbowman.js |     100 |      100 |     100 |     100 |                                   
  Demiurge.js    |    90.9 |       75 |     100 |    90.9 | 23                                
  Dwarf.js       |     100 |      100 |     100 |     100 |                                   
  Mage.js        |   91.66 |       50 |     100 |   91.66 | 23                                
  Player.js      |   80.59 |       70 |   94.44 |   80.59 | 25,54-59,72-74,78,101,115,126,145 
  Warrior.js     |     100 |      100 |     100 |     100 |                                   
 js/weapons      |     100 |      100 |     100 |     100 |                                   
  Arm.js         |     100 |      100 |     100 |     100 |                                   
  Axe.js         |     100 |      100 |     100 |     100 |                                   
  Bow.js         |     100 |      100 |     100 |     100 |                                   
  Knife.js       |     100 |      100 |     100 |     100 |                                   
  Staff.js       |     100 |      100 |     100 |     100 |                                   
  StormStaff.js  |     100 |      100 |     100 |     100 |                                   
  Sword.js       |     100 |      100 |     100 |     100 |                                   
  Weapon.js      |     100 |      100 |     100 |     100 |                                   
-----------------|---------|----------|---------|---------|-----------------------------------

Test Suites: 2 passed, 2 total
Tests:       21 passed, 21 total
Snapshots:   0 total
Time:        0.764 s, estimated 1 s

## Реpультат игры:

```
npm start
```
Пример кода:

```
export default function startGame() {
  const players = [
    new Warrior(0, 'Алёша Попович'),
    new Archer(4, 'Леголас'),
  ];

  const winner = play(players);

  if (winner) {
    console.log(`Победитель: ${winner.name}`);
  }
}
```

<img width="2560" height="1440" alt="image" src="https://github.com/user-attachments/assets/86678f5a-8f1a-4bfe-a4d0-80b31998e218" />
