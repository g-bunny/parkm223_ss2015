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

float random(in float x){
	return fract(sin(x)*1e4);
}

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
	    return fract(st);
}

float strokes(vec2 st, float seed1, float seed2, float seed3){
	float a = (1.0 - pow(abs(st.x),seed1));
	float b = pow(cos(random(PI * st.x/2.0)),seed2);
	float d = (0.3);
	float e = (1.0);
	float f = (0.8);

	st.x += .5;
	float c = .0;
	float percentage = (plot(st,a));
	float percentage2 = (plot(st,b));
	float percentage3 = (plot(st,c));
	float percentage4 = (plot(st,d));
	float percentage5 = (plot(st,e));
	float percentage6 = (plot(st, f));
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
	st.y += .5;
	vec2 grid =	tile(st, 9.);
	float pct = thickStrokesPattern(grid, 1.5, 2.0, 3.0);
	vec3 color = vec3(.718, .522, .306);
	color = mix(color, vec3(0.694, 0.502, 0.239), pct);

	gl_FragColor = vec4(color,1.0);
}