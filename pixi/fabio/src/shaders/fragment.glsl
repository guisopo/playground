uniform sampler2D uSampler;//The coordinates of the current pixel
uniform sampler2D uTextureOne;//The coordinates of the current pixel
uniform sampler2D uTextureTwo;//The coordinates of the current pixel
varying vec2 vTextureCoord;//The image data
uniform vec2 uvAspect;
uniform float uTime;

void main() {

  vec2 uv = vec2(vTextureCoord.xy - 0.5) * uvAspect + 0.5;

  vec2 uvDivided = fract(uv*vec2(10.,1.));

  float time = abs(sin(uTime));
  
  vec2 uvDisplaced = uv + vec2(time*uv.x/4.0, 0.);

  
  gl_FragColor = texture2D( uTextureOne, uvDisplaced);
  // gl_FragColor = vec4( uvDivided, 0., 1.);
}