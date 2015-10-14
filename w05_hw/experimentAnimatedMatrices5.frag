#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float thing(vec2 st, vec2 size){
	vec3 _colors = vec3(0.0);
	float temporal;
	temporal = abs(sin(u_time));
	st = gl_FragCoord.xy/u_resolution.xy;
	st-= .5;
	float radius = length(st.x) * 4.5 / temporal;
	// float a = atan(st.y,st.x);

	// float f= abs(cos(atan(st.y,st.x)*1.0))+.14;
	_colors.r = (1.0 - step(abs(cos(atan(st.y,st.x)*1.0))+.14,radius));
	return (_colors.r);
}

float box(vec2 st, vec2 size){
    st += .5;
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,
                        size+vec2(0.001),
                        st);
    uv *= smoothstep(size,
                    size+vec2(0.001),
                    vec2(1.0)-st);
    // uv.y = step(.0,u_time);
    return uv.x*uv.y;
}

mat2 rotate2d(float _angle){
	return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
}

mat3 scaleMatrix(vec2 f) {
    return mat3(vec3(f.x,0.0,0.0),
               	vec3(0.0,f.y,0.0),
               	vec3(0.0,0.0,1.0));
}

void scale(in vec2 f, inout vec3 pos) {
    pos = scaleMatrix(f) * pos;
}

mat3 rotationMatrix(float a) {
    return mat3(vec3(-cos(a),sin(a),0.0),
               	vec3(sin(a),cos(a),0.0),
               	vec3(0.0,0.0,1.0));
}

void rotate(float a, inout vec3 pos) {
    pos = rotationMatrix(a) * pos;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 pos = vec3(st,1.0);
	vec3 colors = vec3(0.0);
	vec2 sizing = vec2 (0.5,0.5);
	vec2 translate = vec2(cos(u_time),sin(u_time));
	st -= vec2(0.5);
	st = rotate2d(sin(u_time)*PI)*st;
	st += vec2(0.5);
	// pos = rotationMatrix(u_time) * pos;
	mat3 universe = rotationMatrix(u_time);
	colors = universe * colors;
	colors = vec3(st.x, st.y, 0.0);
	colors += vec3(thing(st,st));
	gl_FragColor = vec4(colors,1.0);
}