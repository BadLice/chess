function setup()
{
	createCanvas(1102,802);
	mapx = new Map();

	player1 = new Player(color(255),false);
	player2 = new Player(color(0),true);

	turn = true;
	kingRip = false;
	gameOver = false;
}	

function draw()
{
	drawBackground();
	
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
	stroke(0);
	strokeWeight(1);

	if(turn)
	{
		fill(player1.col)
		text("Player 1 turn",895,63);
	}
	else
	{
		fill(player2.col)
		text("Player 2 turn",895,63);
	}

	if(kingRip)
	{
		textSize(30);
		fill(255, 210, 8);
		text("Check mate",870,264);

	}

	if(gameOver)
	{
		fill(0);
		textSize(30);
		text((turn ? "Player 2" : "Player 1") + " Won!",860,166);
	}

}

function drawBackground()
{
	background(60);

	fill(245-60, 209-60, 66-60);
	stroke(245, 209, 66);
	strokeWeight(5)
	rect(850,30,200,50);

	fill(57+20, 87+20, 0+20);
	stroke(57+80, 87+80, 0+80);
	strokeWeight(5)
	rect(825,130,250,50);

	fill(255, 74, 104);
	stroke(255-70, 74-70, 104-70);
	strokeWeight(5)
	rect(825,230,250,50); 	



}
