class Pawn
{
	constructor(x,y,dir,col)
	{
		this.x=x;
		this.y=y;
		this.moves = false;
		this.selected=false;
		this.dir = dir ? dir : false; //false up, true down
		this.diagonal = [false,0];
		this.up = 0;
		this.down = 0;
		this.left = 0;
		this.right = 0;
		this.horseMove = false;
		this.pathMatrix = [];
		this.horsePath = [[-2,-1],[-1,-2],[+2,-1],[+1,-2],[+1,+2],[+2,+1],[-1,+2],[-2,+1]];
		this.eaten = false;

		this.pathColor = color(173, 255, 107);
		this.canPress = true;
		this.col = col!==undefined ? col : color(0,0,255);

		this.charId = this.constructor.name.charAt(0);
	}

	move()
	{
		if(kingRip && this instanceof King)
			this.selected = true;

		if(!this.eaten)
		{
			if(mouseIsPressed)
			{
				if(this.canPress)
				{	
					if(this.isMouseIn() && !kingRip)
						this.selected=!this.selected;
				}
				this.canPress = false;
			}
			else
				this.canPress = true;

			if(this.selected)
			{
				if(!kingRip && !(this instanceof King))
					this.calcPath();
				else
				{
					if(this instanceof King)
					{
						var enemy = player1.col == this.col ? player2 : player1;

						this.calcPath();

						var otherPath = [];

						for (var i = enemy.allItems.length - 1; i >= 0; i--)
						{
							enemy.allItems[i].calcPath();

							otherPath = otherPath.concat(enemy.allItems[i].pathMatrix);
						}

						for (var i = this.pathMatrix.length - 1; i >= 0; i--)
						{
							for (var j = otherPath.length - 1; j >= 0; j--)
							{
								if(otherPath[j] !== undefined && this.pathMatrix[i] !== undefined)
									if(otherPath[j][0] === this.pathMatrix[i][0] && otherPath[j][1] === this.pathMatrix[i][1])
										this.pathMatrix.splice(i,1);	
										
							}
						}

						if(this.pathMatrix.length <= 0 && this.kingRip)
							gameOver = true;
					}
				}

				
				if(this.isInPath(getCellMouse()[0],getCellMouse()[1]) && mouseIsPressed)
				{
					this.x = getCellMouse()[0];
					this.y = getCellMouse()[1];
					this.selected=false;
					this.moved=true;
					kingRip = false;

					this.eat();

					if(!kingRip)
						this.checkKingRip();


					turn = !turn;
				}
			}
			
		}		
	}

	checkKingRip()
	{
		this.calcPath();

		//enemy player
		var enemy = player1.col == this.col ? player2 : player1;
		var you = player1.col == this.col ? player1 : player2;

		for (var i = this.pathMatrix.length - 1; i >= 0; i--)
			if(this.pathMatrix[i][0] == enemy.king.x && this.pathMatrix[i][1] == enemy.king.y)
				kingRip = true;
	}


	eat()
	{
		if(this.isOccupied(this.x,this.y))
		{
			var x = this.x;
			var y = this.y;
			this.x = -1;
			this.y = -1;

			if(this.canEat(x,y))
				getItemAt(x,y).eaten = true;

			this.x = x;
			this.y = y;
		}
	}

	calcPath()
	{
		this.pathMatrix = [];
		var upStep = this.dir ? -1 : 1;
		var downStep = -upStep;

		for (var i =0 ; i< this.up; i++)
		{
			var posY = 	this.y+upStep*(i+1);
			if((posY) >= 0 && (posY) < mapx.h)
			{
				if(this.isOccupied(this.x,posY))
					if(!this.canEat(this.x,posY))
						break;

				// rect(getCellX(this.x),getCellY(posY),getCellSize(),getCellSize());
				this.pathMatrix.push([this.x,posY]);

				if(this.isOccupied(this.x,posY))
					if(this.canEat(this.x,posY))
						break;

				
			}
		}

		for (var i =0 ; i< this.down; i++)
		{
			var posY = 	this.y+downStep*(i+1);
			if((posY) >= 0 && (posY) < mapx.h)
			{
				if(this.isOccupied(this.x,posY))
					if(!this.canEat(this.x,posY))
						break;

				// rect(getCellX(this.x),getCellY(posY),getCellSize(),getCellSize());
				this.pathMatrix.push([this.x,posY]);

				if(this.isOccupied(this.x,posY))
					if(this.canEat(this.x,posY))
						break;
			}
		}


		for (var i =0 ; i< this.right; i++)
		{
			var posX = 	this.x+(i+1);
			if((posX) >= 0 && (posX) < mapx.w)
			{
				if(this.isOccupied(posX,this.y))
					if(!this.canEat(posX,this.y))
						break;

				// rect(getCellX(posX),getCellY(this.y),getCellSize(),getCellSize());
				this.pathMatrix.push([posX,this.y]);

				if(this.isOccupied(posX,this.y))
					if(this.canEat(posX,this.y))
						break;
			}
		}

		for (var i =0 ; i< this.left; i++)
		{
			var posX = 	this.x-(i+1);
			if((posX) >= 0 && (posX) < mapx.w)
			{
				if(this.isOccupied(posX,this.y))
					if(!this.canEat(posX,this.y))
						break;

				// rect(getCellX(posX),getCellY(this.y),getCellSize(),getCellSize());
				this.pathMatrix.push([posX,this.y]);

				if(this.isOccupied(posX,this.y))
					if(this.canEat(posX,this.y))
						break;

			}
		}
	
		if(this.diagonal[0])
		{
			//top rignt corner
			for (var i =1 ; i< this.diagonal[1]+1; i++)
			{
				var posX = this.x+i;
				var posY = this.y-i;
				
				if((posX) >= 0 && (posX) < mapx.w && (posY) >= 0 && (posY) < mapx.h && posX!==this.x && posY!==this.y)
				{
					if(this.isOccupied(posX,posY))
						if(!this.canEat(posX,posY))
							break;
					
					// rect(getCellX(posX),getCellY(posY),getCellSize(),getCellSize());
					this.pathMatrix.push([posX,posY]);

					if(this.isOccupied(posX,posY))
						if(this.canEat(posX,posY))
							break;
					
				}
			}

			//top left corner
			for (var i =1 ; i< this.diagonal[1]+1; i++)
			{
				var posX = this.x-i;
				var posY = this.y-i;
				
				if((posX) >= 0 && (posX) < mapx.w && (posY) >= 0 && (posY) < mapx.h && posX!==this.x && posY!==this.y)
				{
					if(this.isOccupied(posX,posY))
						if(!this.canEat(posX,posY))
							break;
					
					// rect(getCellX(posX),getCellY(posY),getCellSize(),getCellSize());
					this.pathMatrix.push([posX,posY]);

					if(this.isOccupied(posX,posY))
						if(this.canEat(posX,posY))
							break;
				}
			}

			//bottom left corner
			for (var i =1 ; i< this.diagonal[1]+1; i++)
			{
				var posX = this.x-i;
				var posY = this.y+i;
				
				if((posX) >= 0 && (posX) < mapx.w && (posY) >= 0 && (posY) < mapx.h && posX!==this.x && posY!==this.y)
				{
					if(this.isOccupied(posX,posY))
						if(!this.canEat(posX,posY))
							break;
					
					// rect(getCellX(posX),getCellY(posY),getCellSize(),getCellSize());
					this.pathMatrix.push([posX,posY]);

					if(this.isOccupied(posX,posY))
						if(this.canEat(posX,posY))
							break;
				}
			}

			//bottom right corner
			for (var i =1 ; i< this.diagonal[1]+1; i++)
			{
				var posX = this.x+i;
				var posY = this.y+i;
				
				if((posX) >= 0 && (posX) < mapx.w && (posY) >= 0 && (posY) < mapx.h && posX!==this.x && posY!==this.y)
				{
					if(this.isOccupied(posX,posY))
						if(!this.canEat(posX,posY))
							break;
					
					// rect(getCellX(posX),getCellY(posY),getCellSize(),getCellSize());
					this.pathMatrix.push([posX,posY]);

					if(this.isOccupied(posX,posY))
						if(this.canEat(posX,posY))
							break;
				}
			}
		}
	

		if(this.horseMove)
		{
			for(var i=0;i<this.horsePath.length;i++)
			{
				var posX=this.x+this.horsePath[i][0];
				var posY=this.y+this.horsePath[i][1];

				if((posX) >= 0 && (posX) < mapx.w && (posY) >= 0 && (posY) < mapx.h && posX!==this.x && posY!==this.y && (this.isOccupied(posX,posY) ? this.canEat(posX,posY) : true) )
				{
					// rect(getCellX(posX),getCellY(posY),getCellSize(),getCellSize());
					this.pathMatrix.push([posX,posY]);
				}
			}
		}
	}

	drawPath()
	{

		fill(51,51,51,150);
		stroke(51, 51, 51);
		strokeWeight(2)
		for (var i = this.pathMatrix.length - 1; i >= 0; i--)
			ellipse(getCellX(this.pathMatrix[i][0])+getCellSize()/2,getCellY(this.pathMatrix[i][1])+getCellSize()/2,40,40);
	}

	draw()
	{
		if(!this.eaten)
		{
			stroke(0);
			fill(this.col);
			rect(getCellSize()/4+getCellX(this.x),getCellSize()/4+getCellY(this.y),getCellSize()/2,getCellSize()/2);

			fill(this.col.levels[0]-255);
			textSize(50)
			noStroke();
			text(this.charId,getCellSize()/4+getCellX(this.x),getCellSize()/4+getCellY(this.y),getCellSize()/2,getCellSize()/2);
		}

		if(this.selected)
			this.drawPath();
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

	isOccupied(x,y)
	{
		for (var i =  player1.allItems.length - 1; i >= 0; i--)
		{
			if(player1.allItems[i].x == x && player1.allItems[i].y == y)
				return true;
		}

		for (var i =  player2.allItems.length - 1; i >= 0; i--)
		{
			if(player2.allItems[i].x == x && player2.allItems[i].y == y)
				return true;
		}

		return false;
	}

	canEat(x,y)
	{
		var item = getItemAt(x,y);

		if(item !== null)
		{
			//player 1 has moved
			if(turn)
			{
				if(item.col != player1.col)
					return true;
			}
			//player 2 has moved
			else
			{
				if(item.col != player2.col)
					return true;
			}	
		}

		return false;
	}
}

class Ped extends Pawn
{
	constructor(x,y,dir,col)
	{
		super(x,y,dir,col);
		this.up = 2;
	}

	update()
	{
		if(this.up === 2 && this.moved)
			this.up = 1;
	}

	calcPath()
	{
		super.calcPath();

		for (var i = this.pathMatrix.length - 1; i >= 0; i--)
			if(this.isOccupied(this.pathMatrix[i][0],this.pathMatrix[i][1]))
				this.pathMatrix.splice(i,1);

		var posY = this.y + (this.dir ? -1 : 1);

		if(this.isOccupied(this.x-1,posY))
			if(this.canEat(this.x-1,posY))
				this.pathMatrix.push([this.x-1,posY]);

		if(this.isOccupied(this.x+1,posY))
			if(this.canEat(this.x+1,posY))
				this.pathMatrix.push([this.x+1,posY]);


	}

	drawPath()
	{
		

		super.drawPath();
	}
}

class Horse extends Pawn
{
	constructor(x,y,dir,col)
	{
		super(x,y,dir,col);
		this.horseMove = true;
	}
}

class Bishop extends Pawn
{
	constructor(x,y,dir,col)
	{
		super(x,y,dir,col);
		this.diagonal = [true,8];
	}
}

class Tower extends Pawn
{
	constructor(x,y,dir,col)
	{
		super(x,y,dir,col);
		this.up = 9;
		this.down = 9;
		this.right = 9;
		this.left = 9;
	}
}

class Queen extends Pawn
{
	constructor(x,y,dir,col)
	{
		super(x,y,dir,col);
		this.up = 9;
		this.down = 9;
		this.right = 9;
		this.left = 9;
		this.diagonal = [true,8];
	}
}

class King extends Pawn
{
	constructor(x,y,dir,col)
	{
		super(x,y,dir,col);
		this.up = 1;
		this.down = 1;
		this.right = 1;
		this.left = 1;
		this.diagonal = [true,1];
	}

	draw()
	{
		super.draw();

		if(this.eaten)
			gameOver = true;
	}
}