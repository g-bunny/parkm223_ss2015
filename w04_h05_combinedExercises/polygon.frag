#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html

vec3 polygon(vec2 st, int N, float size){
  // Angle and radius from the current pixel
  st.x *= u_resolution.x/u_resolution.y;
  st = st *2.-1.;
  float a = atan(st.x,st.y)+PI;
  float r = TWO_PI/float(N);
  float d = 0.0;
  // Shaping function that modulate the distance
  d = cos(floor(.5+a/r)*r-a)*length(st);
  vec3 color = vec3(0.);
  color = vec3(1.0-smoothstep(size,size + .01,d));
  return color;
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.0);
  // Remap the space to -1. to 1.
  // Number of sides of your shape
  // color = vec3(d);
  color = polygon(st, 7, .5);
  gl_FragColor = vec4(color,1.0);
}