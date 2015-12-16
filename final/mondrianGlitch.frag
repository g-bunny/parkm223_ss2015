//need variables for what fraction of st we want in width -> float width
//variable for what fraction of st we want in height -> float height
//variable for distance from left -> float startX
//variable for distance from bot -> float startY
//another variable for thickness of border -> float borderSize

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform bool triggered;

float rect(vec2 st, float startX, float startY, float width, float height){
	return(step(startX,st.x) - step(startX + width, st.x)) * (step(startY, st.y) - step(startY + height, st.y));
}

float random (in float x) {
    return fract(sin(x)*1e5);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;
	float pct2 = 0.0;
	float pct3 = 0.0;
	float pct4 = 0.0;
	float pct5 = 0.0;
	float pct6 = 0.0;
	float pct7 = 0.0;

    vec2 st_i = floor(st);
        vec2 offset = vec2(0.);
	
	if (u_time <2.){
		pct = rect(st,.05,.4,.2,u_time * .275);
	}
	if (u_time >= 4.){
		pct3 = rect(st,.3,.05,.475,1.2 / u_time);
	}

	offset.x = random(st_i.y);
	pct2 = rect(st,.05,.05,.2, .3);

	pct4 = rect(st,.825,.05,.125,.125);
	pct5 = rect(st,.825,.225,.125,.125);
	pct6 = rect(st,.3,.4,.65,.55);

	gl_FragColor = vec4(vec3(pct + pct2 + pct3 + pct4 + pct5 + pct6),1.0);

}