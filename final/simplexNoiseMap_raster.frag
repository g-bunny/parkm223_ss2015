
uniform vec2 noiseRGBoffset;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_tex0Resolution;
uniform vec2 u_mouse;


const float F3 =  0.3333333;
const float G3 =  0.1666667;

float rect(vec2 st, float startX, float startY, float width, float height){
    return(1.0 - step(startX,st.x) - step(startX + width, st.x)) * (step(startY, st.y) - step(startY + height, st.y));
}

float random (in float x) {
    return fract(sin(x)*1e5);
}

vec3 random3(vec3 c) {
    float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
    vec3 r;
    r.z = fract(512.0*j);
    j *= .125;
    r.x = fract(512.0*j);
    j *= .125;
    r.y = fract(512.0*j);
    return r-0.5;
}


float snoise(vec3 p) {

    vec3 s = floor(p + dot(p, vec3(F3)));
    vec3 x = p - s + dot(s, vec3(G3));

    vec3 e = step(vec3(0.0), x - x.yzx);
    vec3 i1 = e*(1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy*(1.0 - e);

    vec3 x1 = x - i1 + G3;
    vec3 x2 = x - i2 + 2.0*G3;
    vec3 x3 = x - 1.0 + 3.0*G3;

    vec4 w, d;

    w.x = dot(x, x);
    w.y = dot(x1, x1);
    w.z = dot(x2, x2);
    w.w = dot(x3, x3);

    w = max(0.6 - w, 0.0);

    d.x = dot(random3(s), x);
    d.y = dot(random3(s + i1), x1);
    d.z = dot(random3(s + i2), x2);
    d.w = dot(random3(s + 1.0), x3);

    w *= w;
    w *= w;
    d *= w;

    return dot(d, vec4(52.0));
}

vec3 noiseMap(vec2 st, vec3 color){
    //adding noise to individual channels
    vec2 noisePosR = vec2(st) + noiseRGBoffset + vec2(100.0 );
    color.r *= snoise(vec3(noisePosR,1.)) * 0.4 + 0.6;
    vec2 noisePosG = vec2(st) + noiseRGBoffset + vec2(200.0 );
    color.g *= snoise(vec3(noisePosG,1.)) * 0.4 + 0.6;
    vec2 noisePosB = vec2(st) + noiseRGBoffset + vec2(60.0 );
    color.b *= snoise(vec3(noisePosB,1.)) * 0.4 + 0.6;
    return color;
}

void main() {
vec2 scale = vec2((u_tex0Resolution.x * u_mouse.x), (u_tex0Resolution.y*u_mouse.y));
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(1.);
  st += scale;

  color = noiseMap(st, color);
    float pct = 0.0;
    float pct2 = 0.0;
    float pct3 = 0.0;
    float pct4 = 0.0;
    float pct5 = 0.0;
    float pct6 = 0.0;
    float pct7 = 0.0;

    vec2 st_i = floor(st);
        vec2 offset = vec2(0.);
    
    if (u_time <2.){
        pct = rect(st,.05,.4,.2,u_time * .275);
    }
    if (u_time >= 4.){
        pct3 = rect(st,.3,.05,.475,1.2 / u_time);
    }

    offset.x = random(st_i.y);
    pct2 = rect(st,.05,.05,.2, .3);

    pct4 = rect(st,.825,.05,.125,.125);
    pct5 = rect(st,.825,.225,.125,.125);
    pct6 = rect(st,.3,.4,.65,.55);

    pct7 = pct + pct2 + pct3 + pct4 + pct5 + pct6;


	gl_FragColor = vec4(color + pct7, 1.0);

}