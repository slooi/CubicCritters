console.log('loaded grid.js')

const quadConfig = {
	maxPoints: 1,
	maxLayer:4
}
let outsidePoints = []
let foundNeighbours = []
let searchedNodes = []

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
	outsidePoints = []

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

///!@#!@#!@# WATCH OUT FOR OVERLAPPING POINTS
// !@# maximum number of splits === 4
// what happens if less than 5 critters?
// What happens if no parent?




function collectPoints(arr,state,num){
	for(let i=0;i<arr.length;i++){
		const point = arr[i]
		if(state!==point){
			// if point not itself

			const neighbourDis2 = dis2(state.x,state.y,point.x,point.y)
			// add point in ORDERED list
			// console.log(foundNeighbours.length)
			if(foundNeighbours.length>num){
				foundNeighbours.length = num
			}	
			// console.log(foundNeighbours.length)
			const idx = getIndex2(neighbourDis2,foundNeighbours,state)
			if(idx<num){
				foundNeighbours.splice(idx,0,point)	
			}
		}
	}
}

// radius = 50
// radius *= 2
/* 						100
						200 */
Node.prototype.radiusSearch = function(radius2,state,num){
	// searches in a radius around the state.
	// radius expands if can't find 'num' number of states
	// afterwards add outsidePoints
	
	if(dis2PointToRect(state.x,state.y,this.x,this.y,this.x+this.w,this.y+this.h)<radius2){
		if(this.tl === undefined){
			if(this.searched === false){
				// Haven't already searched

				// Bottom node
				collectPoints(this.points,state,num)
				// marked
				searchedNodes.push(this)
				this.searched = true
			}
		}else{
			this.tl.radiusSearch(radius2,state,num)
			this.tr.radiusSearch(radius2,state,num)
			this.bl.radiusSearch(radius2,state,num)
			this.br.radiusSearch(radius2,state,num)
		}
	}
}

Node.prototype.radiusSearchInit = function(state,num){
	// THIS IS WHAT I WILL INTERFACE WITH

	// qwe = 0
	// init
	clearSearched()
	foundNeighbours = []
	let radius2 = (50**2)/2
	while(foundNeighbours.length<num && radius2<(canvas.width+canvas.height)**2){
		// until got min OR essentially search all of quadtree
		radius2=((radius2**0.5)*2)**2		//!@#!@#!@#!@#!@# code around here kinda abitrary
		this.radiusSearch(radius2,state,num)
		
		// qwe++
	}
	// if(qwe>2){
	// 	console.log(qwe)
	// }
	
	collectPoints(outsidePoints,state,num)

	
	if(foundNeighbours.length >= num){
		// found minimum number of neighbours
		let lastNeighbourDis2 = dis2(state.x,state.y,foundNeighbours[num-1].x,foundNeighbours[num-1].y)
		if(radius2>=lastNeighbourDis2){
			// If searched more than the distance to 'num' closest
			foundNeighbours.length = 5
			return foundNeighbours
		}else{
			while(lastNeighbourDis2>radius2){
				radius2 = lastNeighbourDis2
				this.radiusSearch(radius2,state,num)
				lastNeighbourDis2 = dis2(state.x,state.y,foundNeighbours[num-1].x,foundNeighbours[num-1].y)
			}
			foundNeighbours.length = 5
			return foundNeighbours
		}
	}else{
		// didn't find min num of neighbours
		// !@#!@#!@#!@#
		this.radiusSearch(Infinity,state,num)
		
		// console.log("COULDN'T FIND ANY!!!!! D:")
		foundNeighbours.length = 5
		return foundNeighbours
	}



}


function clearSearched(){
	searchedNodes.forEach(node=>{
		node.searched = false
	})
	searchedNodes = []
	// searchedNodes = []
}