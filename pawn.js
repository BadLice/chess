class Pawn
{
	constructor(x,y,dir)
	{
		this.x=x;
		this.y=y;
		this.moves = false;
		this.selected=false;
		this.dir = dir ? dir : false; //false up, true down
		this.diagonal = false;
		this.up = 2;
		this.down = 0;
		this.left = 0;
		this.right = 0;
		this.horseMove = false;
		this.pathMatrix = [];
		this.horsePath = [[-2,-1],[-1,-2],[+2,-1],[+1,-2],[+1,+2],[+2,+1],[-1,+2],[-2,+1]];

		this.pathColor = color(173, 255, 107);
		this.canPress = true;
		this.col = color(0);
	}

	move()
	{
		if(mouseIsPressed)
		{
			if(this.canPress)
			{	
				if(this.isMouseIn())
					this.selected=!this.selected;
			}
			this.canPress = false;
		}
		else
			this.canPress = true;

		if(this.selected)
		{
			this.drawPath();
			if(this.isInPath(getCellMouse()[0],getCellMouse()[1]) && mouseIsPressed)
			{
				this.x = getCellMouse()[0];
				this.y = getCellMouse()[1];
				this.selected=false;
				this.moved=true;
			}
		}

	}

	drawPath()
	{
		this.pathMatrix = [];
		fill(this.pathColor);
		stroke(0);
		var upStep = this.dir ? -1 : 1;
		var downStep = -upStep;

		for (var i = this.up - 1; i >= 0; i--)
		{
			var posY = 	this.y+upStep*(i+1);
			if(getCellY(posY) >= 0 && getCellY(posY) < height)
			{
				rect(getCellX(this.x),getCellY(posY),getCellSize(),getCellSize());
				this.pathMatrix.push([this.x,posY]);
			}
		}

		for (var i = this.down - 1; i >= 0; i--)
		{
			var posY = 	this.y+downStep*(i+1);
			if(getCellY(posY) >= 0 && getCellY(posY) < height)
			{
				rect(getCellX(this.x),getCellY(posY),getCellSize(),getCellSize());
				this.pathMatrix.push([this.x,posY]);
			}
		}


		for (var i = this.right - 1; i >= 0; i--)
		{
			var posX = 	this.x+(i+1);
			if(getCellY(posX) >= 0 && getCellY(posX) < width)
			{
				rect(getCellX(posX),getCellY(this.y),getCellSize(),getCellSize());
				this.pathMatrix.push([posX,this.y]);
			}
		}

		for (var i = this.left - 1; i >= 0; i--)
		{
			var posX = 	this.x-(i+1);
			if(getCellY(posX) >= 0 && getCellY(posX) < width)
			{
				rect(getCellX(posX),getCellY(this.y),getCellSize(),getCellSize());
				this.pathMatrix.push([posX,this.y]);
			}
		}
		if(this.diagonal === 1)
		{
			var posX = this.x+1;
			var posY = this.y+1;
			if(getCellY(posX) >= 0 && getCellY(posX) < width && getCellY(posY) >= 0 && getCellY(posY) < height && posX!==this.x && posY!==this.y)
			{
				rect(getCellX(posX),getCellY(posY),getCellSize(),getCellSize());
				this.pathMatrix.push([posX,posY]);
			}

			var posX = this.x+1;
			var posY = this.y-1;
			if(getCellY(posX) >= 0 && getCellY(posX) < width && getCellY(posY) >= 0 && getCellY(posY) < height && posX!==this.x && posY!==this.y)
			{
				rect(getCellX(posX),getCellY(posY),getCellSize(),getCellSize());
				this.pathMatrix.push([posX,posY]);
			}

			var posX = this.x-1;
			var posY = this.y-1;
			if(getCellY(posX) >= 0 && getCellY(posX) < width && getCellY(posY) >= 0 && getCellY(posY) < height && posX!==this.x && posY!==this.y)
			{
				rect(getCellX(posX),getCellY(posY),getCellSize(),getCellSize());
				this.pathMatrix.push([posX,posY]);
			}

			var posX = this.x-1;
			var posY = this.y+1;
			if(getCellY(posX) >= 0 && getCellY(posX) < width && getCellY(posY) >= 0 && getCellY(posY) < height && posX!==this.x && posY!==this.y)
			{
				rect(getCellX(posX),getCellY(posY),getCellSize(),getCellSize());
				this.pathMatrix.push([posX,posY]);
			}
		}
		else
		{
			if(this.diagonal)
			{
				//top rignt corner
				var start;
				for (var i =  9 - 1; i >= 0; i--)
				{
					var posX = this.x+(i+1);
					var posY = this.y-(i+1);

					if(getCellY(posX) >= 0 && getCellY(posX) < width-2 && getCellY(posY) >= 0 && getCellY(posY) < height-2)
					{
						start = [posX,posY];
						break;
					}
				}

				if(start===undefined)
					start = [this.x,this.y];

				for (var i = 9 - 1; i >= 0; i--)
				{
					var posX = start[0]-(i);
					var posY = start[1]+(i);
					
					if(getCellY(posX) >= 0 && getCellY(posX) < width && getCellY(posY) >= 0 && getCellY(posY) < height && posX!==this.x && posY!==this.y)
					{
						rect(getCellX(posX),getCellY(posY),getCellSize(),getCellSize());
						this.pathMatrix.push([posX,posY]);
					}
				}

				//top left corner
				var start;
				for (var i =  9 - 1; i >= 0; i--)
				{
					var posX = this.x-(i+1);
					var posY = this.y-(i+1);

					if(getCellY(posX) >= 0 && getCellY(posX) < width-2 && getCellY(posY) >= 0 && getCellY(posY) < height-2 )
					{
						start = [posX,posY];
						break;
					}
				}

				if(start===undefined)
					start = [this.x,this.y];

				for (var i = 9 - 1; i >= 0; i--)
				{
					var posX = start[0]+(i);
					var posY = start[1]+(i);
					
					if(getCellY(posX) >= 0 && getCellY(posX) < width && getCellY(posY) >= 0 && getCellY(posY) < height && posX!==this.x && posY!==this.y)
					{
						rect(getCellX(posX),getCellY(posY),getCellSize(),getCellSize());
						this.pathMatrix.push([posX,posY]);
					}
				}
			}
		}
	

		if(this.horseMove)
		{
			for(var i=0;i<this.horsePath.length;i++)
			{
				var posX=this.x+this.horsePath[i][0];
				var posY=this.y+this.horsePath[i][1];

				if(getCellY(posX) >= 0 && getCellY(posX) < width && getCellY(posY) >= 0 && getCellY(posY) < height && posX!==this.x && posY!==this.y)
				{
					rect(getCellX(posX),getCellY(posY),getCellSize(),getCellSize());
					this.pathMatrix.push([posX,posY]);
				}
			}
		}
	}

	draw()
	{
		noStroke();
		fill(this.col);
		rect(getCellSize()/4+getCellX(this.x),getCellSize()/4+getCellY(this.y),getCellSize()/2,getCellSize()/2);
	}

	isInPath(x,y)
	{
		if(!this.pathMatrix)
			return false;

		for (var i=0;i<this.pathMatrix.length;i++)
		{
			var o = this.pathMatrix[i];

			if(o[0] === x && o[1] === y)
				return true;
			
		}
		return false;
	}

	isMouseIn()
	{
		return getCellMouse()[0] === this.x && getCellMouse()[1] === this.y;
	}
}

class Ped extends Pawn
{
	constructor(x,y,dir)
	{
		super(x,y,dir);
		this.up = 2;
		this.col = color(0,100,100);
	}

	update()
	{
		if(this.up === 2 && this.moved)
			this.up = 1;
	}
}

class Horse extends Pawn
{
	constructor(x,y,dir)
	{
		super(x,y,dir);
		this.horseMove = true;
	}
}

class Bishop extends Pawn
{
	constructor(x,y,dir)
	{
		super(x,y,dir);
		this.diagonal = true;
	}
}

class Tower extends Pawn
{
	constructor(x,y,dir)
	{
		super(x,y,dir);
		this.up = 9;
		this.down = 9;
		this.right = 9;
		this.left = 9;
	}
}

class Queen extends Pawn
{
	constructor(x,y,dir)
	{
		super(x,y,dir);
		this.up = 9;
		this.down = 9;
		this.right = 9;
		this.left = 9;
		this.diagonal = true;
	}
}

class King extends Pawn
{
	constructor(x,y,dir)
	{
		super(x,y,dir);
		this.up = 1;
		this.down = 1;
		this.right = 1;
		this.left = 1;
		this.diagonal = 1;
	}
}