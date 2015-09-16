#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec2 u_time;

float quadraticBezier (float x, float a, float b){
	float epsilon = 0.00001;
	a = max(0.0, min(1.0, a));
	b = max (0.0, min(1.0, b));
	if (a == 0.5){
		a += epsilon;
	}

	// solve t from x (an inverse operation)
	float om2a = 1.0 - 2.0 * a;
	float t = (sqrt(a*a + om2a*x) - a) / om2a;
	float y = (1.0-2.0*b)*(t*t) + (2.0*b)*t;
	return y;
}

float plot(vec2 everyPixel, float percentage){
	return smoothstep(percentage -0.02, percentage, everyPixel.y) - smoothstep(percentage, percentage + 0.02, everyPixel.y);
}

void main(){
	vec2 everyPixel = gl_FragCoord.xy/u_resolution;

	//can play around with exponent float to test different values
	float exponent = u_mouse.x / u_resolution.x;
	float y = quadraticBezier(exponent,everyPixel.x,everyPixel.y);
	vec3 color = vec3(y);
	
	float percentage = plot(everyPixel,y);
	color = (1.0 - percentage) * color + percentage * vec3(0.0,1.0,0.0);

	gl_FragColor = vec4(color,1.0);
}