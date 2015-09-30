#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.1,0.3,0.1);
vec3 colorB = vec3(0.82,0.9,0.3);

float plot(vec2 st, float pct){
	return smoothstep(pct-0.01, pct, st.y) - smoothstep(pct, pct+0.01, st.y);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color1 = vec3(0.0);
	vec3 color2 = vec3(0.0);
	vec3 color3 = vec3(0.0);

	vec3 pct = vec3(st.y);
	float timeStuff = ((sin(u_time))/5.0);

	 pct.r = smoothstep(0.0,1.0, st.y);
     pct.g = sin(st.y*PI*timeStuff/3.0);
     pct.b = 2.0 * mod(timeStuff, 0.5);

     // st.x += abs(sin(u_time));

	// pct.r =;
	// pct.g =;
	// pct.b =;

	color1 = mix(colorA, colorB, pct);
	color2 = mix(colorB, colorA, timeStuff);
	gl_FragColor = vec4(color1,1.0);
}