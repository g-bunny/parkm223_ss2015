#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_time;

float plot (vec2 everyPixel, float percentage){
	return smoothstep(percentage - 0.02, percentage, everyPixel.y) - smoothstep(percentage, percentage + 0.02, everyPixel.y);
}

float impulse( float k, float x) {
	float h = k * x;
	return h * exp(1.0 - h);
}

void main(){
	vec2 everyPixel = gl_FragCoord.xy/u_resolution;
	float exponent = u_mouse.x / u_resolution.x;
	float y = impulse(exponent, everyPixel.x);
	vec3 color = vec3(y);

	float percentage = plot(everyPixel,y);
	color = (1.0 - percentage) * color + percentage * vec3(0.0,1.0,0.0);

	gl_FragColor = vec4(color,1.0);

}