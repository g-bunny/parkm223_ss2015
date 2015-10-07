#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float circle(float radius, vec2 st){
	vec2 centered = st - .5;
	return smoothstep(radius, radius + .01, 1. - length(centered));
}
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;
	pct = circle(.5, st);
	gl_FragColor = vec4(vec3(pct),1.0);

}