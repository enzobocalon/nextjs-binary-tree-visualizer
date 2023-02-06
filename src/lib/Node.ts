const DEFAULT_COORD = 0;

export default class Node {
	id: string;
	parentID: string | null;
	data: number;
	left: Node | null;
	right: Node | null;
	private coordX: number;
	private coordY: number;
	constructor(data: number) {
		this.id = crypto.randomUUID();
		this.parentID = null;
		this.data = data;
		this.left = null;
		this.right = null;
		this.coordX = DEFAULT_COORD;
		this.coordY = DEFAULT_COORD;
	}

	getCoordY() {
		return this.coordY;
	}

	getCoordX() {
		return this.coordX;
	}

	setParentID(parentID: string) {
		this.parentID = parentID;
	}

	setCoordinates(coordX: number, coordY: number) {
		this.coordX = coordX;
		this.coordY = coordY;
	}
}
