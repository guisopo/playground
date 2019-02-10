#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;


void main() {
  vec2 coord = gl_FragCoord.xy / u_resolution;
  vec3 color = vec3(0.0);

  // color += vec3((sin(coord.x * cos(u_time / 3.0) * 50.0)),
  //           (-cos(coord.x * cos(u_time / 2.0) * 60.0)),
  //           (sin(coord.x * sin(u_time / 7.0) * 70.0)));

  color += (sin(coord.x * cos(u_time / 60.0) * 60.0) +
            sin(coord.y * cos(u_time / 60.0) * 60.0));

  color += (cos(coord.y * sin(u_time / 60.0) * 20.0) +
            cos(coord.x * sin(u_time / 60.0) * 10.0));

  color *= sin(u_time / 10.0) * 0.9;

  gl_FragColor = vec4(color, 1);

}