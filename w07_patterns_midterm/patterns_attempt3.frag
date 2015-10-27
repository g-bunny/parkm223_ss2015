
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float ovalGradient(vec2 st, float radius) {
    st -= .5;
    return 1.0-smoothstep(radius*.5, radius, dot(st,st)*1.5);
}
    
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    
    st *= 10.;
    st.x *= .5;
    
    vec2 st_i = floor(st);

    // if (mod(st_i.y,2.) == 1.) {
    //     st.x -= .5;
    // }
    // if( mod(st_i.x , 2.) == 1.){
    //     st.x *= .5;
    // }
    
    
    vec2 st_f = fract(st);
    color.r = 214.0/255.0;
    color.g = 206.0/255.0;
    color.b = 192.0/255.0;
    
    float pct = ovalGradient(st_f,.5);
    color += pct;
    
    
	gl_FragColor = vec4(color,1.0);
}
