//expression of on and off symptoms of pain when sick (I have been feeling sick this week)

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.0,0.0,0.0);
vec3 colorB = vec3(0.757,0.749,0.118);
vec3 colorC = vec3(1.0,1.0,1.0);


void main() {
    vec3 color = vec3(0.0);
    vec3 color2 = vec3(0.0);

    float pct = mod(u_time, 5.0);
    float fasterPct = mod(u_time, 0.5);

    // Mix uses pct (a value from 0-1) to 
    // mix the two colors
    color = mix(colorB, colorC, pct); 
    color2 = mix(colorB, colorA, fasterPct);

    if (mod(u_time, 15.0) > 10.0){
    	gl_FragColor = vec4(color2, 1.0);
    } else {
    	gl_FragColor = vec4(color, 1.0);
	}
}