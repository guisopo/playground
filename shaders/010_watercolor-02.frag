#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const int AMOUNT = 10;

void main() {
  // 1. Normalize UV map going from Zero to One
  vec2 uv = 2.0 * gl_FragCoord.xy / (u_resolution/2.0);
  // 2. Offset cordinates to center 0.5
  uv -= vec2(0.5, 0.5);
  // 3. Now our uvinates go from 0 - 0.5 and 0 to - 0.5. We want to remap cordinates going from -1 to +1 so we multiply by 2 
  uv *= 2.0;
  // 4. Set Image aspect to square
  uv *= u_resolution.xy  / u_resolution.y;

  float len;

  for(int i = 0; i < AMOUNT; i++){
    len = length(vec2(uv.x, uv.y));

    uv.x = uv.x - cos(uv.y + sin(len)) + (u_time / 9.0);
    uv.y = uv.y + sin(uv.x + cos(len)) + (u_time / 12.0);
  }

  float redDisplacement = 2.2;
  float blueDisplacement = 1.5;
  float greenDisplacement = 1.0;
  
  gl_FragColor = vec4(cos(len * redDisplacement), 
                      cos(len * blueDisplacement), 
                      cos(len * greenDisplacement), 
                      1.0);
}