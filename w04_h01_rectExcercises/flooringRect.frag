#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;

	pct = (floor(st.x/2.0) - floor(st.x)) * (floor(st.y) - floor(st.y));

	gl_FragColor = vec4(vec3(pct),1.0);

}