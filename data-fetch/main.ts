import "./src/util/index.ts";

import Tournament from "./src/components/tournament.ts";

const t = new Tournament(2, 1);

const results = t.play();

const json = JSON.stringify(results);
await Deno.writeTextFile("./data.json", json);
