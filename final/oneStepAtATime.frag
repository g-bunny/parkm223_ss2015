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
	float pct = 1.0;

	pct = rect(st, .1, .1, .8, .8);

	if (u_time <2.0){
		color.r += pct;

		} else if (u_time >= 2.0 && u_time <4.0){
			color.g += pct;

			} else if (u_time >=4. && u_time <= 6.){
				color.b +=pct;
			}

	gl_FragColor = vec4(color,1.0);
}