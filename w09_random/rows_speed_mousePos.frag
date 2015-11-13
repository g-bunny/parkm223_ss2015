
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(in float x){
	return fract(sin(x)*1e4);
}
//float random(in vec2 st){
//	return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
//}

float randomSeries(float x, float freq, float t){
	return step(.5, random(floor(x*freq)-floor(t)));
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.0);
	float freq = random(floor(u_time))+abs(fract(atan(u_time)));
	float t = 50. +u_time*(freq)*50.;


	st *= u_mouse.x/10.;

	freq += random(floor(st.y));
	float offset = 0.025;
	if (mod(st.y,2.) == 0.){
		freq *= -1.;
	}
	color = vec3(randomSeries(st.x, freq , t + offset),
				randomSeries(st.x, freq , t + offset), 
				randomSeries(st.x, freq , t + offset));

	gl_FragColor = vec4(1.0 - color, 1.0);
}