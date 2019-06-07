#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 coord = (gl_FragCoord.xy / u_resolution.xy);
  float color = 0.0;

  color += sin(coord.x * 50.0 + cos(u_time + coord.y * 10. + sin(coord.x * 50.0 + u_time * 2.0))) * 2.0;
  color += cos(coord.x * 50.0 + sin(u_time + coord.y * 10. + cos(coord.x * 50.0 + u_time * 2.0))) * 2.0;

  gl_FragColor  = vec4(vec3(color, color, color), 1.0);
}