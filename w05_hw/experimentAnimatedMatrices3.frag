#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat3 rotationMatrix(float a) {
    return mat3(vec3(-cos(a),sin(a),0.0),
               	vec3(sin(a),cos(a),0.0),
               	vec3(0.0,0.0,1.0));
}

void rotate(float a, inout vec3 pos) {
    pos = rotationMatrix(a) * pos;
}

vec3 vag(float timeMod) {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;
	vec3 colors = vec3(0.0);
	float temporal;
	temporal = abs(sin(u_time + timeMod)) + timeMod*0.01;
	st-= .5;
	float radius = length(st.x) * 4.5 / temporal;
	float a = atan(st.y,st.x);

	float f= abs(cos(a*1.0))+.14;
	colors.r = (1.0 - step(f,radius));
	colors.g = (1.0 - step(f,radius));
	colors.b = (1.0 - step(f,radius));

	rotate(u_time,colors);
	return colors;
}

void main(){
	// vec2 st = gl_FragCoord.xy/u_resolution.xy;
	// float pct = 0.0;
	// vec3 colors = vec3(0.0);
	// float temporal;
	// temporal = abs(sin(u_time));
	// st-= .5;
	// float radius = length(st.x) * 4.5 / temporal;
	// float a = atan(st.y,st.x);

	// float f= abs(cos(a*1.0))+.14;
	// colors.r = (1.0 - step(f,radius));

	// rotate(u_time,colors);

	vec3 vag1 = vag(0.0);
	vec3 vag2 = vag(5.0);
	vec3 vag3 = vag(10.0);
	vec3 vag4 = vag(15.0);
	vec3 vag5 = vag(20.0);
	vec3 vag6 = vag(25.0);
	vec3 vag7 = vag(30.0);
	vec3 vagMix1 = mix(vag1, vag2, 0.5);
	
	vagMix1 *= rotationMatrix(u_time);

	vagMix1 = mix(vagMix1, vag3, 0.5);
	vagMix1 = mix(vagMix1, vag4, 0.5);
	vagMix1 = mix(vagMix1, vag5, 0.5);
	vagMix1 = mix(vagMix1, vag6, 0.5);
	vagMix1 = mix(vagMix1, vag7, 0.5);


	// rotate(10., vagMix1);
	gl_FragColor = vec4(vagMix1,1.0);
}