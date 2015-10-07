#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;
	st -= .5;
	pct = smoothstep(.5,.51, 1.- length(st));
	gl_FragColor = vec4(vec3(pct),1.0);

}