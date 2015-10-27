#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float splatter(vec2 st, float width, float height, float distance, int direction){
		st -= .5;

	float bigCircle = smoothstep(width, width - .01, length(st));
	// if(direction == 0){
	// 	st.x += distance;
	// 	st.y *= distance;
	// 	} else if (direction == 1){
	// 		st.x *= distance;
	// 		st.y += distance;
	// 	}
	st+= .5;
	float smallCircle = smoothstep(width * .2, width * .2 - .01, length(st)/.5);
	// float dripLine = smoothstep();
	return bigCircle + smallCircle;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec3 color = vec3(0.);

	st*= 10.;

	vec2 st_i = floor(st);
    vec2 st_f = fract(st);
	// float pct = dot(st_f, .2);   
	float pct = 0.;
		// if(mod(st_i.y , 2. ) == 0.){
	pct += splatter (st_f, .3, .6, .4, 1);
// }
		// if (mod(st_i.y, 2. ) == 1.){
		// 	pct +=splatter(st_f, .2, .6, .4, 0);
		// } 
	color += pct;
	gl_FragColor = vec4(color, 1.0);
}