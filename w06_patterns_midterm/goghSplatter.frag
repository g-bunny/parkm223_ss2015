
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float spiral(vec2 m) {
	float r = length(m);
	float a = atan(m.y, m.x);
	float v = sin(100.*(sqrt(r)-0.02*a-.3*t));
	return clamp(v,0.,1.);
	}

	void main(){
	vec2 st =gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    float pct = dot(st, .2);
    color += pct;
   	gl_FragColor = vec4(color,1.0);
}