
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float ovalGradient(vec2 st, float radius, float xPos) {
    // return distance(st,vec2(0.5))/3.0;
    return smoothstep(radius- .1, radius + .9, 1. -length(st - .5));
}
float threadedEdges(vec2 st, float width){
    return 1.0 - smoothstep(0., 0.1, st.x) + smoothstep(0.9, 1.0, st.x);
}
float dot(vec2 st, float radius){
    st -= .5;
    return smoothstep(radius, radius +.1, length(st));
}
    
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    
    // st -=.5;

    st *= 10.;    
    vec2 st_i = floor(st);

    
    vec2 st_f = fract(st);
    // color.r = distance(st, vec2(.2))/abs(cos(u_time) * 4.5);
    color.r = 0.5;
    color.g = abs(cos(u_time));
    // color.b = distance(st, vec2(2.))/abs(sin(u_time)*3.);
    color.b = u_mouse.x / u_resolution.x;
 
    float pct = dot(st_f, .2);
    // float pct = threadedEdges(st_f, .1);
    // pct += ovalGradient(st_f,.5, .1);
    color += pct;
    
	gl_FragColor = vec4(color,1.0);
}
