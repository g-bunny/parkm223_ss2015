#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float circle(float radius, vec2 st, float dist){
	vec2 centered = st - dist;
	return smoothstep(radius, radius + .005, 1. - length(centered));
}
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;
	float pct2 = 0.0;
	float pct3 = 0.0;
	float pct4 = 0.0;
	float pct5 = 0.0;
	float pct6 = 0.0;
	float pct7 = 0.0;
	float pct8 = 0.0;
	pct = circle(.9, st, .8);
	pct2 = circle(.9, st, .2);
	pct3 = circle(.9, st, .4);
	pct4 = circle(.9, st, .6);
	pct5 = circle(.95, st, .1);
	pct6 = circle(.95, st, .3);
	pct7 = circle(.95, st, .5);
	pct8 = circle(.95, st, .7);
	gl_FragColor = vec4(vec3(step(.4,pct) + step(.4, pct2) + step(.4, pct3) + step(.4, pct4) + step(.4,pct5) + step(.4, pct6) + step(.4, pct7) + step(.4, pct8)),1.0);
}