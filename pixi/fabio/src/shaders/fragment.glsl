uniform sampler2D uSampler;//The coordinates of the current pixel
uniform sampler2D uTextureOne;//The coordinates of the current pixel
uniform sampler2D uTextureTwo;//The coordinates of the current pixel
varying vec2 vTextureCoord;//The image data
uniform vec2 uvAspect;
uniform float uProgress;
uniform float uColumns;
uniform float uRows;

mat2 rotate(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

void main() {

  vec2 uv = vec2(vTextureCoord.xy - 0.5) * uvAspect + 0.5;
  
  float progress = fract(uProgress);

  vec2 uvDivided = fract(uv * vec2(uColumns, uRows));
  
  vec2 uvDisplaced1 = uv + rotate(3.1415/4.) * uvDivided * progress * 0.1;
  vec2 uvDisplaced2 = uv + rotate(3.1415/4.) * uvDivided * (1. - progress) * 0.1;

  
  vec4 img1 = texture2D( uTextureOne, uvDisplaced1);
  vec4 img2 = texture2D( uTextureTwo, uvDisplaced2);
  
  gl_FragColor = mix(img1, img2, progress);
}