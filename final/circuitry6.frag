#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
//cyan is (0,1.,1.);

float node1CenterX = .1;
float node1CenterY = .1;

vec3 circleNode(float xPos, float yPos, float radius, float smoothing, vec2 st){
	vec3 color =  vec3(0.);
		radius = 1. - radius;
	vec2 whereIsIt = st - vec2(xPos, yPos);
	float cir = smoothstep(radius, radius + smoothing, 1. - length(whereIsIt));
	color.r = 0.;
	color.g += cir;
	color.b += cir;

	return color;
}
float circuitLine(float startX, float startY, float width, float height, float smoothing, vec2 st){
	startX -= width * .5;

	return (smoothstep(startX,startX + smoothing,st.x) - smoothstep(startX + width, startX + width + smoothing, st.x)) *
	(smoothstep(startY, startY + smoothing, st.y) - smoothstep(startY + height, startY + height + smoothing, st.y));
}

vec3 smoothFlickers(float startX, float startY, float width, float height, float smoothing, vec2 st){
	return vec3(circuitLine(startX, startY, width, height, smoothing * fract(u_time), st),
	circuitLine(startX, startY, width, height, smoothing * fract(u_time) * 0.5, st),
	circuitLine(startX, startY, width, height, smoothing * fract(u_time) * 1.5, st));
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
        if (mod(floor(st.x), 2.) == 0.){
        st = rotate2D(st, PI*.5);
    }
    return fract(st);
}

float flare(){
	return 1.0;
}
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 1.;
	vec3 color = vec3(0.);
	vec3 color1 = vec3(0.);
	vec3 colorLine = vec3(0.);
	float time_f = fract(u_time);

	vec2 grid = tile( st, 3.);

	colorLine = smoothFlickers(.1,.1,.05,.2,.08,st);

//	st *= 2.;
	//color1 = circleNode(.1, .1, .1, .8 * time_f, st) + circleNode(.1, .9, .1, .8 * time_f, st);
	if (u_time > 3. && u_time < .8){
		st *= 2.;
	}
	if(mod(u_time,2.0) >= 1.){
		colorLine += smoothFlickers(.1, .5, .2, .05, .2, grid);
			//color1 += circleNode(.9, .1, .1, .8 * time_f, st) + circleNode(.9, .9, .1, .8 * time_f, st);
	}
	if(mod(u_time,3.0) >= 1.){
		colorLine += smoothFlickers(.8, .2, .1, .1, .1, st);
	}
	if(mod(u_time,4.0) >= 1.){
		colorLine += smoothFlickers(.2, .2, .05, .05, -.09, grid);
	}
	if(mod(u_time,5.0) >= 1.){
	}

	if(mod(u_time,6.0) >= 1.){
	}

	if(mod(u_time,7.0) >= 1.){
	}

	if (u_time > 4.){
		colorLine += smoothFlickers(.8, .7, .3, .3, -.2 / fract(u_time) * (u_time - 9.), st);
	}

	gl_FragColor = vec4(color + colorLine,1.0);
	
}