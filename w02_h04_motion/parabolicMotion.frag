#ifdef GL_ES
precision mediump;
#endif

uniform vec2 u_resolution;

float plot(vec2 pixelCoordinates, float percentage){
	return smoothstep(percentage - 0.02, percentage, pixelCoordinates.y) - smoothstep(percentage, percentage + 0.02, pixelCoordinates.y);		
}

void main(){
	vec2 pixelCoordinates = gl_FragCoord.xy/u_resolution;
	float exponent = 2.0;

	float y = 0.8 - pow(abs(pixelCoordinates.x - 0.6),exponent);
	vec3 color = vec3(y);
	float percentage = plot(pixelCoordinates,y);

	color = (1.0 - percentage) * color + percentage * vec3(0.0,1.0,0.0);
	gl_FragColor = vec4(color, 1.0);
}