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

  float color = 0.0;
  
  color += sin(uv.x * 6.0 + cos(u_time + uv.y * 90.0 + cos(uv.x * 30.0 + u_time * 2.0))) * 0.5;

  gl_FragColor = vec4(vec3(color + uv.x, color + uv.x, color), 1.0);
}