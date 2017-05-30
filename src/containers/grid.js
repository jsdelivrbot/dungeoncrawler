import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Hero from '../img/Hero';
import Dungeon from './generateDungeon';

import Grass from '../../img/grass.jpg';
import whiteKnight from '../../img/knight-front.png';
import Rock from '../../img/rock.jpg';


// IDEAS
// Create a random map generated with rocks and grass with collision data stored in objects

const renderGrass = <img src={Grass} />

class Grid extends Component {
	constructor(props) {
		super(props)
		this.state = {
			charPosition: [7, 7], // Switch over to charPosition later
			mapPosition: [0, 0], // Not in use at the moment
			entireGrid: [], // Can be as large as neccessary
			visibleGrid: [], // Only 15 x 15 is visible in camera view
			mapSize: 150,
			cameraSize: 15,
			objectInformation: {
				whiteKnight: {
					solid: true
				},
				_: {
					solid: false
				},
				GRASS: {
					solid: false
				},
				ROCK: {
					solid: true
				}
			}
		}
	}

	componentWillMount() {
		document.addEventListener('keydown', this._handleKeydown.bind(this))
		this.setState({
			entireGrid: this._helperTranspose(this._createGrid('_', this.state.mapSize, this.state.mapSize))
		})
	}

	_handleKeydown(e) {
		if (e.keyCode == 37) {
			console.log('Going left...')
			this._moveCharPosition('left');
		
		}
		else if (e.keyCode == 38) {
			console.log('Going up...');
			this._moveCharPosition('up');

		}
		else if (e.keyCode == 39) {
			console.log('Going right...');
			this._moveCharPosition('right');			
		}
		else if (e.keyCode == 40) {
			console.log('Going down...');
			this._moveCharPosition('down');			
		}
	}
// Render random map and place the array in local state or Redux

// Set character position in center of the map
	// Divide map width and length by 2 and place character on map

// Create an object of different types of map tiles
	// Include image location
	// Include collision data
	// Collision logic
		// Ex: In _moveCharPosition
		// Perform pre render calculation to determine if character's next step is walking into a solid object
		// If true, do not increment/decrement character position
		// If false, perform move

// Character animation walking direction
	// Set latest direction and link it to character sprite walking in that direction in Redux
	// Output character sprite based on last direction walked

// Seperate the logic between grid creation and grid display
	// Create entire grid (whole map) --> determine character camera view of grid --> render view into UI

	_moveCharPosition(direction) {
		// Create copy of map position and char position before manipulating and updating back into state
		let cloneMapPosition = Array.prototype.slice.call(this.state.mapPosition);
		let cloneCharPosition = Array.prototype.slice.call(this.state.charPosition);
		let X = cloneCharPosition[0];
		let Y = cloneCharPosition[1];
		
		let tileType = this.state.entireGrid[X][Y];
		console.log(this.state.objectInformation[tileType].solid)
		switch(direction) {
			case 'up':
			// Local state array corrected for transposition
				if (cloneMapPosition[1] > 0) {
					Y--;
					if (this.state.objectInformation[this.state.entireGrid[Y][X]].solid) {
						break;
					}
					else {
						cloneMapPosition[1]--;
						cloneCharPosition[1]--;
					}
				}
				break;
			case 'down':
				if (cloneMapPosition[1] < this.state.mapSize) { // Prevent user from going off grid
					Y++;			
					if (this.state.objectInformation[this.state.entireGrid[Y][X]].solid) {
						break;
					}
					cloneMapPosition[1]++;
					cloneCharPosition[1]++;
				}
				break;
			case 'left':
				if (cloneMapPosition[0] > 0) {
					X--;
					if (this.state.objectInformation[this.state.entireGrid[Y][X]].solid) {
						break;
					}
					cloneMapPosition[0]--;
					cloneCharPosition[0]--;
				}
				break;
			case 'right':
				if (cloneMapPosition[0] < this.state.mapSize) {
					X++;
					if (this.state.objectInformation[this.state.entireGrid[Y][X]].solid) {
						break;
					}
					cloneMapPosition[0]++;
					cloneCharPosition[0]++;
				}
				break;
			default:
				break;
		}
		this.setState({
			mapPosition: cloneMapPosition,
			charPosition: cloneCharPosition
		})
	}

	// Creates initial grid - initiated during componentWillMount
	_createGrid (type, cols, rows) {
		let grid = [],
			tile;
		for (let i = 0; i < cols; i++) {
			let row = [];
			for (let j = 0; j < rows; j++) {
				let random = Math.random();
				// Creates border around map
				if (i < 7 || j < 7 || i > this.state.mapSize - 7 || j > this.state.mapSize - 8) {
					tile = 'R';
				}
				else {
					// Randomly generate grass or rock on tile
					//tile = random > 0.4 ? 'GRASS' : 'ROCK';
					tile = '_'
				}
				row.push(tile)
			}
			grid.push(row);
		}
		return grid
	}

	_calculatePath(x0, y0, x1, y1) {
		let arr = [];
		let start = {
			x: x0,
			y: y0
		}
		let end = {
			x: x1,
			y: y1
		}
		
		
	}
	
	_generateRooms(cols, rows) {
		function helperGeneratePosition() {
			// cols & rows will temporarily be substituted for 150 
			var randomX = Math.floor(Math.random() * 150);
			var randomY = Math.floor(Math.random() * 150);
			return [randomX, randomY]
		}
		function helperGenerateRoomSize() {
			var randomWidth = Math.floor(Math.random() * 10) + 2;
			var randomHeight = Math.floor(Math.random() * 10) + 2;
			return [randomWidth, randomHeight];
		}
		function helperFindCenterOfRoom(x, y, w, h) {
			return [Math.floor(x + w / 2), Math.floor(y + h / 2)]
		}
		function generateRoom() {
			console.log('Log generateRoom activity');

			var randomPosition = helperGeneratePosition();
			var randomSize = helperGenerateRoomSize();
			console.log('randomPosition:' + randomPosition);
			console.log('randomSize: ' + randomSize);
		}
		generateRoom()
	}


	// Transpose array to convert grid to true [x][y]
	_helperTranspose(a) {
		return Object.keys(a[0]).map(function(c) {
			return a.map(function(r) { return r[c]; });
		})
	}

	// cameraGrid accepts an array (this.state.grid) and translates into player's camera screen
	cameraGrid (grid) {
		// get camera position from state
		const position = this.state.mapPosition; // Adjust everything to mapPosition later on
		const x = position[0];
		const y = position[1];

		let gridView = [];
		for (let i = y; i < y + this.state.cameraSize; i++) {
			let row = [];
			for (let j = x; j < x + this.state.cameraSize; j++) {
				row.push(grid[i][j])
			}
			gridView.push(row);
		}
		let center = this.state.cameraSize / 2;
		gridView[Math.floor(center)][Math.floor(center)] = 'KNIGHT';
		console.log(Math.floor(center));
		console.log(this.state.charPosition[0])
		return gridView;
	}
	
	// renderGrid accepts an array (cameraGrid) and translates into tile sprites
	renderGrid(grid) {
		let renderGrid = [];
		
		grid.forEach(function(row) {
			let renderRow = [];
			row.forEach(function(tile) {
				switch(tile) {
					case '_':
						renderRow.push(<img src={Grass} />)
						break;
					case 'GRASS':
						renderRow.push(<img src={Grass} />)
						break;
					case 'KNIGHT':
						renderRow.push(<img src={whiteKnight} />)
						break;
					case 'R':
						renderRow.push(<img src={Rock} />)
						break;
					default:
						break;
					
				}
			})
			renderGrid.push(<div>{renderRow}</div>)
		}) 
		return renderGrid;
	}
	// FIX THIS
	renderGridToString() {
		console.log(this.state.entireGrid)
		let gridString = 'test';
		this.state.entireGrid.forEach(function(row) {
			let str = row.join(', ');
			console.log(row)
			row.forEach(function(tile) {

			})
			console.log(str);
			var gridString = gridString.concat('hello');
		})
		console.log('gridToString')
		console.log(gridString)
	}

	render() {
			// console.log(this.state.mapPosition)
			// console.log(this.state.charPosition)
			//this.createGrid('GRASS', this.state.mapSize, this.state.mapSize)
			console.log('From Redux...');
			console.log(this.props)
			console.log('_generateRooms');
			this._generateRooms()
			
		return(
			<div>
				<Dungeon />	
				{this.renderGridToString()}
				{this.renderGrid(this.cameraGrid(this.state.entireGrid))}
			</div>
		)
	}
}
function mapStateToProps(state) {
    return {
        grid: state.grid
    }
}

export default connect(mapStateToProps)(Grid);

//	{this.renderGrid(this.cameraGrid(this.createGrid('GRASS', this.state.mapSize, this.state.mapSize)))}