import Weapon from '../weapons/Weapon';
import Arm from '../weapons/Arm';
import Bow from '../weapons/Bow';
import Knife from '../weapons/Knife';
import Sword from '../weapons/Sword';
import Staff from '../weapons/Staff';
import LongBow from '../weapons/LongBow';
import Axe from '../weapons/Axe';
import StormStaff from '../weapons/StormStaff';
import Player from '../characters/Player';
import Warrior from '../characters/Warrior';
import Archer from '../characters/Archer';
import Mage from '../characters/Mage';
import Dwarf from '../characters/Dwarf';
import Crossbowman from '../characters/Crossbowman';
import Demiurge from '../characters/Demiurge';
import { play } from '../game';

describe('Weapon and subclass behavior', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Arm has infinite durability and does not degrade', () => {
    const arm = new Arm();

    arm.takeDamage(1000);

    expect(arm.durability).toBe(Infinity);
    expect(arm.getDamage()).toBe(1);
  });

  test('Sword and Axe durability and properties are correct', () => {
    const sword = new Sword();
    const axe = new Axe();

    expect(sword.name).toBe('Меч');
    expect(sword.durability).toBe(500);
    expect(axe.name).toBe('Секира');
    expect(axe.durability).toBe(800);
  });

  test('LongBow overrides Bow attack and range', () => {
    const longBow = new LongBow();

    expect(longBow.name).toBe('Длинный лук');
    expect(longBow.attack).toBe(15);
    expect(longBow.range).toBe(4);
  });

  test('Weapon getDamage returns 0 when broken', () => {
    const knife = new Knife();

    knife.takeDamage(knife.durability + 1);

    expect(knife.getDamage()).toBe(0);
    expect(knife.isBroken()).toBe(true);
  });
});

describe('Player mechanics and special classes', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('getLuck uses Math.random and bounds result', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.5);
    const player = new Player(0, 'Тест');

    expect(player.getLuck()).toBeCloseTo(0.6);
  });

  test('Player getDamage handles zero distance as 1', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.5);
    const player = new Player(0, 'Тест');

    expect(player.getDamage(0)).toBeCloseTo(6.6, 1);
  });

  test('Archer getDamage handles zero distance as 1', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.5);
    const archer = new Archer(0, 'Лучник');

    expect(archer.getDamage(0)).toBeGreaterThan(0);
  });

  test('Warrior takes damage to magic if health below 50% and luck high', () => {
    const warrior = new Warrior(0, 'Воин');
    warrior.life = 50;
    jest.spyOn(warrior, 'getLuck').mockReturnValue(0.9);

    warrior.takeDamage(10);

    expect(warrior.magic).toBe(10);
    expect(warrior.life).toBe(50);
  });

  test('Mage halves damage while magic above 50 and reduces magic', () => {
    const mage = new Mage(0, 'Маг');

    mage.takeDamage(40);

    expect(mage.life).toBe(50);
    expect(mage.magic).toBe(88);
  });

  test('Dwarf reduces every sixth hit when luck is sufficient', () => {
    const dwarf = new Dwarf(0, 'Гном');
    jest.spyOn(dwarf, 'getLuck').mockReturnValue(0.6);

    for (let i = 0; i < 5; i += 1) {
      dwarf.takeDamage(10);
    }

    const lifeBefore = dwarf.life;
    dwarf.takeDamage(10);

    expect(dwarf.life).toBe(lifeBefore - 5);
  });

  test('Demiurge deals increased damage when luck threshold met', () => {
    const demiurge = new Demiurge(0, 'Демиург');
    jest.spyOn(demiurge, 'getLuck').mockReturnValue(0.7);

    const damage = demiurge.getDamage(1);

    expect(damage).toBeGreaterThan((demiurge.attack + demiurge.weapon.getDamage()));
  });

  test('Crossbowman starts with LongBow and enhanced stats', () => {
    const crossbowman = new Crossbowman(0, 'Арбалетчик');

    expect(crossbowman.description).toBe('Арбалетчик');
    expect(crossbowman.weapon.name).toBe('Длинный лук');
    expect(crossbowman.luck).toBe(15);
  });

  test('checkWeapon downgrades broken weapons to Knife then Arm', () => {
    const warrior = new Warrior(0, 'Воин');

    warrior.weapon.durability = 0;
    warrior.checkWeapon();
    expect(warrior.weapon.name).toBe('Нож');

    warrior.weapon.durability = 0;
    warrior.checkWeapon();
    expect(warrior.weapon.name).toBe('Рука');
  });

  test('tryAttack on same position moves enemy and doubles damage', () => {
    const player = new Player(0, 'Атакующий');
    const enemy = new Player(0, 'Цель');
    jest.spyOn(Math, 'random').mockReturnValue(0.2);

    player.tryAttack(enemy);

    expect(enemy.position).toBe(1);
    expect(enemy.life).toBeLessThan(100);
  });

  test('chooseEnemy selects the living opponent with minimum life', () => {
    const player = new Player(0, 'Игрок');
    const enemyA = new Player(1, 'Враг A');
    const enemyB = new Player(2, 'Враг B');

    enemyA.life = 20;
    enemyB.life = 10;
    enemyB.takeDamage(5);

    expect(player.chooseEnemy([player, enemyA, enemyB])).toBe(enemyB);
  });

  test('moveToEnemy moves within speed limitation', () => {
    const player = new Player(0, 'Игрок');
    const enemy = new Player(5, 'Враг');

    player.moveToEnemy(enemy);

    expect(player.position).toBe(1);
  });

  test('play selects a winner from a battle', () => {
    class TestWarrior extends Warrior {
      getLuck() {
        return 0.1;
      }
    }

    class TestArcher extends Archer {
      getLuck() {
        return 0.1;
      }
    }

    const warrior = new TestWarrior(0, 'Воин');
    const archer = new TestArcher(0, 'Лучник');
    const winner = play([warrior, archer]);

    expect(winner).toBeDefined();
    expect(winner.isDead()).toBe(false);
  });
});
