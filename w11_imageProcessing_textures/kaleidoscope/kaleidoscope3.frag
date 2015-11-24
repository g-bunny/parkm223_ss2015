
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359


uniform sampler2D u_tex0;
uniform sampler2D u_tex1;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 5.;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 5.;
    return _st;
}

//void kaleidoscope(){

//}

void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    float pct = 0.0;
    st *=.5;
    pct = distance(st,vec2(.25))/0.5;

    vec4 color = vec4(0.0);
    int subdivisions = 10;

    float interval = abs(sin(fract(u_time*.1))) * abs(cos(fract(u_time*.1)));

    st *= pct;
   // st = rotate2D(st,2.*PI * interval);

    if (mod(st.x,2.) == 1.){
        
    }
    color = texture2D(u_tex0,st);

    vec4 color2 = vec4(0.0);

    if (mod(st.x,2.) == 0.){
    color2 = texture2D(u_tex1, st);
    }
    


    gl_FragColor = color;
}