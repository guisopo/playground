#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float band(float t, float start, float end, float blur) {
  float step1 = smoothstep(start - blur, start + blur, t);
  float step2 = smoothstep(end + blur, end - blur, t);
  return step1 * step2;
}

float rectangle(vec2 uv, float left, float right, float bottom, float top, float blur) {
  float band1 = band(uv.x, left, right, blur);
  float band2 = band(uv.y, bottom, top, blur);

  return (band1 * band2);
}

void main() {
  vec2 coord = gl_FragCoord.xy / u_resolution;
  coord -= 0.5;
  coord.x *= u_resolution.x / u_resolution.y;

  vec3 color = vec3(0.0);


  float mask = rectangle(coord, -0.2, 0.2, -0.2, 0.2, 0.001);
  
  color = vec3(1.0, 1.0, 0.0) * mask;

  gl_FragColor = vec4(color, 1.0);
}