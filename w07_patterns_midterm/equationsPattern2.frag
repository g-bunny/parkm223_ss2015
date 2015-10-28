#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float percentage){
	return smoothstep(percentage -0.02, percentage, st.y) - smoothstep(percentage, percentage + 0.02, st.y);
}

// vec3 woodLines(){
// 	return
// }


vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}
vec2 tile(vec2 st, float zoom){
    st *= zoom;
   	if (mod(floor(st.x), 2.) == 0.){
		st = rotate2D(st, PI*.25);
	}
	    return fract(st);


}

void main() {

	vec2 st = gl_FragCoord.xy/u_resolution;
	//exponent float set up for trying out different values: 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5
	float exponent = u_mouse.x / u_resolution.x;

	// st.x -= .5;
	st.y += .5;
	// st.x *= .2;
	vec2 grid =	tile(st, 10.);

	float a = 1.0 - pow(abs(grid.x),1.5);
	float b = pow(cos(PI * grid.x/2.0),2.0);
	st.x += .5;
	float c = 1.0 - pow(abs(grid.x),3.0);
	
	vec3 color = vec3(0.);
	vec3 color1 = vec3(0.);
	float percentage = plot(grid,a);
	color1 = (1.0 - percentage) * color + percentage * vec3(.694,.502,.239);

	vec3 color2 = vec3(0.);
	float percentage2 = plot(grid,b);
	color2 = (1.0 - percentage) * color + percentage2 * vec3(0.0,1.0,0.0);

	vec3 color3 = vec3(0.);
	float percentage3 = plot(grid,c);
	color3 = (1.0 - percentage) * color + (percentage3) * vec3(1.0,0.0,0.0);

	// vec3 color4 = vec3(0.);
	// float percentage4 = plot(st,d);
	// color4 = (1.0 - percentage) * color + percentage4 * vec3(0.0,1.0,1.0);

	// vec3 color5 = vec3(0.);
	// float percentage5 = plot(st,e);
	// color5 = (1.0 - percentage) * color + percentage5 * vec3(0.0,0.0,1.0);

	color = color1 + color2 + color3;

	gl_FragColor = vec4(color,1.0);
}