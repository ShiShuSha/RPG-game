import Arm from '../weapons/Arm';
import Knife from '../weapons/Knife';

export default class Player {
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.weapon = new Arm();

    this.position = position;
    this.name = name;
  }

  getLuck() {
    return (Math.random() * 100 + this.luck) / 100;
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }

    const effectiveDistance = distance <= 0 ? 1 : distance;

    return ((this.attack + this.weapon.getDamage()) * this.getLuck()) / effectiveDistance;
  }

  takeDamage(damage) {
    this.life = Math.max(this.life - damage, 0);
  }

  isDead() {
    return this.life === 0;
  }

  moveLeft(distance) {
    const moveDistance = Math.min(Math.abs(distance), this.speed);

    this.position -= moveDistance;
  }

  moveRight(distance) {
    const moveDistance = Math.min(distance, this.speed);

    this.position += moveDistance;
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(Math.abs(distance));
      return;
    }

    this.moveRight(distance);
  }

  isAttackBlocked() {
    return this.getLuck() > (100 - this.luck) / 100;
  }

  dodged() {
    return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
  }

  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      this.checkWeapon();
      return;
    }

    if (this.dodged()) {
      return;
    }

    this.takeDamage(damage);
  }

  checkWeapon() {
    if (!this.weapon.isBroken()) {
      return;
    }

    if (this.weapon.name !== 'Нож' && this.weapon.name !== 'Рука') {
      this.weapon = new Knife();
      return;
    }

    this.weapon = new Arm();
  }

  tryAttack(enemy) {
    const distance = Math.abs(this.position - enemy.position);

    if (distance > this.weapon.range) {
      return;
    }

    const damage = this.getDamage(distance);

    this.weapon.takeDamage(10 * this.getLuck());
    this.checkWeapon();

    if (distance === 0) {
      enemy.moveRight(1);
      enemy.takeAttack(damage * 2);
      return;
    }

    enemy.takeAttack(damage);
  }

  chooseEnemy(players) {
    return players
      .filter((player) => player !== this && !player.isDead())
      .sort((first, second) => first.life - second.life)[0];
  }

  moveToEnemy(enemy) {
    if (!enemy) {
      return;
    }

    if (enemy.position > this.position) {
      this.moveRight(enemy.position - this.position);
      return;
    }

    this.moveLeft(this.position - enemy.position);
  }

  turn(players) {
    if (this.isDead()) {
      return;
    }

    const enemy = this.chooseEnemy(players);

    if (!enemy) {
      return;
    }

    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
  }
}
