#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float F(float x, float p, float w){
    return(smoothstep(0.,p,x) - smoothstep(p,w,x));
//     return (smoothstep(p-w*.5, p, x) + smoothstep(p+w*.5,p,x)) - 1.0;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    
//     vec2 p = vec2(cos(u_time * .5), sin(u_time*.5))*.25+.5;
    float pct = F(st.x,abs(sin(u_time)),1.);
    //pct *= F(st.y, abs(sin(u_time*0.5)),.1);
    color = vec3(pct);
    //color = vec3(pct*.5);
    
    gl_FragColor = vec4(color,1.0);
}