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

vec2 tile(vec2 st, float zoom){
    st *= zoom;
    return fract(st);
}

void main() {

	vec2 st = gl_FragCoord.xy/u_resolution;
	//exponent float set up for trying out different values: 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5
	float exponent = u_mouse.x / u_resolution.x;

	// st.x -= .5;
	st.y += .5;
	st.x *= .5;
	vec2 grid =	tile(st, 10.);
	//grid starts here.
	//first row
	float a = 1.0 - pow(abs(grid.x),1.5);
	//second row

	float b = pow(cos(PI * grid.x/2.0),2.0);

	st.x += .33;

		float c = 1.0 - pow(abs(grid.x),3.0);
	//third row
	// st.x += .5;
	// st.y -= .5;
	// float c = 1.0 - pow(abs(sin(PI * st.x/.5)),1.0);
	// //fourth row
	// 	st.x -= .5;
	// st.y += .75;
	// float d = pow(min(cos(PI * st.x/2.0),1.0-abs(st.x)),exponent);
	// //fifth row
	// 	st.x += .5;
	// st.y -= .55;
	// float e = 1.0 - pow(max(0.0, abs(st.x) * 2.0 - 1.0), .25);
	// // vec3 color = vec3(y);
	vec3 color = vec3(0.);
	vec3 color1 = vec3(0.);
	float percentage = plot(grid,a);
	color1 = (1.0 - percentage) * color + percentage * vec3(.694,.502,.239);

	vec3 color2 = vec3(0.);
	float percentage2 = plot(grid,b);
	color2 = (1.0 - percentage) * color + percentage2 * vec3(0.0,1.0,0.0);

	vec3 color3 = vec3(0.);
	float percentage3 = plot(grid,c);
	color3 = (1.0 - percentage) * color + (percentage3 + .2) * vec3(1.0,0.0,0.0);

	// vec3 color4 = vec3(0.);
	// float percentage4 = plot(st,d);
	// color4 = (1.0 - percentage) * color + percentage4 * vec3(0.0,1.0,1.0);

	// vec3 color5 = vec3(0.);
	// float percentage5 = plot(st,e);
	// color5 = (1.0 - percentage) * color + percentage5 * vec3(0.0,0.0,1.0);

	color = color1 + color2 + color3;

	gl_FragColor = vec4(color,1.0);
}