#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 black = vec3(0.0,0.0,0.0);
vec3 darkRed = vec3(0.220,0.059,0.118);
vec3 blue = vec3(0.463,0.541,0.859);
vec3 lightBlue = vec3(0.729, 0.878, 1.0);
vec3 lightYellow = vec3(1.0,1.0,0.8);
vec3 orange = vec3(0.902, 0.624, 0.337);
vec3 redOrange = vec3(0.765, 0.282, 0.161);
vec3 white = vec3(1.0,1.0,1.0);

void main(){

	vec2 st = gl_FragCoord.xy/(u_resolution);
	vec3 percentage = vec3(st.y);
	float timeTransition = abs(sin(u_time));
	float exponent = u_time / u_resolution.y;
	float y = pow(min(cos(PI * st.x/2.0),1.0-abs(st.x)),exponent);
	vec3 color = vec3(y);
	vec3 color2 = vec3(y);
	vec3 color3 = vec3(y);
	vec3 color4 = vec3(y);
	vec3 color5 = vec3(y);

	vec3 mixedMix1 = vec3(y);
	vec3 mixedMix2 = vec3(y);
	vec3 mixedMix3 = vec3(y);
	
	vec3 finalColor = vec3(y);

		color = mix(redOrange, darkRed, 1.0/st.y);
		color2 = mix(orange, lightYellow, 1.0/st.y);
		color3 = mix(blue, lightYellow, st.y);
		color4 = mix(redOrange, lightBlue, st.y);
		color5 = mix(redOrange, black, st.y);

		mixedMix1 = mix(color, color2, st.y);
		mixedMix3 = mix(color3, color4, st.y);

	finalColor = mix(color,color2,st.y);
	gl_FragColor = vec4(finalColor,1.0);

}