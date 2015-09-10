#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.);
	
	float pct = st.x;

	color = vec3(pct);
	gl_FragColor = vec4(color,1.0)
}