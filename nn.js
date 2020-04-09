console.log('loaded nn.js')






class NeuralNetwork{
	constructor(){
	}
}

// Creates new weights and new biases for Neural Network
NeuralNetwork.prototype.build = function(nodesPerLayer){
	// nodesPerLayer - List specifying number of nodes per layer
	// EG: [numberOfInputs, numberOfHidden1, numberOfHidden2, ... numberOfOutputs]
	this.weights = []	// nodesPerLayer.length - 1
	this.biases = []	// nodesPerLayer.length - 1

	// check
	if(nodesPerLayer.length < 2){
		throw new Error('ERROR: nodesPerLayer.length < 2')
	}

	// populate weights
	for(let i=0;i<nodesPerLayer.length-1;i++){
		this.weights[i] = mCreate(nodesPerLayer[i+1],nodesPerLayer[i],1)
		this.biases[i] = mCreate(nodesPerLayer[i+1],1,1)
	}
}

NeuralNetwork.prototype.feedforward = function(inputs){
	// inputs - Array []
	if(inputs.length !== this.weights[0][0].length){
		// Check that # of inputs match number of inputs into neural network
		throw new Error('ERROR: inputs.length === this.weights[0][0].length')
	}

	// feedforward
	let result = toVector(inputs)	// convert from 1D => 2D
	for(let i=0;i<this.weights.length;i++){
		result = mMulti(this.weights[i],result)
		result = mAdd(result,this.biases[i])
		result = mSig(result)
	}
	return result
}


NeuralNetwork.prototype.load = function(weights,biases){
	
}


// TEST IF ONLY ONE LAYERR !@#!@#!@#
















/* 
RETURNS: new array
*/
function mCreate(rows,cols,amplitude){
	mCreateTest(rows,cols,amplitude)
	const m = new Array(rows)
	for(let i=0;i<rows;i++){
		m[i] = new Array(cols)
		for(let j=0;j<cols;j++){
			m[i][j] = Math.random()*amplitude*2-amplitude
		}
	}
	return m
}

/* 
ASSUMES: 
m1 & m2 NOT empty array
m1 & m2 EQUAL length
m1 & m2 are COLUMN MATRIX	!!!
RETURNS: element wise addition
*/
function mAdd(m1,m2){
	mAddTest(m1,m2)
	const newM = new Array(m1.length)
	for(let i=0;i<m1.length;i++){
		newM[i] = [m1[i][0]+m2[i][0]]
	}
	
	return newM
}

/* 
ASSUMES:
m and v NOT empty
m[0].length and v.length SAME (Matrix * Vector)


RETURNS:
COLUMN
*/

function mMulti(m,v){
	mMultiTest(m,v)
	const newM = new Array(m.length)
	let sum
	for(let i=0;i<m.length;i++){
		newM[i] = new Array()
		sum=0
		for(let j=0;j<v.length;j++){
			sum += m[i][j] * v[j][0]
		}
		newM[i][0] = sum
	}

	return newM
}


/* 
RETURNS: Deep copy of matrix or vector
*/
function mCopy(m){
	mCopyTest(m)
	const newM = new Array(m.length)
	for(let i=0;i<m.length;i++){
		newM[i] = new Array(m[0].length)
		for(let j=0;j<m[0].length;j++){
			newM[i][j] = m[i][j]
		}
	}
	return newM
}


function mMutate(m,amplitude){
	mMutateTest(m,amplitude)
	const newM = new Array(m.length)
	for(let i=0;i<m.length;i++){
		newM[i] = new Array(m[0].length)
		for(let j=0;j<m[0].length;j++){
			newM[i][j] = m[i][j]-amplitude+amplitude*2*Math.random()
		}
	}
	return newM
}

/* 
ASSUMES:

RETURNS:
VECTOR with sigmoid applied
*/
function mSig(m){
	mSigTest(m)
	const newM = new Array(m.length)
	for(let i=0;i<m.length;i++){
		newM[i] = [sig(m[i][0])]
	}
	return newM
}


/* 

RETURNS:
A 1D array with a 2D arr / vector
*/
function toVector(arr){
	toVectorTest(arr)
	const newM = new Array(arr.length)
	for(let i=0;i<arr.length;i++){
		newM[i] = [arr[i]]
	}
	return newM
}

function sig(x){
	return 1/(1+Math.exp(-x))
}

// TESTS
function toVectorTest(arr){
	// empty array
	if(arr.length === 0){
		throw new Error('ERROR: arr.length === 0')
	}
	// if not 1D array
	if(typeof arr[0] !== 'number'){
		throw new Error(`ERROR: typeof arr[0] !== 'number'`)
	}
}

function mSigTest(m){
	// Empty array
	if(m.length === 0){
		throw new Error('ERROR: m.length === 0')
	}
	// Column array
	if(!(m[0].length === 1)){
		throw new ERROR('ERROR: !(m[0].length === 1)')
	}
}

function mMutateTest(m,amplitude){
	// If not a number
	if(isNaN(amplitude)){
		throw new Error('ERROR: isNaN(amplitude)')
	}
	if(m.length === 0){
		throw new Error('ERROR: m.length === 0')
	}
	if(m[0].length === 0){
		throw new Error('ERROR: m[0].length === 0')
	}
}

function mCopyTest(m){
	if(m.length === 0){
		throw new Error('ERROR: m.length === 0')
	}
	if(m[0].length === 0){
		throw new Error('ERROR: m[0].length === 0')
	}
}

function mMultiTest(m,v){
	// m and v NOT Empty array
	if(m.length === 0 || v.length === 0){
		throw new Error('ERROR: m.length === 0 || v.length === 0')
	}
	
	// m row.length === vector.length
	if(m[0].length !== v.length){
		throw new Error('ERROR: m[0].length !== v.length')
	}
}

function mAddTest(m1,m2){
	// if m1 or m2 are empty
	if(m1.length === 0 || m2.length === 0){
		throw new Error('ERROR: m1.length === 0 || m2.length === 0')
	}
	// m1 !== m2 length
	if(m1.length !== m2.length){
		throw new Error('ERROR: m1.length !== m2.length')
	}
	// m1, m2 => 1 column
	if(!(m1[0].length === 1 && m2[0].length === 1)){
		throw new Error('!(m1[0].length === 1 && m2[0].length === 1)')
	}
}

function mCreateTest(rows,cols,amplitude){
	if(isNaN(amplitude)){
		throw new Error('ERROR: isNaN(amplitude)')
	}
	if(rows <= 0 || cols <= 0){
		throw new Error('ERROR: rows <= 0 || cols <= 0')
	}
}

/* 
TESTING


###########################
################## mMulti
a = [[1,2,3],[4,5,6]]
b = [[6],[7],[3]]
mMulti(a,b)
0: [29]
1: [77]


a = [[1],[4]]
b = [[6]]
mMulti(a,b)
0: [6]
1: [24]


###########################
################## mAdd
a = [[1],[4]]
b = [[6],[-1]]
mAdd(a,b)
0: [7]
1: [3]

a = [[1],[0],[-1]]
b = [[6],[-4],[-1]]
mAdd(a,b)
0: [7]
1: [-4]
2: [-2]

*/