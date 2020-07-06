var canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 500;
var gl = canvas.getContext("webgl");
gl.clearColor(0.0, 0.0, 0.0, 1.0);

gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// Add our canvas to the DOM (browser)
document.body.appendChild(canvas);

// f16-demo.js
var loadWFObj = require("load-wavefront-obj");
var loaded3dModel;

var modelJSON = require("./f16-model.json");

var image = new window.Image();
image.crossOrigin = "anonymous";
image.onload = loadModel;
image.src = "f16-texture.bmp";

// This prepare our data for the GPU
// so that we can later draw it
function loadModel() {
	loaded3dModel = loadWFObj(gl, modelJSON, {
		textureImage: image,
	});
}

var xRotation = 0;
// We render our model every request animation frame
var loop = require("raf-loop");

loop(function (dt) {
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Once we've loaded our model we draw it every frame
	if (loaded3dModel) {
		loaded3dModel.draw({
			position: [0, 0, -3.1],
			rotateX: xRotation,
		});
	}
	// Rotate our model by a little each frame
	xRotation += dt / 3000;
}).start();
