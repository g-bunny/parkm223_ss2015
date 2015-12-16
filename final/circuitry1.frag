#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 u_resolution;
uniform float u_time;
//cyan is (0,1.,1.);

float node1CenterX = .1;
float node1CenterY = .1;

vec3 circleNode(float xPos, float yPos, float radius, vec2 st){
	vec3 color =  vec3(0.);
		radius = 1. - radius;
	vec2 whereIsIt = st - vec2(xPos, yPos);
	float cir = smoothstep(radius, radius + 0.005, 1. - length(whereIsIt));
	color.r = 0.;
	color.g += cir;
	color.b += cir;

	return color;
}
float circuitLine(float startX, float startY, float width, float height, float smoothing, vec2 st){
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
	colorLine.r = 0.;
	colorLine.g = circuitLine(.1, .1, .01, .2, .008 * fract(u_time), st);
	colorLine.b = circuitLine(.1, .1, .01, .2, .008 * fract(u_time), st);
	
	color1 = circleNode(.1, .1, .02, st);
	gl_FragColor = vec4(color + color1 + colorLine,1.0);
	
}