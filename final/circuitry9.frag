#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
const float F3 =  0.3333333;
const float G3 =  0.1666667;
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
	return vec3(circuitLine(startX, startY, width, height, smoothing * sin(fract(u_time)), st),
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
float random (in float x) {
    return fract(sin(x)*1e5);
}
vec3 random3(vec3 c) {
    float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
    vec3 r;
    r.z = fract(512.0*j);
    j *= .125;
    r.x = fract(512.0*j);
    j *= .125;
    r.y = fract(512.0*j);
    return r-0.5;
}


float snoise(vec3 p) {

    vec3 s = floor(p + dot(p, vec3(F3)));
    vec3 x = p - s + dot(s, vec3(G3));

    vec3 e = step(vec3(0.0), x - x.yzx);
    vec3 i1 = e*(1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy*(1.0 - e);

    vec3 x1 = x - i1 + G3;
    vec3 x2 = x - i2 + 2.0*G3;
    vec3 x3 = x - 1.0 + 3.0*G3;

    vec4 w, d;

    w.x = dot(x, x);
    w.y = dot(x1, x1);
    w.z = dot(x2, x2);
    w.w = dot(x3, x3);

    w = max(0.6 - w, 0.0);

    d.x = dot(random3(s), x);
    d.y = dot(random3(s + i1), x1);
    d.z = dot(random3(s + i2), x2);
    d.w = dot(random3(s + 1.0), x3);

    w *= w;
    w *= w;
    d *= w;

    return dot(d, vec4(52.0));
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
st = tile(st,2.);
	vec2 grid = tile( st, 3.);

	float offset = 0.5;
	float angle = snoise(color + u_time * .1) * PI;
	//st += offset * vec2(cos(angle), sin(angle));
	if (u_time > 2.){
			grid += .2 * vec2(cos(angle), sin(angle));
	}
	if (u_time > 12.){
		st = tile(st, 5.);

	}

	colorLine = smoothFlickers(.1,.1,.05,.2,.08,st);

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
	if(u_time > 8.){
		colorLine += smoothFlickers(.8, .7, .3, .3, random(-.2) / fract(u_time) * (u_time - 9.), st);

	}
	if (u_time > 10. && u_time < 14.){

		color = vec3(0. + fract(u_time - 10.), 1.0 - fract(u_time - 10.), 1.0 - fract(u_time - 10.) * .4);
	}
	if (u_time > 18.){
	}

	gl_FragColor = vec4(color + colorLine,1.0);
	
}