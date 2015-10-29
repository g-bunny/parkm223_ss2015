
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 tile(vec2 st, float zoom){
    st *= zoom;
    return fract(st);
}
vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}
float ovalGradient(vec2 st, float radius, float xPos) {
    // return distance(st,vec2(0.5))/3.0;
    return smoothstep(radius- .1, radius + .9, 1. -length(st - .5));
}
float threadedEdges(vec2 st, float width){
    return 1.0 - smoothstep(0., 0.1, st.x) + smoothstep(0.9, 1.0, st.x);
}
vec3 canvasPattern(vec2 st, float width, float radius, float xPos){
    vec3 color = vec3(0.);
    st *= 100.;
    st.x *= .5;
    
    vec2 st_i = floor(st);

    if (mod(st_i.y,2.) == 1.) {
        st.x -= .5;
    }
    vec2 st_f = fract(st);
    color.r = 214.0/255.0;
    color.g = 206.0/255.0;
    color.b = 192.0/255.0;
    
    float pct = threadedEdges(st_f, width);
    pct += ovalGradient(st_f,radius, xPos);
    color += pct;

    return color;
}

float circle(vec2 st, float radius){
    vec2 pos = vec2(0.5)-st;
    radius *= 0.75;
    return 1.-smoothstep(radius-(radius*0.05),radius+(radius*0.05),dot(pos,pos)*3.14);
}

float circlePattern(vec2 st, float radius) {
    return  circle(st+vec2(0.,-.5), radius)+
            circle(st+vec2(0.,.5), radius)+
            circle(st+vec2(-.5,0.), radius)+
            circle(st+vec2(.5,0.), radius);
}
float splatter(vec2 st, float radius){
    
    st -= .5;
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

float splatterPattern(vec2 st, float radius){
        float pct = 0.0;
        pct = splatter(st + vec2(0., -.1), radius + .1) +
            splatter(st + vec2(0., -.2), radius - .1) +
            splatter(st + vec2(-.1, 0.), radius + .2) +
            splatter(st + vec2(-.2, 0.), radius - .2) ;
        return pct;
}

// float thinPaint(vec2 st, float width, float height){
//     return 
// }

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = canvasPattern(st, .1, .5, .1);
    
    vec2 grid2 = tile(st,5.);
    // grid2 = tile(st + vec2(cos(u_time),sin(u_time))*0.02 ,5.);
    if (mod(floor(st.y) , 2.) == 1.){
            rotate2D(st,PI * .25);
        }
    color = mix(color, vec3(0.40,0.02,0.402), splatterPattern(grid2, .1));
    
    // vec3 grid3 = tile(st, 3.);

	gl_FragColor = vec4(color,1.0);
}
