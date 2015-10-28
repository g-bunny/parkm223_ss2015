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

float ovalGradient(vec2 st, float radius, float xPos) {
    // return distance(st,vec2(0.5))/3.0;
    return smoothstep(radius- .1, radius + .9, 1. -length(st - .5));
}
float threadedEdges(vec2 st, float width){
    return 1.0 - smoothstep(0., 0.1, st.x) + smoothstep(0.9, 1.0, st.x);
}
vec3 canvasPattern(vec2 st, float width, float radius, float xPos){
    vec3 color = vec3(0.);
    st *= 100.;
    st.x *= .5;
    
    vec2 st_i = floor(st);

    if (mod(st_i.y,2.) == 1.) {
        st.x -= .5;
    }
    vec2 st_f = fract(st);
    color.r = 214.0/255.0;
    color.g = 206.0/255.0;
    color.b = 192.0/255.0;
    
    float pct = threadedEdges(st_f, width);
    pct += ovalGradient(st_f,radius, xPos);
    color += pct;

    return color;
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
	grid.x += .5;
	float c = 1.0 - pow(abs(grid.x),3.0);
	
	vec3 color = vec3(0.);
	color = canvasPattern(st, .1, .5, .1);
	vec3 color0 = vec3(0.);
	vec3 color1 = vec3(0.);
	float percentage = plot(grid,a);

	vec3 color2 = vec3(0.);
	float percentage2 = plot(grid,b);

	vec3 color3 = vec3(0.);
	float percentage3 = plot(grid,c);

	color0 = color1 + color2 + color3;

	color = mix(color, vec3(0.5, 0.9, 0.2), percentage);
	color = mix(color, vec3(0.2, 0.5, 0.9), percentage2);
	color = mix(color, vec3(0.9, 0.2, 0.5), percentage3);
	gl_FragColor = vec4(color,1.0);
}