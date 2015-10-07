#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;

	pct = (smoothstep(.2,.3,st.x) - smoothstep(.7, .8, st.x)) * (smoothstep(.2, .3, st.y) - smoothstep(.7, .8, st.y));

	gl_FragColor = vec4(vec3(pct),1.0);

}