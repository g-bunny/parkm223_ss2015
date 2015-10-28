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

float strokes(vec2 st, float seed1, float seed2, float seed3){
	float a = 1.0 - pow(abs(st.x),seed1);
	float b = pow(cos(PI * st.x/2.0),seed2);
	float d = pow(cos(PI * st.x/3.0),seed3);
	float e = 1.0 - pow(abs(sin(PI * st.x/2.0)),seed3);

	st.x += .5;
	float c = 1.0 - pow(abs(st.x),seed3);
	float percentage = plot(st,a);
	float percentage2 = plot(st,b);
	float percentage3 = plot(st,c);
	float percentage4 = plot(st,d);
	float percentage5 = plot(st,e);
	return percentage + percentage2 + percentage3 + percentage4 + percentage5;
}

void main() {

	vec2 st = gl_FragCoord.xy/u_resolution;
	//exponent float set up for trying out different values: 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5
	float exponent = u_mouse.x / u_resolution.x;

	// st.x -= .5;
	st.y += .5;
	// st.x *= .2;
	vec2 grid =	tile(st, 10.);
	float pct = strokes(grid, 1.5, 2.0, 3.0);
	vec2 grid2 = tile(st, 12.);
	float pct2 = strokes(grid2, 0.5, 1.0, 2.0);

	
	vec3 color = vec3(0.);
	color = canvasPattern(st, .1, .5, .1);

	color = mix(color, vec3(0.0, 0.9, 0.2), pct);
	// color = mix(color, vec3(1.0, 0.0, 0.3), pct2);
	// color = mix(color, vec3(0.2, 0.5, 0.9), percentage2);
	// color = mix(color, vec3(0.9, 0.2, 0.5), percentage3);
	gl_FragColor = vec4(color,1.0);
}