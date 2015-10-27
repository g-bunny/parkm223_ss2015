
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float splatter(vec2 st, float radius){
    
    st -= .6;
    float pct = smoothstep(radius, radius -.01, length(st));
    st.x -= .18;
    pct += smoothstep(radius*.5, radius*.5 - .01, length(st));
    st.x += .36;
    pct += smoothstep(radius*.5, radius*.5 - .01, length(st));
    st.y -= .15;
    st.x -= .09;
    pct += smoothstep(radius*.5, radius*.5 - .01, length(st));
    st.x -= .21;
    st.y += .03;
    pct += smoothstep(radius*.5, radius*.5 - .01, length(st));
    st += .3;
        pct += smoothstep(radius*.3, radius*.3 - .01, length(st));
    st += .1;
        pct += smoothstep(radius*.2, radius*.2 - .01, length(st));
    st += .05;
        pct += smoothstep(radius*.3, radius*.3 - .01, length(st));
    st.x +=.1;
        pct += smoothstep(radius*.2, radius*.2 - .01, length(st));
    return pct;
}

void main(){
	vec2 st =gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    float pct = dot(st, .2);
    color += pct;
   	gl_FragColor = vec4(color,1.0);
}