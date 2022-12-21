const tiles = [];
const NT = 18;

const grid = [];
const DIM = 10;

// bordes

const rules = [
	{
		// 0
		UP: 0,
		RIGHT: 0,
		DOWN: 0,
		LEFT: 0,
	},
	{
		UP: 1,
		RIGHT: 1,
		DOWN: 1,
		LEFT: 0,
	},
	{
		UP: 0,
		RIGHT: 1,
		DOWN: 1,
		LEFT: 1,
	},
	{
		UP: 1,
		RIGHT: 1,
		DOWN: 0,
		LEFT: 1,
	},
	{
		UP: 1,
		RIGHT: 0,
		DOWN: 1,
		LEFT: 1,
	},
	{
		UP: 1,
		RIGHT: 0,
		DOWN: 0,
		LEFT: 1,
	},
	{
		UP: 1,
		RIGHT: 1,
		DOWN: 0,
		LEFT: 0,
	},
	{
		UP: 0,
		RIGHT: 1,
		DOWN: 1,
		LEFT: 0,
	},
	{
		UP: 0,
		RIGHT: 0,
		DOWN: 1,
		LEFT: 1,
	},
	{
		UP: 1,
		RIGHT: 1,
		DOWN: 1,
		LEFT: 1,
	},
	{
		UP: 0,
		RIGHT: 0,
		DOWN: 0,
		LEFT: 0,
	},
	{
		UP: 0,
		RIGHT: 1,
		DOWN: 0,
		LEFT: 0,
	},
	{
		UP: 0,
		RIGHT: 0,
		DOWN: 0,
		LEFT: 1,
	},
	{
		UP: 0,
		RIGHT: 0,
		DOWN: 0,
		LEFT: 1,
	},
	{
		UP: 0,
		RIGHT: 1,
		DOWN: 0,
		LEFT: 1,
	},
	{
		UP: 1,
		RIGHT: 0,
		DOWN: 1,
		LEFT: 0,
	},
	{
		UP: 0,
		RIGHT: 1,
		DOWN: 0,
		LEFT: 0,
	},
	{
		UP: 1,
		RIGHT: 1,
		DOWN: 1,
		LEFT: 1,
	},
];

let totalOptions = [];

//volver a explicar el tema de los backtick y cómo ingresar el nuevas imágenes al sistema
function preload() {
	for (let i = 0; i < NT; i++) {
		tiles[i] = loadImage(`tiles/tile${i}.png`);
	}
}

function setup() {
	// frameRate(0.5);
	createCanvas(1080, 1080);

	for (let i = 0; i < tiles.length; i++) {
		totalOptions.push(i);
	}
	print(totalOptions);

	for (let i = 0; i < DIM * DIM; i++) {
		grid[i] = {
			collapsed: false,
			options: totalOptions,
		};
	}

	// console.log(grid);
}

function draw() {
	const updatedGrid = grid.filter((cell) => cell.collapsed == false);

	if (updatedGrid.length > 0) {
		const gridCopy = updatedGrid.slice();
		gridCopy.sort((a, b) => {
			return a.options.length - b.options.length;
		});

		const selected = gridCopy.filter(
			(cell) => cell.options.length <= gridCopy[0].options.length
		);

		const pickedCell = random(selected);
		pickedCell.collapsed = true;

		const pickedOption = random(pickedCell.options);
		pickedCell.options = [pickedOption];

		//dibujar el array

		const w = width / DIM;
		const h = height / DIM;

		circle(mouseX, mouseY, 20);
		for (let y = 0; y < DIM; y++) {
			for (let x = 0; x < DIM; x++) {
				let currentCell = grid[x + y * DIM];
				if (currentCell.collapsed) {
					let tileIndex = currentCell.options[0];
					let currentRules = rules[tileIndex];
					image(tiles[tileIndex], x * w, y * h, w, h);

					if (y > 0) {
						//check up
						let upIndex = x + (y - 1) * DIM;
						let upCell = grid[upIndex];
						if (!upCell.collapsed) {
							setOptions(upCell, currentRules['UP'], 'DOWN');
						}
					}
					if (x < DIM - 1) {
						//check right
						let rightIndex = x + 1 + y * DIM;
						let rigthCell = grid[rightIndex];
						if (!rigthCell.collapsed) {
							setOptions(
								rigthCell,
								currentRules['RIGHT'],
								'LEFT'
							);
						}
					}
					if (y < DIM - 1) {
						//check down
						let downIndex = x + (y + 1) * DIM;
						let downCell = grid[downIndex];
						if (!downCell.collapsed) {
							setOptions(downCell, currentRules['DOWN'], 'UP');
						}
					}
					if (x > 0) {
						// check left
						let leftIndex = x - 1 + y * DIM;
						let leftCell = grid[leftIndex];
						if (!leftCell.collapsed) {
							setOptions(leftCell, currentRules['LEFT'], 'RIGHT');
						}
					}
				} else {
					fill(0);
					rect(x * w, y * h, w, h);
				}
			}
		}
	} else {
		for (let i = 0; i < DIM * DIM; i++) {
			grid[i] = {
				collapsed: false,
				options: totalOptions,
			};
		}
	}
	// console.log(grid);
	// noLoop();
}

function mouseClicked() {
	console.log('hola');
	for (let i = 0; i < DIM * DIM; i++) {}
}

function setOptions(_cell, _rule, _direction) {
	let newOptions = [];

	for (let option of _cell.options) {
		if (rules[option][_direction] == _rule) {
			// print(option);
			newOptions.push(option);
		}
	}

	_cell.options = newOptions;
}
