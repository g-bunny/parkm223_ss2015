//need variables for what fraction of st we want in width -> float width
//variable for what fraction of st we want in height -> float height
//variable for distance from left -> float startX
//variable for distance from bot -> float startY

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float rect(vec2 st, float startX, float startY, float width, float height){
		return (step(startX,st.x) - step(startX + width, st.x)) * (step(startY, st.y) - step(startY + height, st.y));
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	float pct = 0.0;

	pct = rect(st,.1,.1,.2,.2);
	gl_FragColor = vec4(vec3(pct),1.0);

}