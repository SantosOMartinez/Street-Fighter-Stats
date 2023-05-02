class Player {
	private name: string;
	private id: number;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}

	getId() {
		return this.id;
	}

	getName() {
		return this.name;
	}
}

export default Player;
