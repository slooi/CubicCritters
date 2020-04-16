console.log('functions.js loaded')


// find nearest 5 critters

// find nearest 9 walls

// find nearest 4 food
function getNearestCritters(state){
	// if not self
	const nearestCritters = []
	const nearestDistances = []
	let nearestDistance = Infinity
	critterList.forEach(critter=>{
		if(dis2(state.x,state.y,critter.x,critter.y))
		nearestDistances.push(dis2(state.x,state.y,critter.x,critter.Y))
	})
}


function dis2(ox,oy,tx,ty){
	return (tx-ox)**2+(ty-oy)**2
}

// Returns index value where value should be inserted into an ordered array
function getIndex(val,arr){
	let low = 0
	let high = arr.length
	let mid
	while(low!==high){
		mid = low+high>>>1
		if(val<arr[mid]){
			high = mid
		}else{
			low = mid+1
		}
	}
	return low
}

function getIndex2(distance,arr,state){
	let low = 0
	let high = arr.length
	let mid
	while(low!==high){
		mid = low+high>>>1
		if(distance<dis2(state.x,state.y,arr[mid].x,arr[mid].y)){
			high = mid
		}else{
			low = mid+1
		}
	}
	return low
}


function dis2PointToRect(px,py,x1,y1,x2,y2){
	/* Assumes:
		x1,y1 => top, left
		x2,y2 => bottom, right
	*/
	const xDis2A = Math.abs(x1-px)
	const xDis2B = Math.abs(x2-px)
	const yDis2A = Math.abs(y1-py)
	const yDis2B = Math.abs(y2-py)
	const xMin = xDis2A<xDis2B ? xDis2A:xDis2B
	const yMin = yDis2A<yDis2B ? yDis2A:yDis2B
	const inX = px>=x1 && px<=x2
	const inY = py>=y1 && py<=y2
	if(inX && inY){
		return 0
	}else	if(inX){
		// If point lies within the bounds of ONE axis
		return yMin*yMin
	}else if (inY){
		return xMin*xMin
	}else{
		// use distance2
		return xMin**2+yMin**2
		// return Math.sqrt(xMin**2+yMin**2)
		//!@#!@#!@#!@#!@# HAVEN'T TESTED
	}

}


// function collisionRectToRect(x1,y1,x2,y2,x3,y3,x4,y4){

// }