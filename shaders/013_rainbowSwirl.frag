#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 coord = (gl_FragCoord.xy / u_resolution);
  vec3 color = vec3(0.0);

  
}