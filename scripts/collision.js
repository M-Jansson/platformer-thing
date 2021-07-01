function collisionCheck(player, level) {
	groundCheck = 2;
	index_x = floor(player.x / level.tileSize) % level.width;
	index_y = floor(player.y / level.tileSize);
	index = index_y * level.width + index_x;
	if (level.map[index] != 0 && level.map[index] != 95) {
		collided(player, level, index_y, index_x);
	}

	index_x = floor((player.x + player.size) / level.tileSize) % level.width;
	index_y = floor(player.y / level.tileSize);
	index = index_y * level.width + index_x;
	if (level.map[index] != 0 && level.map[index] != 95) {
		collided(player, level, index_y, index_x);
	}

	index_x = floor((player.x + player.size) / level.tileSize) % level.width;
	index_y = floor((player.y + player.size) / level.tileSize);
	index = index_y * level.width + index_x;
	if (level.map[index] != 0 && level.map[index] != 95) {
		collided(player, level, index_y, index_x);
	}
	underValue = level.map[index + level.width];
	if (underValue <= 0 || (underValue >= 24 && underValue <= 27) || (underValue >= 32 && underValue <= 35) || underValue >= 60) {
		groundCheck--;
	}

	index_x = floor(player.x / level.tileSize) % level.width;
	index_y = floor((player.y + player.size) / level.tileSize);
	index = index_y * level.width + index_x;
	if (level.map[index] != 0 && level.map[index] != 95) {
		collided(player, level, index_y, index_x);
	}
	underValue = level.map[index + level.width];
	if (underValue <= 0 || (underValue >= 24 && underValue <= 27) || (underValue >= 32 && underValue <= 35) || underValue >= 60) {
		groundCheck--;
	}
	if (groundCheck == 0) {
		player.onGround = false;
	}
}


function collided(player, level, row, column) {
	index = row * level.width + column;
	if (level.map[index] != 0 && level.map[index] != 95) {

		caseNumber = level.map[index];
		if (caseNumber >= 16 && caseNumber <= 31) {
			caseNumber = floor((caseNumber - 16) / 4) + 1;
		}
		if (caseNumber >=36 && caseNumber <= 59) {
			caseNumber = 9 + floor(((caseNumber - 4) % 8) / 4);
		}
		if (caseNumber >= 60 && caseNumber <= 71) {
			caseNumber = 60 + caseNumber % 4;
		}

		
		
		switch(caseNumber) {
			//Tiles & Platforms
			case 1: {
				upCollision(player, row, level);
				break;
			}
			case 2: {
				rightCollision(player, column, level);
				break;
			}
			case 3: {
				downCollision(player, row, level);
				break;
			}
			case 4: {
				leftCollision(player, column, level);
				break;
			}
			case 5: {
				upCollision(player, row, level);
				leftCollision(player, column, level);
				break;
			}
			case 6: {
				upCollision(player, row, level);
				rightCollision(player, column, level);
				break;
			}
			case 7: {
				rightCollision(player, column, level);
				downCollision(player, row, level);
				break;
			}
			case 8: {
				downCollision(player, row, level);
				leftCollision(player, column, level);
				break;
			}
			case 9: {
				upCollision(player, row, level);
				downCollision(player, row, level);
				break;
			}
			case 10: {
				rightCollision(player, column, level);
				leftCollision(player, column, level);
				break;
			}
			case 11: {
				upCollision(player, row, level);
				rightCollision(player, column, level);
				leftCollision(player, column, level);
				break;
			}
			case 12: {
				upCollision(player, row, level);
				rightCollision(player, column, level);
				downCollision(player, row, level);
				break;
			}
			case 13: {
				rightCollision(player, column, level);
				downCollision(player, row, level);
				leftCollision(player, column, level);
				break;
			}
			case 14: {
				upCollision(player, row, level);
				downCollision(player, row, level);
				leftCollision(player, column, level);
				break;
			}
			case 15: {
				upCollision(player, row, level);
				rightCollision(player, column, level);
				downCollision(player, row, level);
				leftCollision(player, column, level);
				break;
			}

			//Spikes
			case 32: {
				if (player.y >= player.old_y) {
					up = (row + .25) * level.tileSize;
					right = (column + .9375) * level.tileSize;
					left = (column + .0625) * level.tileSize;
					if (player.y + player.size >= up && player.x < right && player.x + player.size >= left) {
						player.alive = false;
						player.vx = 0;
						player.vy = 0;
					}
				}
				break;
			}
			case 33: {
				if (player.x <= player.old_x) {
					up = (row + .0625) * level.tileSize;
					right = (column + .75) * level.tileSize;
					down = (row + .9375) * level.tileSize;
					if (player.y + player.size >= up && player.x < right && player.y < down) {
						player.alive = false;
						player.vx = 0;
						player.vy = 0;
					}
				}
				break;
			}
			case 34: {
				if (player.y <= player.old_y) {
					right = (column + .9375) * level.tileSize;
					down = (row + .75) * level.tileSize;
					left = (column + .0625) * level.tileSize;
					if (player.x < right && player.y < down && player.x + player.size >= left) {
						player.alive = false;
						player.vx = 0;
						player.vy = 0;
					}
				}
				break;
			}
			case 35: {
				if (player.x >= player.old_x) {
					up = (row + .0625) * level.tileSize;
					down = (row + .9375) * level.tileSize;
					left = (column + .25) * level.tileSize;
					if (player.y + player.size >= up && player.y < down && player.x + player.size >= left) {
						player.alive = false;
						player.vx = 0;
						player.vy = 0;
					}
				}
				break;
			}

			//Buttons
			case 60: {
				up = (row + .75) * level.tileSize;
				if (player.y + player.size >= up && up > player.old_y + player.size) {
					for (i = 0; i < level.width * level.height; i++) {
						if (level.map[i] >= 36 + floor((level.map[index] - 60) / 4) * 8 && level.map[i] <= 43 + floor((level.map[index] - 60) / 4) * 8) {
							level.map[i] *= -1;
						}
					}
					level.map[index] *= -1;
				}
				break;
			}
			case 61: {
				right = (column + .25) * level.tileSize;
				if (player.x < right && right <= player.old_x) {
					for (i = 0; i < level.width * level.height; i++) {
						if (level.map[i] >= 36 + floor((level.map[index] - 60) / 4) * 8 && level.map[i] <= 43 + floor((level.map[index] - 60) / 4) * 8) {
							level.map[i] *= -1;
						}
					}
					level.map[index] *= -1;
				}
				break;
			}
			case 62: {
				down = (row + .25) * level.tileSize;
				if (player.y < down && down <= player.old_y) {
					for (i = 0; i < level.width * level.height; i++) {
						if (level.map[i] >= 36 + floor((level.map[index] - 60) / 4) * 8 && level.map[i] <= 43 + floor((level.map[index] - 60) / 4) * 8) {
							level.map[i] *= -1;
						}
					}
					level.map[index] *= -1;
				}
				break;
			}
			case 63: {
				left = (column + .75) * level.tileSize;	
				if (player.x + player.size >= left && left > player.old_x + player.size) {
					for (i = 0; i < level.width * level.height; i++) {
						if (level.map[i] >= 36 + floor((level.map[index] - 60) / 4) * 8 && level.map[i] <= 43 + floor((level.map[index] - 60) / 4) * 8) {
							level.map[i] *= -1;
						}
					}
					level.map[index] *= -1;
				}
				break;
			}

			//Misc
			case 97: {
				mid_x = player.x + player.size / 2;
				mid_y = player.y + player.size / 2;
				index = floor(mid_y / level.tileSize) * level.width + floor(mid_x / level.tileSize);
				if (level.map[index] == 97) {
					level.map[index] *= -1;
					player.extraJump = true;
				}
				break;
			}
			case 98: {
				mid_x = player.x + player.size / 2;
				mid_y = player.y + player.size / 2;
				index = floor(mid_y / level.tileSize) * level.width + floor(mid_x / level.tileSize);
				if (level.map[index] == 98) {
					level.map[index] *= -1;
					level.coinCount++;
				}
				break;
			}
			case 99: {
				if (level.coinCount / level.totalCoins >= 1 || level.totalCoins == 0) {
					level.completed = true;
				}
				break;
			}
			
			default: {
				break;
			}
		}
	}
}



//Directional collision functions
function upCollision(player, row, level) {
	up = row * level.tileSize;

	if (player.y + player.size >= up && up > player.old_y + player.size) {
		
		player.y = up - player.size - .001;
		player.old_y = player.y;
		player.vy = 0;
		player.onGround = true;
	}
}
function rightCollision(player, column, level) {
	right = (column + 1) * level.tileSize;

	if (player.x < right && right <= player.old_x) {
		player.x = right;
		player.old_x = player.x;
		player.vx = 0;
		player.onWall = !player.onGround;
	}
}
function downCollision(player, row, level) {
	down = (row + 1) * level.tileSize;

	if (player.y < down && down <= player.old_y) {
		player.y = down;
		player.old_y = player.y;
		player.vy = 0;
	}
}
function leftCollision(player, column, level) {
	left = column * level.tileSize;	

	if (player.x + player.size >= left && left > player.old_x + player.size) {
		player.x = left - player.size - .001;
		player.old_x = player.x;
		player.vx = 0;
		player.onWall = !player.onGround;
	}
}