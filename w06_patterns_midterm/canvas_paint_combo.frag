
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
    st.x *= .5;
}
vec2 tile(vec2 st, float size){
    st *= size;
    return fract(st);
}

vec2 offset(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x -= .5;
    }
    return(st);
}
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);

        color.r = 214.0/255.0;
    color.g = 206.0/255.0;
    color.b = 192.0/255.0;
    vec2 grid = tile(st, 10.);
    grid = offset(st);

    float pct = threadedEdges(st, .1);
    pct += ovalGradient(st,.5, .1);
    grid += pct;
    
    
	gl_FragColor = vec4(grid, 1.0,1.0);
}
