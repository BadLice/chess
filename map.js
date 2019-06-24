class Map
{
	constructor()
	{
		this.w = 8;
		this.h = 8;
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
				rect(width/this.w*i,height/this.h*j,width/this.w,height/this.h);
				c=!c;
			}
			c=!c;
		}
		
		noFill();
		stroke(173, 255, 107);
		rect(0,0,width-1,height-1);
	}
}