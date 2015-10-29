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

   	if (mod(floor(st.y), 2.) == 0.){
		st = rotate2D(st, PI*.15);
	}
	//    	if (mod(floor(st.x), 3.) == 0.){
	// 	st = rotate2D(st, PI*.35);
	// }
	//    	if (mod(floor(st.x), 3.) == 0.){
	// 	st = rotate2D(st, PI*.45);
	// }
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
	float d = 0.3;
	float e = 1.0;
	float f = 0.8;

	st.x += .5;
	float c = .0;
	float percentage = plot(st,a);
	float percentage2 = plot(st,b);
	float percentage3 = plot(st,c);
	float percentage4 = plot(st,d);
	float percentage5 = plot(st,e);
	float percentage6 = plot(st, f);
	return percentage + percentage2 + percentage3 + percentage4 + percentage5 + percentage6;
}

float thickStrokes(vec2 st, float seed1, float seed2, float seed3){
	float pct = strokes(st, seed1, seed2, seed3);
	st.x += .1;
	pct += strokes(st, seed1, seed2, seed3);
	st.x += .25;
	pct += strokes(st, seed1, seed2, seed3);
	return pct;
}

float thickStrokesPattern(vec2 st, float seed1, float seed2, float seed3){
	return thickStrokes(st + vec2(0., - .5), seed1, seed2, seed3) +
	thickStrokes(st + vec2(0.,.5), seed1, seed2, seed3) +
	thickStrokes(st + vec2(-.5,0.), seed1, seed2, seed3) +
	thickStrokes(st + vec2(.5,0.), seed1, seed2, seed3);
}

void main() {

	vec2 st = gl_FragCoord.xy/u_resolution;
	float exponent = u_mouse.x / u_resolution.x;

	// st.x -= .5;
	st.y += .5;
	// st.x *= .2;
	vec2 grid =	tile(st, 9.);
	// grid.x *= .5;
	float pct = thickStrokesPattern(grid, 1.5, 2.0, 3.0);
	// float pct = strokes(grid, 1.5, 2.0, 3.0);
	// vec2 grid2 = tile(st, 12.);
	// float pct2 = thickStrokes(grid2, 1.5, 2.5, 2.0);
	// st -= .1;
	// float pct3 = thickStrokes(grid2, 0.5, 3.5, 2.5);
	// st += .2;
	// vec2 grid4 = tile(st, 7.);
	// float pct4 = strokes(grid4, 1.0, 2.0, 3.0);
	// 	st += .5;
	// vec2 grid5 = tile(st, 9.);
	// float pct5 = strokes(grid5, 1.2, 2.2, 3.1);
	vec3 color = vec3(.718, .522, .306);
	// color = canvasPattern(st, .1, .5, .1);

	color = mix(color, vec3(0.694, 0.502, 0.239), pct);
	// color = mix(color, vec3(.90, 1.0, 0.2), pct2);

	// color = mix(color, vec3(.0, 0.9, 0.9), pct3);
	// color = mix(color, vec3(.0, 0.82, 0.29), pct4);
	// color = mix(color, vec3(1., 0.93, 0.22), pct4);

	gl_FragColor = vec4(color,1.0);
}