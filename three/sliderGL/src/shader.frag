precision mediump float;
varying vec2 vTextureCoord;

uniform float time;
uniform sampler2D uSampler;
uniform sampler2D currentimage;
uniform sampler2D oldimage;


void main(void) {
	vec2 uv = vTextureCoord;
	float mytime = time;

	vec4 currentimage = texture2D(currentimage, vec2(uv.x, uv.y*4.5));
	vec4 oldimage = texture2D(oldimage, vec2(uv.x, uv.y*4.5));
	gl_FragColor = oldimage;
}