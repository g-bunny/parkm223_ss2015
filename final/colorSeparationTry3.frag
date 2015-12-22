#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;

#define freqStart -.5
#define freqInterval 0.9
#define sampleSize 0.02           // How accurately to sample spectrum, must be a factor of 1.0

void main()
{
    vec2 st = gl_FragCoord.xy / u_resolution;    
    
   	// first texture row is frequency data
    // sample intensities in frequency interval.
    
    float intensity = 0.0;
	for(float i = 0.0; i < freqInterval; i += freqInterval * sampleSize) {
		intensity += texture2D(u_tex0, vec2(freqStart + i, fract(u_time))).x;
	}
    intensity = abs(intensity);
    intensity = pow((intensity*sampleSize),3.0)*4.0;
    
    //set offsets
    vec2 rOffset = vec2(-0.02,0.02)*intensity;
    vec2 gOffset = vec2(0.0,0.)*intensity;
    vec2 bOffset = vec2(0.04,0.01)*intensity;
    
    vec4 rValue = vec4(texture2D(u_tex0, st - rOffset));
    vec4 gValue = vec4(texture2D(u_tex0, st - gOffset));
    vec4 bValue = vec4(texture2D(u_tex0, st - bOffset));

    gl_FragColor = vec4(rValue.r, gValue.g, bValue.b, 1.0);
}