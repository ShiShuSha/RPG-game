import Weapon from '../weapons/Weapon';
import Bow from '../weapons/Bow';
import Warrior from '../characters/Warrior';
import Archer from '../characters/Archer';

describe('Weapon', () => {
  test('takeDamage works correctly', () => {
    const weapon = new Weapon('Тест', 10, 100, 1);

    weapon.takeDamage(30);

    expect(weapon.durability).toBe(70);
  });

  test('getDamage returns half attack when durability is low', () => {
    const bow = new Bow();

    bow.takeDamage(150);

    expect(bow.getDamage()).toBe(5);
  });
});

describe('Player mechanics', () => {
  test('warrior can move', () => {
    const warrior = new Warrior(5, 'Воин');

    warrior.moveRight(5);

    expect(warrior.position).toBe(7);
  });

  test('archer attacks on distance', () => {
    const archer = new Archer(0, 'Лучник');

    expect(archer.getDamage(10)).toBe(0);
  });
});
