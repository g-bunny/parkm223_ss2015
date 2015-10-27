
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
// float dot(){
//     return 
// }
vec2 tile(vec2 st, float size){
    st *= size;
    return fract(st);
}

float canvasPattern(vec2 st, float radius, float xPos, float width){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x -= .5;
    }
    float pct = threadedEdges(st, width);
    pct += ovalGradient(st, radius, xPos);
    return pct;
}
    
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    
    st *= 100.;
    st.x *= .5;
    
    vec2 st_i = floor(st);

    if (mod(st_i.y,2.) == 1.) {
        st.x -= .5;
    }
    // if( mod(st_i.x , 2.) == 1.){
    //     st.x *= .5;
    // }
    
    
    vec2 st_f = tile(st, 10.);
    float pct = canvasPattern(st, .5, .1, .1);
    color.r = 214.0/255.0; //0.839
    color.g = 206.0/255.0; //0.808
    color.b = 192.0/255.0; //0.753
    color += mix(vec3(25,255,255),color, pct);
    // color += pct;
    
    
	gl_FragColor = vec4(color,1.0);
}
