console.log('loaded main.js')


let oldTime = -new Date()
const fps = 1
let critters = []


init()

function init(){
	for(let i=0;i<100;i++){
		critters[i] = createEntity(['aiControlled','mover'],{x:0,y:0,dir:0,speed:10})
	}

	looper()
}


function eachFrame(){
	critters.forEach(critter=>{
		critter.update()
	})
}

function looper(){
	
	if(new Date()-oldTime>1000/fps){
		eachFrame()
		oldTime = new Date()
	}

	requestAnimationFrame(looper)
}
