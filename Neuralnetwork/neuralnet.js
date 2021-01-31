var synaptic = require('synaptic');
this.network = new synaptic.Architect.Perceptron(2, 3, 1);
//var router = express.Router();
// create the network to define the layers of input and output
const { Layer, Network } = window.synaptic;

var inputLayer = new Layer(2);
var hiddenLayer = new Layer(3);
var outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var myNetwork = new Network({
	input: inputLayer,
	hidden: [hiddenLayer],
	output: outputLayer
});

//We simply define a for loop to set the data inputted to a truth-like value (1 or 0)
var learningRate = .3;
for (var i = 0; i < 20000; i++)
{
	// Resell Price is is near or below retail, item is not hype in the human's eyes => 0
	myNetwork.activate([false,"No"]);
	myNetwork.propagate(learningRate, [0]);

	// Resell Price low, Item is Hyped => 1
	myNetwork.activate([false,"Yes"]);
	myNetwork.propagate(learningRate, [1]);

	// Resell Price is x2 retail and more, Item is not hyped => 1
	myNetwork.activate([true,"No"]);
	myNetwork.propagate(learningRate, [1]);

	// Resell Price is x2 retail and more, Item is hyped => 1
	myNetwork.activate([true,"Yes"]);
	myNetwork.propagate(learningRate, [1]);
}

// test the network
console.log(myNetwork.activate([false,"No"])); // [0.0250207893401254527]
console.log(myNetwork.activate([false,"Yes"])); // [0.9815816381038985]
console.log(myNetwork.activate([true,"No"])); // [0.9851829457132193]
console.log(myNetwork.activate([true,"Yes"])); // [0.0248087641929467]