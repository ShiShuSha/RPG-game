import Player from './Player';
import Bow from '../weapons/Bow';

export default class Archer extends Player {
  constructor(position, name) {
    super(position, name);

    this.life = 80;
    this.magic = 35;
    this.attack = 5;
    this.agility = 10;
    this.description = 'Лучник';
    this.weapon = new Bow();
  }

  getDamage(distance) {
    if (distance > this.weapon.range) {
      return 0;
    }

    const effectiveDistance = distance <= 0 ? 1 : distance;

    return ((this.attack + this.weapon.getDamage())
      * this.getLuck()
      * effectiveDistance)
      / this.weapon.range;
  }
}
