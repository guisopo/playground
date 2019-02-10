#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const int AMOUNT = 10;

void main() {
  vec2 coord = 10.0 * (gl_FragCoord.xy - u_resolution / 2.0) / min( u_resolution.y, u_resolution.x);

  float len;

  for(int i = 0; i < AMOUNT; i++){
    len = length(vec2(coord.x, coord.y));

    coord.x = coord.x - cos(coord.y + sin(len)) + (u_time / 9.0);
    coord.y = coord.y + sin(coord.x + cos(len)) + (u_time / 12.0);
  }

  float redDisplacement = 2.2;
  float blueDisplacement = 1.5;
  float greenDisplacement = 1.0;
  
  gl_FragColor = vec4(cos(len * redDisplacement), 
                      cos(len * blueDisplacement), 
                      cos(len * greenDisplacement), 
                      1.0);
}