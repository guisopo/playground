#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float circleShape(vec2 coord, vec2 position, float radius){
  return step(radius, length(coord - position));
}

void main(){
  vec2 coord = gl_FragCoord.xy / u_resolution;
  coord -= 0.5;
  coord.x *= u_resolution.x / u_resolution.y;

  vec3 color = vec3(0.0);

  float circle = circleShape(coord, vec2(-0.25, 0.25), 0.1);

  color = vec3(circle);

  gl_FragColor = vec4(color, 1.0); 
}
