const { random, abs, round } = Math;

export interface Player {
	id: number;
	name: string;
}

export type Character = string;

export interface Champion {
	player: Player;
	character: Character;
	winRate: number;
}

export interface Round {
	winner: "p1" | "p2";
	hp: { p1: number; p2: number };
}

export interface Game {
	p1: string;
	c1: Character;
	p2: string;
	c2: Character;
	winner: "p1" | "p2";
}

// export interface Game {
// 	p1: {
// 		player: Player;
// 		character: Character;
// 	};
// 	c1: Character;
// 	p2: {
// 		player: Player;
// 		character: Character;
// 	};
// 	winner: Player;
// 	rounds: Round[];
// }

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

		const winner = lives.p1 > 0 ? "p1" : "p2";
		return {
			c1: this.p1.character,
			c2: this.p2.character,
			p1: this.p1.player.name,
			p2: this.p2.player.name,
			winner,
		};

		// return {
		// 	winner: winner.player,
		// 	p1: { character: this.p1.character, player: this.p1.player },
		// 	p2: { character: this.p2.character, player: this.p2.player },
		// 	rounds,
		// };
	}

	private attack(player: Champion) {
		const min = 0;
		const base = 25;
		const max = 50;
		const r = random();
		const willCrit = random() <= player.winRate;
		const crit = willCrit ? base / 4 : 0;
		const damage = r * base + crit;
		return abs(round(damage)).clamp(min, max);
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
