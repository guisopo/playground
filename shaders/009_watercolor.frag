#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


void main() {
  vec2 coord = 6.0 * gl_FragCoord.xy / u_resolution;

  // 1. Normalize UV map going from Zero to One
  vec2 uv = 6.0 * gl_FragCoord.xy / u_resolution;
  // 2. Offset cordinates to center 0.5
  uv -= vec2(0.5, 0.5);
  // 3. Now our uvinates go from 0 - 0.5 and 0 to - 0.5. We want to remap cordinates going from -1 to +1 so we multiply by 2 
  uv *= 2.0;
  // 4. Set Image aspect to square
  uv *= u_resolution.xy  / u_resolution.y;

  for( int n = 1; n < 8; n++) {
    float i = float(n);
    uv += vec2(0.7 / i * sin( i * uv.y + u_time + 0.3 * i) + 0.8,
                0.4 / i * sin(uv.x + u_time + 0.3 * i) + 1.6);
  }

  uv *= vec2(0.7 / sin(uv.y + u_time + 0.3) + 0.8,
                0.4 / sin(uv.x + u_time + 0.3) + 1.6);

  vec3 color = vec3(0.5 * sin(uv.x) + 0.5,
                    0.5 * sin(uv.y) + 0.5, 
                    sin(uv.x + uv.y));

  gl_FragColor = vec4(color, 1.0);
}