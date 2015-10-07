//need variables for what fraction of st we want in width -> float width
//variable for what fraction of st we want in height -> float height
//variable for distance from left -> float startX
//variable for distance from bot -> float startY
//another variable for thickness of border -> float borderSize

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float rect(vec2 st, float startX, float startY, float width, float height, float borderSize){
	float outerRect = (step(startX,st.x) - step(startX + width, st.x)) * (step(startY, st.y) - step(startY + height, st.y));
	float innerRect = (step(startX + borderSize ,st.x) - step(startX + width - borderSize, st.x)) * (step(startY + borderSize, st.y) - step(startY + height - borderSize, st.y));
		return outerRect - innerRect;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;

	pct = rect(st,.2,.2,.6,.6, .02);

	gl_FragColor = vec4(vec3(pct),1.0);

}