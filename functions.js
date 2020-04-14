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