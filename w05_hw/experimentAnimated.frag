#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;
	vec3 colors = vec3(0.0);
	float temporal;
	temporal = abs(sin(u_time));
	st-= .5;
	float radius = length(st.x) * 4.5 / temporal;
	float a = atan(st.y,st.x);

	float f= abs(cos(a*1.0))+.14;
	colors.r = (1.0 - step(f,radius));
	gl_FragColor = vec4(colors,1.0);
}