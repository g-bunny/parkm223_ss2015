#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorA = vec3(0.9,0.0,0.2);
vec3 colorB = vec3(0.0,0.8,0.6);

float plot(vec2 st, float pct){
	return smoothstep(pct-0.01, pct, st.y) - smoothstep(pct, pct+0.01, st.y);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color1 = vec3(0.0);
	float distFromCenterX = abs(0.5 - st.x);
	float distFromCenterY = abs(0.5 - st.y);
	float hypo = sqrt(distFromCenterX*distFromCenterX + distFromCenterY * distFromCenterY);
	vec3 pct = vec3(st.y);
	float timeStuff = ((sin(u_time))/2.0);
	float inverseHyp = 1.0 - hypo;

	 pct.r = mod(inverseHyp, timeStuff);
     pct.g = smoothstep(0.5, 0.6, inverseHyp);
     pct.b = mod(timeStuff, inverseHyp);

	color1 = mix(colorA, colorB, pct);
	gl_FragColor = vec4(color1,1.0);
}