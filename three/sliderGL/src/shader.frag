precision mediump float;
varying vec2 vTextureCoord;

uniform float time;
uniform sampler2D uSampler;
uniform sampler2D currentImage;
uniform sampler2D oldImage;

void main(void) {
	vec2 uv = vTextureCoord;
	float mytime = time;

	vec4 currentImage = texture2D(currentImage, vec2(uv.x - 1.0 + mytime, uv.y * 1.5));
	vec4 oldImage = texture2D(oldImage, vec2(uv.x + mytime, uv.y * 1.5));
	vec4 bothImages = currentImage + oldImage;
	gl_FragColor = bothImages;
}