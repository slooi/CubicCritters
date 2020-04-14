console.log('loaded components.js')


//######################
// COMPONENT HELPERS
//######################
const compInit = function(state,componentName){

	if(state[componentName] !== undefined){
		throw new Error('ERROR: component: '+componentName+', already exists')
	}

	// check if has all dependents that are NOT except are in state.compVars
	Object.keys(comps[componentName].dependents).forEach(dependent=>{
		if(state.compVarsCount[dependent] === undefined){
			// COUNT Currently doesn't exist
			state.compVarsCount[dependent] = 1
		}else{
			// COUNT Increase
			state.compVarsCount[dependent]++
		}
		
		// Test if variable is EXCEPT
		if(comps[componentName].except[dependent] === undefined){
			// VALUE must already been set
			if(state[dependent] === undefined){
				throw new Error(`ERROR: "${componentName}" dependent "${dependent}" NOT set.`)
			}
		}else{
			// VALUE can preset
			if(state[dependent] === undefined){
				// if NOT yet set
				state[dependent] = comps[componentName].except[dependent]
			}
			// if ALREADY set, do nothing
		}
		// if dependents dont exist in entity THROW ERROR unless in except
	})

}


const compClean = function(state,componentName){
	// check
	if(state[componentName] === undefined){
		throw new Error("ERROR: can't clean undefined component: "+componentName)
	}

	// decrease COUNT
	Object.keys(comps[componentName].dependents).forEach(dependent=>{
		state.compVarsCount[dependent]--

		if(state.compVarsCount[dependent]===0){
			// if COUNT === 0 then delete COUNT and VALUE
			delete state.compVarsCount[dependent]
			delete state[dependent]
		}
	})

	// remove function
	delete state[componentName]
	// remove from componentList
	const componentIndex = state.componentList.indexOf(componentName) 
	if(componentIndex !== -1){	// !@#!@# useless double check
		state.componentList.splice(componentIndex,1)
	}


}

//######################
// COMPONENTS
//######################
const comps = {
	mover: {
		dependents:{
			// check if these exist in entity. Values don't matter
			x:null,
			y:null,
			delX:null,
			delY:null,
		},
		except:{
			// can preset, thus have to already exist. Values MATTER
			delX:0,
			delY:0
		},
		update: function(){
			this.x += this.delX
			this.y += this.delY
		},
	},
	aiControlled:{
		dependents:{
			dir:0,
			speed:0,
			delX:0,
			delY:0
		},
		except:{
			delX:0,
			delY:0
		},
		update: function(){
			this.dir+=Math.PI*0.1
			this.delX = Math.cos(this.dir)*this.speed
			this.delY = Math.sin(this.dir)*this.speed
		}
	}

	



}

/* 
TO DO LIST:
- add compvars to entity compvars
- remove compvars from entity compvars

*/