#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;
	st-= .5;
	float radius = length(st.x) * 4.5;
	float a = atan(st.y,st.x);

	float f= abs(cos(a*1.0))+.14;

	gl_FragColor = vec4(vec3(1.0 - step(f,radius)),1.0);
}