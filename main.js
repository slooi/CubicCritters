console.log('loaded main.js')


let oldTime = -new Date()
let fps = 60
let critterList = []
// let foodList = []
let critterPos = [] 
let grid
const halfW = canvas.width/2
const halfH = canvas.height/2


init()

function init(){
	for(let i=0;i<500;i++){
		critterList[i] = createEntity(['nnControlled','mover'],{x:halfW,y:halfH,dir:Math.random()*Math.PI*2,speed:1,nn:createNeuralNetwork()})
	}

	looper()
}


function eachFrame(){
	clearData2()
	critterPos = []	//!@#!@#


	// grid
	grid = new Node(0,0,canvas.width,canvas.height,0,null)
	critterList.forEach(critter=>{
		grid.addCheck(critter)
	})

	// critter
	critterList.forEach(critter=>{
		critter.update()
		critterPos.push(...critter.getPos())
		// console.table(critterPos)
	})

	// render stuff
	clearCanvas()
	// render2()
	render(critterPos)
}

function looper(){
	
	if(new Date()-oldTime>1000/fps){
		eachFrame()
		oldTime = new Date()
	}

	requestAnimationFrame(looper)
}
