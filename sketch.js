function setup()
{
	createCanvas(802,802);
	mapx = new Map();

	peds = [];
	for(var i=0;i<8;i++)
		peds.push(new Ped(i,1));
}	

function draw()
{
	background(0);
	mapx.draw();
	
	for(var i=0;i<8;i++)
	{
		peds[i].draw();
		peds[i].move();
		peds[i].update();
	}
}

function getCellX(x)
{
	return (width-2)/mapx.w*x;
}

function getCellY(y)
{
	return (height-2)/mapx.h*y;
}

function getCellSize()
{
	return (width-2)/mapx.w;
}

function getCellMouse()
{
	return[floor(mouseX/100),floor(mouseY/100)];
}