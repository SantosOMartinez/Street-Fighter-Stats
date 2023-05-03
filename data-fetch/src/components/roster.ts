import { readCSVRows } from "deno-csv";

export interface RosterWinRate {
	[character: string]: {
		[character: string]: number;
	};
}

async function csvToRoster(path: string) {
	const f = await Deno.open(path);

	const characters: string[] = [];

	const roster: RosterWinRate = {};
	let i = 0;
	for await (const row of readCSVRows(f)) {
		if (i === 0) {
			for await (const cell of row.slice(1)) {
				const c = cell.trim();
				characters.push(c);
			}
		} else {
			const c = row[0].trim();
			roster[c] = {};

			const columns = row.slice(1).entries();
			for await (const [i, cell] of columns) {
				const vs = characters[i];
				roster[c][vs] = Number(cell.trim());
			}
		}
		i++;
	}

	f.close();

	const json = JSON.stringify(roster);
	await Deno.writeTextFile("./roster.json", json);
	return roster;
}

// const roster = await csvToRoster("./roster.csv");
