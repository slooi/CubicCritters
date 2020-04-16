console.log('loaded grid.js')

const quadConfig = {
	maxPoints: 1,
	maxLayer:4
}
let outsidePoints = []
let foundNeighbours = []
let searchedNodes = []
let nearestDis2 = Infinity

class Node{
	constructor(x,y,width,height,layer,parent){
		this.x = x	// x and y => top left
		this.y = y
		this.w = width
		this.h = height
		this.points = []
		this.layer = layer		//0 root node
		this.parent = parent
		this.searched = false
		rect(this.x,this.y,this.x+this.w,this.y+this.h)
	}
}

Node.prototype.addCheck = function(obj){
	// THIS IS THE ONE I WILL INTERFACE WITH
	if(this.pointInside(obj)){
		this.add(obj)
	}else{
		if(this.layer === 0){
			// If ROOT node
			outsidePoints.push(obj)
			obj.node = outsidePoints		// Add outsidePoints to OBJECT
		}
	} 
}

Node.prototype.add = function(obj){
	// ASSUMES all points are inside
	if(this.tl === undefined){
		// If bottom most node
		this.points.push(obj)
		obj.node = this		// Add node to OBJECT

		if(this.points.length > quadConfig.maxPoints){
			if(this.layer !== quadConfig.maxLayer){
				// NOT last layer
				this.overflow()
				this.points = null
			}
		}
	}else{
		// Has children nodes
		this.addToChildren(obj)
	}
}

Node.prototype.overflow = function(){
	// num of points exceed max capacity of node
	// remo

	// create children nodes
	const w2 = this.w/2
	const h2 = this.h/2
	const l2 = this.layer+1
	this.tl = new Node(this.x,this.y,					w2,h2,		l2, this)
	this.tr = new Node(this.x+w2,this.y,			w2,h2,		l2, this)
	this.bl = new Node(this.x,this.y+h2,			w2,h2,		l2, this)
	this.br = new Node(this.x+w2,this.y+h2,		w2,h2,		l2, this)

	//
	for(let i=this.points.length-1;i>=0;i--){
		this.addToChildren(this.points[i])
	}
}

Node.prototype.addToChildren = function(obj){
	if(this.tl.pointInside(obj)){
		this.tl.add(obj)
	}else{
		if(this.tr.pointInside(obj)){
			this.tr.add(obj)
		}else{
			if(this.bl.pointInside(obj)){
				this.bl.add(obj)
			}else{
				if(this.br.pointInside(obj)){
					this.br.add(obj)
				}else{
					alert('ERROR: this should not be happening!')
				}
			}
		}
	}
	
}

// If outside node.
// 
Node.prototype.pointInside = function(obj){
	// If points inside node
	if(obj.x>=this.x && obj.x<this.x+this.w && obj.y >= this.y && obj.y<this.y+this.h){
		return true
	}else{
		return false
	}
}

Node.prototype.search2 = function(state){
	/* 
		searched = true
		add to foundNeighbours
		add in ORDER
		when got 5 or more STOP

		get the distance of the furthest from state, then search all nodes 
		in that readius around state
		when adding these new ones in,

	*/

	// get nearest distance of points

	if(this.tl === undefined){
		// bottom node
		collectPoints(this.points,state)

		// mark
		this.searched = true
		searchedNodes.push(this)
	}else{
		// has children nodes
		if(!this.searched){
			this.tl.search2(state)
			this.tr.search2(state)
			this.bl.search2(state)
			this.br.search2(state)

			// mark
			this.searched = true
			searchedNodes.push(this)
		}else{
			console.log('Already searched')
		}
	}
}


/* 
node
look at parent
parent inspects children
*/

Node.prototype.search = function(state,num){
	// search children
	this.tl.search2(state)
	this.tr.search2(state)
	this.bl.search2(state)
	this.br.search2(state)

	while(foundNeighbours.length < 5 && this.parent !== null){
		// propagate upwards
		this.parent.search(state,num)
	}
}

Node.prototype.nearestNeighbours = function(state,num,grid){
	// I WILL INTERFACE WITH THIS

	foundNeighbours=[]
	searchedNodes = []
	nearestDis2 = Infinity

	// finds 'num' nearest neighbours from 'state'
	// this.
	if(state.node.length === undefined){
		// is NODE
		// search INSIDE then OUTSIDE, ALWAYS SEARCH OUTSIDE		//!@#!@#!@#

		// SEARCH THIS NODE then go to parent!
		// THEN LOOP OVER OUTSIDE
		if(this.parent === null){
			// no parents
			// searcch everything
			alert('fix this later 2!!!')
		}else{
			// Phase 1 search - find at least 5 points
			this.parent.search(state,num)

			// Phase 2 search - add outsidePoints
			collectPoints(outsidePoints,state)

			// Phase 3 search - search nodes in range dis(foundNeighbours[4]-state) from state
			// top down approach
			// MAY NOT HAVE 5 FOUND neighbours YET
			// Keep 
			grid.topDownSearch(state)

			// May not have found 5 neighbours yet
		}

		clearSearchedNodes()
		return foundNeighbours
	}else{
		// searcch everything
		// is OUTSIDEPOINTS
		alert('FIX THIS LATER')

		// search outside THEN inside, ALWAYS SEARCH OUTSIDE		//!@#!@#!@#
		// LOOP OVER ALL CRITTERS IN NODE AND OUTSIDE
		foundNeighbours.push(...this.points)

		clearSearchedNodes()
		return foundNeighbours
	}
}

// searches top down. 
// 1) watch out: only have 3 found neighbours => already searched entire grid and off grid.
// if foundNeighbours<5 => ALL nodes been Searched and nothing else to do
// 2) foundNeighbours>=5 => SOME or ALL nodes been Searched 
// GOAL: search all nodes within dis2(foundNeighbours[4]-state) from state
Node.prototype.topDownSearch = function(state){
	if(this.searched === false){
		// hasn't been searched
		if(this.tl === undefined){
			// Bottom node
			
		}else{
			this.tl = this.topDownSearch(state)
			this.tr = this.topDownSearch(state)
			this.bl = this.topDownSearch(state)
			this.br = this.topDownSearch(state)
		}
	}
}

///!@#!@#!@# WATCH OUT FOR OVERLAPPING POINTS
// !@# maximum number of splits === 4
// what happens if less than 5 critters?
// What happens if no parent?




function collectPoints(arr,state){
	arr.forEach(point=>{
		const dis2 = dis2(state.x,state.y,point.x,point.y)
		// add point in ORDERED list
		console.log('index',getIndex2(dis2,foundNeighbours,state))
		foundNeighbours.splice(getIndex2(dis2,foundNeighbours,state),0,point)
		if(dis2<nearestDis2){
			// update nearest
			nearestDis2 = dis2
			console.log('TRUE. ^ index should be 0')
		}
	})
}

function clearSearchedNodes(){
	searchedNodes.forEach(node=>{
		node.searched = false
	})
	// searchedNodes = []   Cleared on init
}