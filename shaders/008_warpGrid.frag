#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


void main() {
  // 1. Normalize UV map going from Zero to One
  vec2 uv = (gl_FragCoord.xy / u_resolution);
  // 2. Offset cordinates to center 0.5
  uv -= vec2(0.5, 0.5);
  // 3. Now our uvinates go from 0 - 0.5 and 0 to - 0.5. We want to remap cordinates going from -1 to +1 so we multiply by 2 
  uv *= 2.0;
  // 4. Set Image aspect to square
  uv *= u_resolution.xy  / u_resolution.y;

  vec3 color = vec3(0.0);

  // color += vec3((sin(uv.x * cos(u_time / 3.0) * 50.0)),
  //           (-cos(uv.x * cos(u_time / 2.0) * 60.0)),
  //           (sin(uv.x * sin(u_time / 7.0) * 70.0)));

  color += (sin(uv.x * cos(u_time / 60.0) * 60.0) +
            sin(uv.y * cos(u_time / 60.0) * 60.0));

  color += (cos(uv.y * sin(u_time / 60.0) * 20.0) +
            cos(uv.x * sin(u_time / 60.0) * 10.0));

  color *= sin(u_time / 10.0) * 0.9;

  gl_FragColor = vec4(color, 1);

}