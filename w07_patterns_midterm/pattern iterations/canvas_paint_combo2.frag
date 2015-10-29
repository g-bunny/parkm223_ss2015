
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
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.);

        color.r = 214.0/255.0;
    color.g = 206.0/255.0;
    color.b = 192.0/255.0;
    vec2 grid = tile(st, 10.);
    // grid = offset(st);
    color += mix(vec3(0.5,0.114,0.329),vec3(0.973,0.843,0.675),threadedEdges(grid, .1)) -threadedEdges(grid,.01);
    vec2 grid1 = tile(st, 10.);
    color += mix(color, vec3(0.61, 0.24, 0.1002), ovalGradient(grid1, .5, .1)) - ovalGradient(grid1, 0.01, 0.1);

    
	gl_FragColor = vec4(color,1.0);
}
