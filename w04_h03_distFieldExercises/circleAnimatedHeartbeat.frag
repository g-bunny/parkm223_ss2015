#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle(float radius, vec2 st){
	vec2 centered = st - .5;
	return smoothstep(radius, radius + .01, 1. - length(centered));
}
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 pct = vec3(0.0);
	float size = 0.;
	size = clamp(abs(cos(u_time * 3.) * 1.), 0.5, 0.6);
	pct.r = circle(size, st);
	pct.g = 0.;
	pct.b = 0.;
	gl_FragColor = vec4(pct,1.0);

}