//expression of on and off symptoms of pain when sick (I have been feeling sick this week)

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 black = vec3(0.012,0.0,0.0);
vec3 darkRed = vec3(0.220,0.059,0.118);
vec3 blue = vec3(0.463,0.541,0.859);
vec3 lightBlue = vec3(0.729, 0.878, 1.0);
vec3 lightYellow = vec3(1.0,1.0,0.8);
vec3 orange = vec3(0.902, 0.624, 0.337);
vec3 redOrange = vec3(0.765, 0.282, 0.161);

float plot(vec2 st, float percentage){
	return smoothstep(percentage-0.01, percentage, st.y) - smoothstep(percentage, percentage + 0.01, st.y);
}

void main() {
 //    vec3 color = vec3(0.0);
 //    vec3 color2 = vec3(0.0);

 //    float pct = mod(u_time, 5.0);
 //    float fasterPct = mod(u_time, 0.5);

 //    // Mix uses pct (a value from 0-1) to 
 //    // mix the two colors
 //    color = mix(colorB, colorC, pct); 
 //    color2 = mix(colorB, colorA, fasterPct);

 //    if (mod(u_time, 15.0) > 10.0){
 //    	gl_FragColor = vec4(color2, 1.0);
 //    } else {
 //    	gl_FragColor = vec4(color, 1.0);
	// }
	vec2 st = gl_FragCoord.xy/(u_resolution*1.0);
	vec3 color = vec3(0.0);
	vec3 percentage = vec3(st.y);

	color = mix(black, darkRed, percentage);

	// color = mix(color, vec3(1.0, 0.0, 0.0), plot(st,percentage.r));
	// color = mix(color, vec3(0.0, 1.0, 0.0), plot(st,percentage.g));
	// color = mix(color, vec3(0.0, 0.0, 1.0), plot(st,percentage.b));

	gl_FragColor = vec4(color,1.0);
}