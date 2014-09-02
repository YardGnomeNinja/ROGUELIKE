
//  Octant data
//
//    \ 1 | 2 /
//   8 \  |  / 3
//   -----+-----
//   7 /  |  \ 4
//    / 6 | 5 \
//
//  1 = NNW, 2 =NNE, 3=ENE, 4=ESE, 5=SSE, 6=SSW, 7=WSW, 8 = WNW

// <summary>
// Start here: go through all the octants which surround the player to
// determine which open cells are visible
// </summary>
function recalculateFOV(floor) {
	game.player.visibleSpaces.length = 0;
	
	for(var i = 1; i <= 8; i++)
		ScanOctant(floor, 1, i, 1.0, 0.0);
		
	refreshFloor(floor);
	game.player.recalculateFOV = false;
}

function ScanOctant(floor, pDepth, pOctant, pStartSlope, pEndSlope)
{
	var visrange2 = game.player.viewRadius * game.player.viewRadius;
	var x = 0;
	var y = 0;
	
	switch (pOctant)
	{
		case 1: //nnw
			y = game.player.point.y - pDepth;
			if (y < 0) 
				return;

			x = game.player.point.x - Math.round(pStartSlope * pDepth);
			if (x < 0) 
				x = 0;

			while (GetSlope(x, y, game.player.point.x, game.player.point.y, false) >= pEndSlope)
			{
				if (GetVisDistance(x, y, game.player.point.x, game.player.point.y) <= visrange2)
				{
					if (game.map.floors[floor][x][y].tile.blocksFOV) //current cell blocked
					{
						// Allow player to see the blocking tile
						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
						
						if (x - 1 >= 0 && !game.map.floors[floor][x - 1][y].tile.blocksFOV) //prior cell within range AND open...						
							//...incremenet the depth, adjust the endslope and recurse
							ScanOctant(floor, pDepth + 1, pOctant, pStartSlope, GetSlope(x - 0.5, y + 0.5, game.player.point.x, game.player.point.y, false));
					}
					else
					{
						if (x - 1 >= 0 && game.map.floors[floor][x - 1][y].tile.blocksFOV) //prior cell within range AND open...
							//..adjust the startslope
							pStartSlope = GetSlope(x - 0.5, y - 0.5, game.player.point.x, game.player.point.y, false);

						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
					}
				}
				x++;
			}
			x--;
			break;

		case 2: //nne
			y = game.player.point.y - pDepth;
			if (y < 0) 
				return;

			x = game.player.point.x + Math.round(pStartSlope * pDepth);
			if (x >= game.map.max_width) 
				x = game.map.max_width - 1;

			while (GetSlope(x, y, game.player.point.x, game.player.point.y, false) <= pEndSlope)
			{
				if (GetVisDistance(x, y, game.player.point.x, game.player.point.y) <= visrange2)
				{
					if (game.map.floors[floor][x][y].tile.blocksFOV)
					{
						// Allow player to see the blocking tile
						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
						
						if (x + 1 < game.map.max_width && !game.map.floors[floor][x + 1][y].tile.blocksFOV)
							ScanOctant(floor, pDepth + 1, pOctant, pStartSlope, GetSlope(x + 0.5, y + 0.5, game.player.point.x, game.player.point.y, false));
					}
					else
					{
						if (x + 1 < game.map.max_width && game.map.floors[floor][x + 1][y].tile.blocksFOV)
							pStartSlope = -GetSlope(x + 0.5, y - 0.5, game.player.point.x, game.player.point.y, false);

						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
					}
				}
				x--;
			}
			x++;
			break;
			
		case 3:
			x = game.player.point.x + pDepth;
			if (x >= game.map.max_width) 
				return;

			y = game.player.point.y - Math.round(pStartSlope * pDepth);
			if (y < 0) 
				y = 0;

			while (GetSlope(x, y, game.player.point.x, game.player.point.y, true) <= pEndSlope)
			{
				if (GetVisDistance(x, y, game.player.point.x, game.player.point.y) <= visrange2)
				{
					if (game.map.floors[floor][x][y].tile.blocksFOV)
					{
						// Allow player to see the blocking tile
						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
						
						if (y - 1 >= 0 && !game.map.floors[floor][x][y - 1].tile.blocksFOV)
							ScanOctant(floor, pDepth + 1, pOctant, pStartSlope, GetSlope(x - 0.5, y - 0.5, game.player.point.x, game.player.point.y, true));
					}
					else
					{
						if (y - 1 >= 0 && game.map.floors[floor][x][y - 1].tile.blocksFOV)
							pStartSlope = -GetSlope(x + 0.5, y - 0.5, game.player.point.x, game.player.point.y, true);

						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
					}
				}
				y++;
			}
			y--;
			break;

		case 4:
			x = game.player.point.x + pDepth;
			if (x >= game.map.max_width) 
				return;

			y = game.player.point.y + Math.round(pStartSlope * pDepth);
			if (y >= game.map.max_height) 
				y = game.map.max_height - 1;

			while (GetSlope(x, y, game.player.point.x, game.player.point.y, false) >= pEndSlope)
			{
				if (GetVisDistance(x, y, game.player.point.x, game.player.point.y) <= visrange2)
				{
					if (game.map.floors[floor][x][y].tile.blocksFOV)
					{
						// Allow player to see the blocking tile
						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
						
						if (y + 1 < game.map.max_height && !game.map.floors[floor][x][y + 1].tile.blocksFOV)
							ScanOctant(floor, pDepth + 1, pOctant, pStartSlope, GetSlope(x - 0.5, y + 0.5, game.player.point.x, game.player.point.y, true));
					}
					else
					{
						if (y + 1 < game.map.max_height && game.map.floors[floor][x][y + 1].tile.blocksFOV)
							pStartSlope = GetSlope(x + 0.5, y + 0.5, game.player.point.x, game.player.point.y, true);

						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
					}
				}
				y--;
			}
			y++;
			break;

		case 5:
			y = game.player.point.y + pDepth;
			if (y >= game.map.max_height) 
				return;

			x = game.player.point.x + Math.round(pStartSlope * pDepth);
			if (x >= game.map.max_width) 
				x = game.map.max_width - 1;

			while (GetSlope(x, y, game.player.point.x, game.player.point.y, false) >= pEndSlope)
			{
				if (GetVisDistance(x, y, game.player.point.x, game.player.point.y) <= visrange2)
				{
					if (game.map.floors[floor][x][y].tile.blocksFOV)
					{
						// Allow player to see the blocking tile
						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
						
						if (x + 1 < game.map.max_width && !game.map.floors[floor][x + 1][y].tile.blocksFOV)
							ScanOctant(floor, pDepth + 1, pOctant, pStartSlope, GetSlope(x + 0.5, y - 0.5, game.player.point.x, game.player.point.y, false));
					}
					else
					{
						if (x + 1 < game.map.max_width && game.map.floors[floor][x + 1][y].tile.blocksFOV) // Original version used max_height... was that a bug or is this a bug? Or should it be using y instead of x?
							pStartSlope = GetSlope(x + 0.5, y + 0.5, game.player.point.x, game.player.point.y, false);

						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
					}
				}
				x--;
			}
			x++;
			break;

		case 6:
			y = game.player.point.y + pDepth;
			if (y >= game.map.max_height) return;

			x = game.player.point.x - Math.round(pStartSlope * pDepth);
			if (x < 0) 
				x = 0;

			while (GetSlope(x, y, game.player.point.x, game.player.point.y, false) <= pEndSlope)
			{
				if (GetVisDistance(x, y, game.player.point.x, game.player.point.y) <= visrange2)
				{
					if (game.map.floors[floor][x][y].tile.blocksFOV)
					{
						// Allow player to see the blocking tile
						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
						
						if (x - 1 >= 0 && !game.map.floors[floor][x - 1][y].tile.blocksFOV)
							ScanOctant(floor, pDepth + 1, pOctant, pStartSlope, GetSlope(x - 0.5, y - 0.5, game.player.point.x, game.player.point.y, false));
					}
					else
					{
						if (x - 1 >= 0 && game.map.floors[floor][x - 1][y].tile.blocksFOV)
							pStartSlope = -GetSlope(x - 0.5, y + 0.5, game.player.point.x, game.player.point.y, false);

						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
					}
				}
				x++;
			}
			x--;
			break;

		case 7:
			x = game.player.point.x - pDepth;
			if (x < 0) 
				return;

			y = game.player.point.y + Math.round(pStartSlope * pDepth);
			if (y >= game.map.max_height) 
				y = game.map.max_height - 1;

			while (GetSlope(x, y, game.player.point.x, game.player.point.y, true) <= pEndSlope)
			{
				if (GetVisDistance(x, y, game.player.point.x, game.player.point.y) <= visrange2)
				{
					if (game.map.floors[floor][x][y].tile.blocksFOV)
					{
						// Allow player to see the blocking tile
						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
						
						if (y + 1 < game.map.max_height && !game.map.floors[floor][x][y + 1].tile.blocksFOV)
							ScanOctant(floor, pDepth + 1, pOctant, pStartSlope, GetSlope(x + 0.5, y + 0.5, game.player.point.x, game.player.point.y, true));
					}
					else
					{
						if (y + 1 < game.map.max_height && game.map.floors[floor][x][y + 1].tile.blocksFOV)
							pStartSlope = -GetSlope(x - 0.5, y + 0.5, game.player.point.x, game.player.point.y, true);

						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
					}
				}
				y--;
			}
			y++;
			break;

		case 8: //wnw
			x = game.player.point.x - pDepth;
			if (x < 0) 
				return;

			y = game.player.point.y - Math.round(pStartSlope * pDepth);
			if (y < 0) 
				y = 0;

			while (GetSlope(x, y, game.player.point.x, game.player.point.y, true) >= pEndSlope)
			{
				if (GetVisDistance(x, y, game.player.point.x, game.player.point.y) <= visrange2)
				{
					if (game.map.floors[floor][x][y].tile.blocksFOV)
					{
						// Allow player to see the blocking tile
						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
						
						if (y - 1 >= 0 && !game.map.floors[floor][x][y - 1].tile.blocksFOV)
							ScanOctant(floor, pDepth + 1, pOctant, pStartSlope, GetSlope(x + 0.5, y - 0.5, game.player.point.x, game.player.point.y, true));
					}
					else
					{
						if (y - 1 >= 0 && game.map.floors[floor][x][y - 1].tile.blocksFOV)
							pStartSlope = GetSlope(x - 0.5, y - 0.5, game.player.point.x, game.player.point.y, true);

						game.player.visibleSpaces.push(game.map.floors[floor][x][y].point);
					}
				}
				y++;
			}
			y--;
			break;
	}

	if (x < 0)
		x = 0;
	else if (x >= game.map.max_width)
		x = game.map.max_width - 1;

	if (y < 0)
		y = 0;
	else if (y >= game.map.max_height)
		y = game.map.max_height - 1;

	if (pDepth < game.player.viewRadius & !game.map.floors[floor][x][y].tile.blocksFOV)
		ScanOctant(floor, pDepth + 1, pOctant, pStartSlope, pEndSlope);
}

// <summary>
// Get the gradient of the slope formed by the two points
// </summary>
// <param name="pX1"></param>
// <param name="pY1"></param>
// <param name="pX2"></param>
// <param name="pY2"></param>
// <param name="pInvert">Invert slope</param>
// <returns></returns>
function GetSlope(pX1, pY1, pX2, pY2, pInvert)
{
	if (pInvert)
		return (pY1 - pY2) / (pX1 - pX2);
	else
		return (pX1 - pX2) / (pY1 - pY2);
}


// <summary>
// Calculate the distance between the two points
// </summary>
// <param name="pX1"></param>
// <param name="pY1"></param>
// <param name="pX2"></param>
// <param name="pY2"></param>
// <returns>Distance</returns>
function GetVisDistance(pX1, pY1, pX2, pY2)
{
	return ((pX1 - pX2) * (pX1 - pX2)) + ((pY1 - pY2) * (pY1 - pY2));
}
