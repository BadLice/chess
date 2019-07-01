class Player
{
	constructor(col,up_down)
	{
		this.col = col;
		this.up_down=up_down;//true duwn or false up

		this.allItems = [];

		this.peds = [];
		for(var i=0;i<8;i++)
		{
			this.peds.push(new Ped(i,this.up_down ? 1 : 6,!this.up_down, this.col));
			this.allItems.push(this.peds[this.peds.length-1]);
		}


		this.towers = [];
		this.towers.push(new Tower(0 , this.up_down ? 0 : 7, !this.up_down, this.col));
		this.allItems.push(this.towers[this.towers.length-1]);
		this.towers.push(new Tower(7 ,this.up_down ? 0 : 7, !this.up_down, this.col));
		this.allItems.push(this.towers[this.towers.length-1]);

		this.horses = [];
		this.horses.push(new Horse(1, this.up_down ? 0 : 7, !this.up_down, this.col));
		this.allItems.push(this.horses[this.horses.length-1]);
		this.horses.push(new Horse(6, this.up_down ? 0 : 7, !this.up_down, this.col));
		this.allItems.push(this.horses[this.horses.length-1]);

		this.bishops = [];
		this.bishops.push(new Bishop(2, this.up_down ? 0 : 7, !this.up_down, this.col));
		this.allItems.push(this.bishops[this.bishops.length-1]);
		this.bishops.push(new Bishop(5, this.up_down ? 0 : 7, !this.up_down, this.col));
		this.allItems.push(this.bishops[this.bishops.length-1]);

		this.queen = new Queen(3, this.up_down ? 0 : 7, !this.up_down, this.col);
		this.allItems.push(this.queen);

		this.king = new King(4, this.up_down ? 0 : 7, !this.up_down, this.col);
		this.allItems.push(this.king);


	}

	draw()
	{
		for (var i = this.peds.length - 1; i >= 0; i--)
		{
			this.peds[i].draw();
			this.peds[i].update();
			//this.peds[i].move();
		}

		for (var i = this.towers.length - 1; i >= 0; i--)
		{
			this.towers[i].draw();
			//this.towers[i].update();
			//this.towers[i].move();
		}

		for (var i = this.horses.length - 1; i >= 0; i--)
		{
			this.horses[i].draw();
			//this.horses[i].update();
			//this.horses[i].move();
		}

		for (var i = this.bishops.length - 1; i >= 0; i--)
		{
			this.bishops[i].draw();
			//this.bishops[i].update();
			//this.bishops[i].move();
		}

		
		this.queen.draw();
		//this.queen.move();

		this.king.draw();
		//this.king.move();
	}

	move()
	{
		if(mouseIsPressed)
		{
			if(canPress)
			{	
				for (var i = this.allItems.length - 1; i >= 0; i--)
					if(!kingRip && !this.allItems[i].isMouseIn() && !this.allItems[i].isInPath(getCellMouse()[0],getCellMouse()[1]))
						this.allItems[i].selected=false;
			}
			canPress = false;
		}
		else
			canPress = true;
			

		for (var i = this.allItems.length - 1; i >= 0; i--)
			this.allItems[i].move();
	}
}