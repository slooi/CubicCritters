console.log('loaded main.js')


let oldTime = new Date()
const fps = 1
let critters = []









function eachFrame(){
	critters.forEach(critter=>{
		
	})
}



function looper(){
	
	if(new Date()-oldTime>1000/fps){
		eachFrame()
	}

	requestAnimationFrame(looper)
}