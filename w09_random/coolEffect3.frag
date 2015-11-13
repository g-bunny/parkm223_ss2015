
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float percentage){
    return smoothstep(percentage -0.02, percentage, st.y) - smoothstep(percentage, percentage + 0.02, st.y);
}

float random (vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))* 
        43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st.x *= 10.0; // Scale the coordinate system by 10
    vec2 ipos = floor(st);  // get the integer coords
    // ipos = ipos + plot(st, ipos.x);
    vec2 fpos = fract(st);  // get the fractional coords

    float x = plot(st, random(ipos + u_time));
    // Assign a random value based on the integer coord
    vec3 color = vec3(0.);
    // color.r = 0.69;
    // color.g = 0.718;
    // color.b = 1.;
    color += vec3(x); 

    // Uncomment to see the subdivided grid
    // color = vec3(fpos,0.0);

    gl_FragColor = vec4(color,1.0);
}