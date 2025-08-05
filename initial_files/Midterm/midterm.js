var canvas;
var gl;
var program;
var vPosition;

var letter1vertices, letter2vertices;
var buffer1, buffer2;

// Global uniform locations
var uTranslationLoc, uScaleLoc, uColorLoc;

// Transformation and color state
var translation = [0.0, 0.0];
var scale = [1.0, 1.0];
var color = [1.0, 0.0, 0.0];

window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    vPosition = gl.getAttribLocation(program, "vPosition");
    uTranslationLoc = gl.getUniformLocation(program, "uTranslation");
    uScaleLoc = gl.getUniformLocation(program, "uScale");
    uColorLoc = gl.getUniformLocation(program, "uColor");

    // Define vertices for 'E' (left)
    letter1vertices = [
        // Sol dikey çubuk (daha uzun hale getirildi)
        vec2(-0.6,  0.3), vec2(-0.5,  0.3), vec2(-0.6, -0.4),
        vec2(-0.5,  0.3), vec2(-0.5, -0.4), vec2(-0.6, -0.4),
    
        // Üst yatay çubuk
        vec2(-0.5,  0.3), vec2(-0.2,  0.3), vec2(-0.5,  0.2),
        vec2(-0.2,  0.3), vec2(-0.2,  0.2), vec2(-0.5,  0.2),
    
        // Orta yatay çubuk (biraz daha yukarı alındı)
        vec2(-0.5,  0.03), vec2(-0.25, 0.03), vec2(-0.5, -0.05),
        vec2(-0.25, 0.03), vec2(-0.25, -0.05), vec2(-0.5, -0.05),
    
        // Alt yatay çubuk (aşağıya uzatıldı)
        vec2(-0.5, -0.3), vec2(-0.2, -0.3), vec2(-0.5, -0.4),
        vec2(-0.2, -0.3), vec2(-0.2, -0.4), vec2(-0.5, -0.4)
    ];
    
    
      
    // Define vertices for 'A' (right)
    letter2vertices = [
        vec2(0.2, 0.3), vec2(0.0, -0.4), vec2(0.1, -0.4),
        vec2(0.3, 0.3), vec2(0.2, 0.3), vec2(0.1, -0.4), 

        vec2(0.3, 0.3), vec2(0.4, -0.4), vec2(0.5, -0.4),    
        vec2(0.3, 0.3), vec2(0.2, 0.3), vec2(0.4, -0.4),  

        vec2(0.2, 0.0), vec2(0.3, 0.0), vec2(0.4, -0.1),
        vec2(0.1, -0.1), vec2(0.2, 0.0), vec2(0.4, -0.1)

    ];
 

    // Load the data into the GPU		
	buffer1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter1vertices), gl.STATIC_DRAW );  
  
    buffer2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, buffer2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(letter2vertices), gl.STATIC_DRAW );      

	// Slider event handlers
    document.getElementById("posX").oninput = function(event) {
        translation[0] = parseFloat(event.target.value);
    };
    document.getElementById("posY").oninput = function(event) {
        translation[1] = parseFloat(event.target.value);
    };
    document.getElementById("scaleX").oninput = function(event) {
        scale[0] = parseFloat(event.target.value);
    };
    document.getElementById("scaleY").oninput = function(event) {
        scale[1] = parseFloat(event.target.value);
    };
    document.getElementById("redSlider").oninput = function(event) {
        color[0] = parseFloat(event.target.value);
    };
    document.getElementById("greenSlider").oninput = function(event) {
        color[1] = parseFloat(event.target.value);
    };
    document.getElementById("blueSlider").oninput = function(event) {
        color[2] = parseFloat(event.target.value);
    };

    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
// Letter 1
gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);

gl.uniform2fv(uTranslationLoc, translation);
gl.uniform2fv(uScaleLoc, scale);
gl.uniform3fv(uColorLoc, color);
gl.drawArrays(gl.TRIANGLES, 0, letter1vertices.length);

// Letter 2 (opposite color)
gl.bindBuffer(gl.ARRAY_BUFFER, buffer2);
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);

gl.uniform2fv(uTranslationLoc, [translation[0], translation[1]]);
gl.uniform2fv(uScaleLoc, scale);
gl.uniform3fv(uColorLoc, [1 - color[0], 1 - color[1], 1 - color[2]]);
gl.drawArrays(gl.TRIANGLES, 0, letter2vertices.length);

    window.requestAnimFrame(render);
}