#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
  // 1. Normalize UV map going from Zero to One
  vec2 uv = (gl_FragCoord.xy / u_resolution);
  // 2. Offset cordinates to center 0.5
  uv -= vec2(0.5, 0.5);
  // 3. Now our coordinates go from 0 - 0.5 and 0 to - 0.5. We want to remap cordinates going from -1 to +1 so we multiply by 2 
  uv *= 2.0;
  // 3. Set Image aspect to square
  uv *= u_resolution.xy  / u_resolution.y;

  vec3 color = vec3(0.0);

  // Calculate the angle to the current fragement from the center of screen
  float angle = atan(-uv.y, uv.x) * 0.1;
  // distance in UV Space from center of screen to current fragment
  float length = length(uv);

  color.r += sin(length * 40.0 + angle * 40.0 + u_time);
  color.g += cos(length * 30.0 + angle * 60.0 - u_time);
  color.b += sin(length * 50.0 + angle * 50.0 + 3.0);

  gl_FragColor = vec4(color, 1.0);
}