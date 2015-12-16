#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float rect(vec2 st, float startX, float startY, float width, float height){
	return(step(startX,st.x) - step(startX + width, st.x)) * (step(startY, st.y) - step(startY + height, st.y));

}

void main(){
	vec2 st = gl_FragCoord.xy / u_resolution;
	vec3 color = vec3 (0.0);
	vec3 colorTime = vec3(0.0);
	colorTime.r = fract(u_time);

	int numOfRects = 5;
	float pct[5];
	for (int i = 0; i < numOfRects; i++){
		pct[i] = rect(st, .1 + float(i)*.15, .1 , .1 , .8);
		color += pct[i];
		color += colorTime.r;

	}
	gl_FragColor = vec4(color,1.0);
}