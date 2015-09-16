#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main(){
	vec2 pixels = gl_FragCoord.xy/u_resolution;
	//using mouse for Blue & Green channels, using time for Red channel:
	float blue = u_mouse.x/pixels.x;
	float green = u_mouse.y/pixels.y;
	float red = abs(sin(u_time));

	gl_FragColor = vec4(red, green, blue, 1.0);

}