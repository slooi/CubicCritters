console.log('loaded main.js')


let oldTime = -new Date()
const fps = 60
let critters = []
let critterPos = [] 

init()

function init(){
	for(let i=0;i<1000;i++){
		critters[i] = createEntity(['aiControlled','mover'],{x:0,y:0,dir:0,speed:1})
	}

	looper()
}


function eachFrame(){
	critterPos = []	//!@#!@#
	critters.forEach(critter=>{
		critter.update()
		critterPos.push(...critter.getPos())
		// console.table(critterPos)
	})	
	render(critterPos)
}

function looper(){
	
	if(new Date()-oldTime>1000/fps){
		eachFrame()
		oldTime = new Date()
	}

	requestAnimationFrame(looper)
}
