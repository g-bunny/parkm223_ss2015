//need variables for what fraction of st we want in width -> float width
//variable for what fraction of st we want in height -> float height
//variable for distance from left -> float startX
//variable for distance from bot -> float startY
//another variable for thickness of border -> float borderSize

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float rect(vec2 st, float startX, float startY, float width, float height){
	return(step(startX,st.x) - step(startX + width, st.x)) * (step(startY, st.y) - step(startY + height, st.y));
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec3 color = vec3(0.0);
	vec3 pct0 = vec3(st.y);
    
    pct0.r = step(0.33, st.y);
    pct0.g = step(0.66, st.y);
    pct0.b = step(.50, st.y);

	float pct = 0.0;
	float pct2 = 0.0;
	float pct3 = 0.0;
	float pct4 = 0.0;
	float pct5 = 0.0;
	float pct6 = 0.0;
	float pct7 = 0.0;
	pct = rect(st,.05,.4,.2,.55);
	pct2 = rect(st,.05,.05,.2,.3);
	pct3 = rect(st,.3,.05,.475,.3);
	pct4 = rect(st,.825,.05,.125,.125);
	pct5 = rect(st,.825,.225,.125,.125);
	pct6 = rect(st,.3,.4,.65,.55);

	gl_FragColor = vec4((pct + pct2 + pct3 + pct4 + pct5 + pct6), color);

}