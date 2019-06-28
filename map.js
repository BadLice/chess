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
				c ? fill(118, 150, 86) : fill(255, 248, 232);
				rect(this.width/this.w*i,this.height/this.h*j,this.width/this.w,this.height/this.h);
				c=!c;
			}
			c=!c;
		}
		
		noFill();
		stroke(87, 60, 0);
		strokeWeight(5);
		rect(0,0,this.width-1,this.height-1);
	}
}