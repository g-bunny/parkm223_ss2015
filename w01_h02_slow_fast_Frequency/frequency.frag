#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
#define PI 3.14159265359

void main(){
	//slowed down until almost imperceptible
	// gl_FragColor = vec4(abs(sin(u_time * 1.0/10.0)),0.0,0.0,1.0);

	//sped up until no flickering
	gl_FragColor = vec4(abs(sin(u_time * 30.0*PI)),0.0,0.0,1.0);

}