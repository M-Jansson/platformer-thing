function player() {
	this.alive = true;
	this.jumping = false;
	this.extraJump = false;
	this.onGround = false;
	this.onWall = false;
	this.x;
	this.old_x;
	this.y;
	this.old_y;
	this.vx = 0;
	this.vy = 0;
	this.gravity;
	this.size;
	this.deathCount = 0;
}

function printPlayer() {
	picture(player.x, player.y, 2 * player.size + "/misc/player.png");
}

function movePlayer() {
	if (player.onWall && player.vy > 0) {
		player.gravity = player.size / 24;
	}
	else {
		player.gravity = player.size / 12;
	}

	if ((keyboard.space || (keyboard.up || keyboard.w)) && (player.onGround || player.extraJump) && !player.jumping) {
		player.vy = -player.size;
		player.onGround = false;
		player.extraJump = false;
	}
	if ((keyboard.space || (keyboard.up || keyboard.w)) && player.onWall && !player.jumping) {
		player.onWall = false;
		player.jumping = true;
		if (keyboard.right || keyboard.d) {
			player.vy = player.size / -1.6;
			player.vx = player.size / -1.6;
		}
		if (keyboard.left || keyboard.a) {
			player.vy = player.size / -1.6;
			player.vx = player.size / 1.6;
		}
	}
	player.jumping = keyboard.space || (keyboard.up || keyboard.w);
	player.onWall = false;

	if (keyboard.right || keyboard.d) {
		if (player.vx + player.size / 8 < player.size / 3.6) {
			player.vx += player.size / 8;
		}
		else {
			player.vx = player.size / 3.6;
		}
	}
	if (keyboard.left || keyboard.a) {
		if (player.vx + player.size / -8 > player.size / -3.6) {
			player.vx += player.size / -8;
		}
		else {
			player.vx = player.size / -3.6;
		}
	}

	player.old_x = player.x;
	player.old_y = player.y;
	player.x += player.vx;
	player.y += player.vy;
	player.vx = abs(player.vx) < .5 ? 0 : player.vx * .6;
	if (!player.onGround) {
		player.vy = player.vy + player.gravity >= player.gravity * 16 ? player.gravity * 16 : player.vy + player.gravity;
	}
}