#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float pct = 0.0;

    pct = (smoothstep(.0,.01,st.x) - smoothstep(.99, 1., st.x)) * (smoothstep(.0, .01, st.y) - smoothstep(.99, 1., st.y));

    gl_FragColor = vec4(vec3(pct),1.0);

}