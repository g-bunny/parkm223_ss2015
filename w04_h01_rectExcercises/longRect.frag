#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;

	pct = (step(.3,st.x) - step(.7, st.x)) * (step(.1, st.y) - step(.9, st.y));

	gl_FragColor = vec4(vec3(pct),1.0);

}