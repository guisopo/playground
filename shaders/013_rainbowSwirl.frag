#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
  // Calculate coordinate with 0,0 at middle of screen
  vec2 uv = (gl_FragCoord.xy / u_resolution);
  uv -= vec2(0.5, 0.5);
  uv *= 2.0;

  vec3 color = vec3(0.0);

  float angle = atan(-uv.y, uv.x) * 0.1;
  // distance in UV Space from center of screen to current fragment
  float length = length(uv);

  color.r += sin(length * 40.0 + angle * 40.0 + u_time);
  color.g += cos(length * 30.0 + angle * 60.0 - u_time);
  color.b += sin(length * 50.0 + angle * 50.0 + 3.0);

  gl_FragColor = vec4(color, 1.0);
}