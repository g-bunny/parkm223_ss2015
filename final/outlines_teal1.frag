#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float pct = 0.0;

    vec3 color = vec3(0.);
    color.r = 0.698;
    color.g = 1.0;
    color.b = 0.9137;
    pct = (smoothstep(.0,.01,st.x) - smoothstep(.99, 1., st.x)) * (smoothstep(.0, .01, st.y) - smoothstep(.99, 1., st.y));

    gl_FragColor = vec4(color * pct,1.0);

}