import Warrior from './characters/Warrior';
import Archer from './characters/Archer';

export function play(players) {
  let alivePlayers = players.filter((player) => !player.isDead());

  while (alivePlayers.length > 1) {
    alivePlayers.forEach((player) => player.turn(alivePlayers));
    alivePlayers = alivePlayers.filter((player) => !player.isDead());
  }

  return alivePlayers[0] || null;
}

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
