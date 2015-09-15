#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 everyPixel, float percentage){
	return smoothstep(percentage -0.02, percentage, everyPixel.y) - smoothstep(percentage, percentage + 0.02, everyPixel.y);
}

void main() {
	vec2 everyPixel = gl_FragCoord.xy/u_resolution;
	//exponent float set up for trying out different values: 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5
	float exponent = 1.0;

	//grid starts here.
	//first row
	// float y = 1.0 - pow(abs(everyPixel.x),exponent);
	//second row
	// float y = pow(cos(PI * everyPixel.x/2.0),exponent);
	//third row
	// float y = 1.0 - pow(abs(sin(PI * everyPixel.x/2.0)),exponent);
	//fourth row
	// float y = pow(min(cos(PI * everyPixel.x/2.0),1.0-abs(everyPixel.x)),exponent);
	//fifth row
	float y = 1.0 - pow(max(0.0, abs(everyPixel.x) * 2.0 - 1.0), exponent);
	vec3 color = vec3(y);

	float percentage = plot(everyPixel,y);

	color = (1.0 - percentage) * color + percentage * vec3(0.0,1.0,0.0);
	gl_FragColor = vec4(color,1.0);
}