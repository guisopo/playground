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
  // 4. Set Image aspect to square
  uv *= u_resolution.xy  / u_resolution.y;

  vec3 color = vec3(1.0);

  float size = 6.0;
  float alpha = sin(floor(uv.y * size) + u_time * 2.0);

  gl_FragColor = vec4(color, alpha);
}