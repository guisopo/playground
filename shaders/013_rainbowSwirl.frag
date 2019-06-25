#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 coord = (gl_FragCoord.xy / u_resolution);
  vec3 color = vec3(0.0);

  float angle = atan(-coord.y + 0.25, coord.x - 0.5) * 0.1;
  float length = length(coord - vec2(0.5, 0.25));

  color.r += sin(length * 40.0 + angle * 40.0 + u_time);
  color.g += cos(length * 30.0 + angle * 60.0 - u_time);
  color.b += sin(length * 50.0 + angle * 50.0 + 3.0);

  gl_FragColor = vec4(color, 1.0);
}