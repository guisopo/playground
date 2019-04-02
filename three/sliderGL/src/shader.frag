precision mediump float;
varying vec2 vTextureCoord;

uniform float time;
uniform sampler2D uSampler;
uniform sampler2D currentImage;
uniform sampler2D oldImage;

void main(void) {
	vec2 uv = vTextureCoord;
	float mytime = time;
	vec3 mask = vec3(0.0);
	vec3 mask2 = vec3(0.0);
	vec3 mask3 = vec3(0.0);
	vec3 layer1, layer2, layer3;

	mask += step(0.2, (0.2* uv.x + uv.y)*0.8);
	mask2 += step(0.2, (0.2* uv.x + uv.y)*0.6);
	mask3 += step(0.2, (0.2* uv.x + uv.y)*0.4);
	// Invert masks
	mask = 1.0 - mask;
	mask2 = 1.0 - mask2;
	mask3 = 1.0 - mask3;

	vec4 currentImageT = texture2D(currentImage, vec2(uv.x - 1.0 + mytime, uv.y * 1.5));
	vec4 oldImageT = texture2D(oldImage, vec2(uv.x + mytime, uv.y * 1.5));
	layer1 = currentImageT.rgb + oldImageT.rgb;

	vec4 currentImageT2 = texture2D(currentImage, vec2(uv.x - 1.0 + mytime, uv.y * 1.5));
	vec4 oldImageT2 = texture2D(oldImage, vec2(uv.x + mytime, uv.y * 1.5));
	layer2 = currentImageT2.rgb + oldImageT2.rgb;

	vec4 currentImageT3 = texture2D(currentImage, vec2(uv.x - 1.0 + mytime, uv.y * 1.5));
	vec4 oldImageT3 = texture2D(oldImage, vec2(uv.x + mytime, uv.y * 1.5));
	layer3 = currentImageT3.rgb + oldImageT3.rgb;
	
	vec3 all = mask * layer1 + mask2 * layer2 + mask3 * layer3;
	gl_FragColor = vec4(all, 0.0);
}