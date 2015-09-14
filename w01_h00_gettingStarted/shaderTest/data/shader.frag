#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
​
float F(float x, float p, float w){
//     return(smoothstep(0,p,x) - smoothstep(p,w,x));
    return (smoothstep(0.0, p, x) + smoothstep(1.0,p,x));
}
​
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.);
    float pct = F(st.x,abs(sin(u_time)),1.);
    color = vec3(pct);
    gl_FragColor = vec4(color,1.0);
}