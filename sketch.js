function setup()
{
	createCanvas(1102,802);
	mapx = new Map();

	player1 = new Player(color(255,0,0),false);
	player2 = new Player(color(0,0,255),true);

	turn = true;
	kingRip = false;
	gameOver = false;
}	

function draw()
{
	background(0);
	mapx.draw();
	
	player1.draw();
	player2.draw();

	turn ? player1.move() : player2.move();

	drawTurnLabel();

}

function getCellX(x)
{
	return (mapx.width-2)/mapx.w*x;
}

function getCellY(y)
{
	return (mapx.height-2)/mapx.h*y;
}

function getCellSize()
{
	return (mapx.width-2)/mapx.w;
}

function getCellMouse()
{
	return[floor(mouseX/100),floor(mouseY/100)];
}

function getItemAt(x,y)
{
	for (var i = player1.allItems.length - 1; i >= 0; i--)
	{
		if(player1.allItems[i].x === x && player1.allItems[i].y === y )
			return player1.allItems[i];
	}

	for (var i = player2.allItems.length - 1; i >= 0; i--)
	{
		if(player2.allItems[i].x === x && player2.allItems[i].y === y )
			return player2.allItems[i];
	}

	return null;
}

function drawTurnLabel()
{
	textSize(20);

	if(turn)
	{
		fill(player1.col)
		text("Player 1 turn",900,30);
	}
	else
	{
		fill(player2.col)
		text("Player 2 turn",900,30);
	}

	if(kingRip)
	{
		textSize(30);
		fill(0,255,0);
		text("Check mate",900,60);

	}

	if(gameOver)
	{
		fill(255);
		textSize(30);
		text((turn ? "Player 2" : "Player 1") + " Won!",900,150);
	}

}