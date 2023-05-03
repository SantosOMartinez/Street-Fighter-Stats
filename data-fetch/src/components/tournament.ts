import { faker } from "faker";

import Match, { Champion, Character, Game, Player } from "./match.ts";

class Tournament {
	private players: Player[];
	private matches: number;

	constructor(players: number, matches: number) {
		this.players = this.generatePlayers(players);
		this.matches = matches;
	}

	play() {
		const games: Game[] = [];

		for (const p of this.players) {
			const m = this.runMatches(p);
			games.push(...m);
		}
		return games;
	}

	private generatePlayers(count: number): Player[] {
		const attendees: Player[] = [];
		for (let i = 1; i <= count; i++) {
			const p: Player = { id: i, name: faker.name.fullName() };
			attendees.push(p);
		}
		return attendees;
	}

	private runMatches(player: Player) {
		const opponents = this.players.filter((p) => p.id !== player.id);
		const n = opponents.length;

		const matches: Game[] = [];

		for (let i = 0; i < this.matches; i++) {
			const index = this.getRandomInt(0, (n - 1).clamp(0, n));
			const opponent = opponents[index];

			// TODO: Implement random character select with character database.
			const c1: Character = { id: 0, name: "" };
			const c2: Character = { id: 0, name: "" };

			const p1: Champion = {
				character: c1,
				player,
				winRate: 0,
			};

			const p2: Champion = {
				character: c2,
				player: opponent,
				winRate: 0,
			};

			const match = new Match(p1, p2);
			matches.push(match.play());
		}
		return matches;
	}

	private getRandomInt(min: number, max: number) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

export default Tournament;
