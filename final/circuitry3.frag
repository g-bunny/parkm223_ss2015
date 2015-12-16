#ifdef GL_ES
precision mediump float;
#endif


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
	colorLine.r = circuitLine(.1, .1, .05, .2, .08 * u_time * 0.5, st);
	colorLine.g = circuitLine(.1, .1, .05, .2, .08 * u_time, st);
	colorLine.b = circuitLine(.1, .1, .05, .2, .08 * u_time * 1.5, st);

	color1 = circleNode(.1, .1, .1, .8 * time_f, st) + circleNode(.1, .9, .1, .8 * time_f, st);

	if(u_time > 4.){
		color1 += circleNode(.9, .1, .1, .8 * time_f, st) + circleNode(.9, .9, .1, .8 * time_f, st);

	}

	if (u_time > 8.){
		color1 += circleNode(.4, .4, .1, .8 * time_f, st) + circleNode(.6, .6, .1, .8 * time_f, st) + 
		circleNode(.4, .6, .1, .8 * time_f, st) + circleNode(.6, .4, .1, .8 * time_f, st);
	}
	gl_FragColor = vec4(color + color1 + colorLine,1.0);
	
}