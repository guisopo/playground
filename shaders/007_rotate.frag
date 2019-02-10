#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

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

mat2 rotate(float angle) {
  return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main() {
  vec2 coord = gl_FragCoord.xy / u_resolution;
  coord -= 0.5;
  coord.x *= u_resolution.x / u_resolution.y;
  float speed = 0.5;
  vec3 color = vec3(0.0);

  coord = rotate(-(u_time) * speed) * coord;

  float mask = rectangle(coord, -0.2, 0.2, -0.2, 0.2, 0.001);
  
  color += vec3(rectangle(coord, -0.2, 0.2, -0.2, 0.2, 0.001));

  gl_FragColor = vec4(color, 1.0);
}