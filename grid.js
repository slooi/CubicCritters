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

Node.prototype.radiusSearch = function(){
	
}
// foundNeighbours=[]
// searchedNodes = []
// nearestDis2 = Infinity