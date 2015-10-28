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
vec2 tile(vec2 st, float zoom, float rotateIncrement){
    st *= zoom;
   	if (mod(floor(st.x), 2.) == 0.){
		st = rotate2D(st, -PI * .02* rotateIncrement);
	}
	   	if (mod(floor(st.x), 3.) == 0.){
		st = rotate2D(st, PI*.03 * rotateIncrement);
	}
	   	if (mod(floor(st.x), 3.) == 0.){
		st = rotate2D(st, -PI*.01 * rotateIncrement);
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

float thickStrokes(vec2 st, float seed1, float seed2, float seed3){
	float pct = strokes(st, seed1, seed2, seed3);
	st.x += .1;
	pct += strokes(st, seed1, seed2, seed3);
	st.x += .25;
	pct += strokes(st, seed1, seed2, seed3);
	return pct;
}

void main() {

	vec2 st = gl_TexCoord[0].st;
	//exponent float set up for trying out different values: 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5
	float exponent = u_mouse.x / u_resolution.x;

	// st.x -= .5;
	st.y += .5;
	// st.x *= .2;
	vec2 grid =	tile(st, 5., abs((u_time)/9.));
	float pct = thickStrokes(grid, 1.5, 2.0, 3.0);
	// float pct = strokes(grid, 1.5, 2.0, 3.0);
	vec2 grid2 = tile(st, 12., abs((u_time * .1)));
	float pct2 = thickStrokes(grid2, 1.5, 2.5, 2.0);
	st -= .1;
	float pct3 = thickStrokes(grid2, 0.5, 3.5, 2.5);
	st += .2;
	vec2 grid4 = tile(st, 7., abs((u_time * .2)));
	float pct4 = strokes(grid4, 1.0, 2.0, 3.0);
		st += .5;
	vec2 grid5 = tile(st, 9., abs((u_time)/8.));
	float pct5 = strokes(grid5, 1.2, 2.2, 3.1);
	vec3 color = vec3(0.);
	color = canvasPattern(st, .1, .5, .1);

	color = mix(color, vec3(0.0, 0.9, 0.2), pct);
	color = mix(color, vec3(.90, 1.0, 0.2), pct2);

	color = mix(color, vec3(.0, 0.9, 0.9), pct3);
	color = mix(color, vec3(.0, 0.82, 0.29), pct4);
	color = mix(color, vec3(1., 0.93, 0.22), pct4);

	gl_FragColor = vec4(color,1.0);
}