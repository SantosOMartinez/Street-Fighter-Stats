declare global {
	interface Number {
		clamp: (min: number, max: number) => number;
	}
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function (min: number, max: number): number {
	return Math.min(Math.max(this.valueOf(), min), max);
};

const { random, abs } = Math;

export interface Player {
	id: number;
	name: string;
}

export interface Character {
	id: number;
	name: string;
}

export interface Champion {
	player: Player;
	character: Character;
	winRate: number;
}

interface Round {
	winner: "p1" | "p2";
	hp: { p1: number; p2: number };
}

interface Game {
	winner: Champion;
	rounds: Round[];
}

/**
 * Each player has 3 lives. Player to lose all lives loses. Each life is 100 hp.
 * Who gets to hit is random. player gets random damage per turn. Player to hit 100 hp
 * loses a life and round ends.
 */
class Match {
	private p1: Champion;
	private p2: Champion;

	constructor(p1: Champion, p2: Champion) {
		this.p1 = p1;
		this.p2 = p2;
	}

	play(): Game {
		const lives = { p1: 2, p2: 2 };
		const rounds = [];

		while (lives.p1 > 0 && lives.p2 > 0) {
			const r = this.round();
			lives[r.winner] -= 1;
			rounds.push(r);
		}

		const winner = lives.p1 > 0 ? p1 : p2;
		return {
			winner,
			rounds,
		};
	}

	private attack(player: Champion) {
		const min = 0;
		const base = 25;
		const max = 50;
		const r = random();
		const willCrit = random() <= player.winRate;
		const crit = willCrit ? base / 4 : 0;
		const damage = r * base + crit;
		return abs(damage).clamp(min, max);
	}

	private turn() {
		const r = random();
		return r >= 0.5 ? "p1" : "p2";
	}

	private round(): Round {
		const hp = { p1: 100, p2: 100 };

		const move = () => {
			const t = this.turn();
			const player = t === "p1" ? this.p1 : this.p2;

			const damage = this.attack(player);
			hp[t] -= damage;
		};

		while (hp.p1 > 0 && hp.p2 > 0) {
			move();
		}

		const winner = hp.p1 > 0 ? "p1" : "p2";
		return { hp, winner };
	}
}

export default Match;

const p1: Champion = {
	character: { id: 1, name: "Kirby" },
	player: { id: 1, name: "Santos" },
	winRate: 0.465,
};

const p2: Champion = {
	character: { id: 2, name: "Bowser" },
	player: { id: 2, name: "Kevin" },
	winRate: 0.535,
};

const match = new Match(p1, p2);

const win = match.play();
console.log(win);
