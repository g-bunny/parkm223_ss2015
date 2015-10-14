#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/3.)) + 
            box(_st, vec2(_size/3.,_size));
}
mat3 scaleMatrix(vec2 f){
	return mat3(vec3(f.x,0.0,0.0), 
		vec3(0.0,f.y,0.0), 
		vec3(0.0,0.0,1.0));
}
mat3 translateMatrix(vec2 f){
	return mat3(vec3(0.0,1.0,f.x), 
		vec3(0.0,1.0,f.y), 
		vec3(0.0,1.5,0.0));
}
mat3 rotationMatrix(float a){
	return mat3(vec3(cos(a),-sin(a),0.0), 
		vec3(sin(a),cos(a),0.0), 
		vec3(0.0,0.0,1.0));
}
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 pos = vec3(st.x,st.y,1.0);
	vec3 color = vec3(0.0);

	// vec2 displace = vec2(.5,.5);
	// pos -= .5 + (abs(sin(u_time)) / 3.14159);
	// pos = translateMatrix(displace);
	// pos = rotationMatrix(sin(u_time)) * pos;
	// pos += .25;
	// pos = translateMatrix(displace);
	pos = rotationMatrix(1.5*abs(sin(u_time))) * pos;
	color += cross(pos.xy, 0.5);
	gl_FragColor = vec4(color,1.0);
	
}