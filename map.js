class Map
{
	constructor()
	{
		this.w = 8;
		this.h = 8;
		this.height = 802;
		this.width = 802;
	}

	draw()
	{
		var c = true;
		for (var i = 8 - 1; i >= 0; i--)
		{
			for (var j =8 - 1; j >= 0; j--)
			{
				noStroke();
				c ? fill(0) : fill(255);
				rect(this.width/this.w*i,this.height/this.h*j,this.width/this.w,this.height/this.h);
				c=!c;
			}
			c=!c;
		}
		
		noFill();
		stroke(173, 255, 107);
		rect(0,0,this.width-1,this.height-1);
	}
}