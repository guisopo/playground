#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circleShape(vec2 position, float radius){
  return step(radius, length(position - vec2(0.5)));
}

void main() {
  vec2 coord = gl_FragCoord.xy / u_resolution;

  vec3 color = vec3(0.0);
  float circleRadius = 0.1;
  float speed = 2.0;
  float radius = 0.5;

  vec2 translate = vec2(sin(u_time * speed) * radius, cos(u_time * speed) * radius);;
  coord += translate * 0.5;

  color += vec3(circleShape(coord, circleRadius));

  gl_FragColor = vec4(color, 1.0);

}