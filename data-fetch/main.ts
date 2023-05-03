import "./src/util/index.ts";

import Tournament from "./src/components/tournament.ts";

const start = performance.now();

const t = new Tournament(10_000, 100);

const results = t.play();

const json = JSON.stringify(results);
await Deno.writeTextFile("./data.json", json);

console.log("Done!");

const end = performance.now();

const ms = end - start;

const msToTime = (ms: number) => {
	const hours = Math.floor(ms / 3600000);
	const minutes = Math.floor((ms % 3600000) / 60000);
	const seconds = Math.floor(((ms % 360000) % 60000) / 1000);
	return `${hours}h ${minutes}m ${seconds}s`;
};

console.log(`Completed in: ${msToTime(ms)}`);
