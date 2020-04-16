console.log('loaded entities.js')



//################
// ENTITY HELPERS
//################
function addComponent(componentName){		//!@#!@#!@#!@#@! state => this.
	// component initialise THEN add function to state
	compInit(this,componentName)
	this[componentName] = comps[componentName].update

	// add componentName to list if not yet there
	if(this.componentList.indexOf(componentName) === -1){
		this.componentList.push(componentName)
	}
}
function updateEntity(){
	// exec all componentList
	this.componentList.forEach(componentName=>{
		this[componentName]()
	})
}
function removeComponent(componentName){
	compClean(this,componentName)	//!@#!@#!@# is THIS. neccessary
}
function addStats(entityStats){
	Object.assign(this,entityStats)
}
function getPos(){
	return [this.x,this.y]
}


//################
// ENTITY
//################
function createEntity(componentList,entityStats){
	const state = {
		compVarsCount:{},	// stores component vars and their counts
		componentList,		// list of component names. COMPONENT ORDER MATTERS
		...entityStats,

		// GENERAL FUNCTIONS
		update:updateEntity,
		add:addComponent,
		remove:removeComponent,
		addStats,
		getPos
	}
	

	// SETUP
	for(let i=0;i<componentList.length;i++){
		addComponent.bind(state)(componentList[i])		//!@#!@# is this the only way?
	}


	return state
}

// What did I previously do to the VALUES when it's COUNT = 0?
// Deletng the VALUE is a pain if I'm just going to be adding it back in