precision mediump float;
varying vec2 vTextureCoord;

uniform float time;
uniform sampler2D uSampler;
uniform sampler2D currentImage;
uniform sampler2D oldImage;

void main(void) {
	vec2 uv = vTextureCoord;
	float mytime = time;
	vec3 mask1 = vec3(0.0);
	vec3 mask2 = vec3(0.0);
	vec3 mask3 = vec3(0.0);
	vec3 layer1, layer2, layer3;

	// MASKS
	mask1 += step(0.2, (0.2 * uv.x + uv.y) * 0.8);
	mask1 = 1.0 - mask1; // we invert this mask

	mask2 += step(0.2, (0.2 * uv.x + uv.y) * 0.4);

	mask3 = (1.0 -  mask2) * (1.0 -  mask1); // we invert first both masks

	// LAYERS
	vec4 currentImageT = texture2D(currentImage, vec2(uv.x - 1.0 + mytime, uv.y * 1.5));
	vec4 oldImageT = texture2D(oldImage, vec2(uv.x + mytime, uv.y * 1.5));

	layer1 = currentImageT.rgb + oldImageT.rgb;
	
	vec4 currentImageT2 = texture2D(currentImage, vec2(uv.x - 1.0 + mytime * mytime, uv.y * 1.5));
	vec4 oldImageT2 = texture2D(oldImage, vec2(uv.x + mytime * mytime, uv.y * 1.5));

	layer2 = currentImageT2.rgb + oldImageT2.rgb;

	vec4 currentImageT3 = texture2D(currentImage, vec2(uv.x - 1.0 + mytime * mytime * mytime, uv.y * 1.5));
	vec4 oldImageT3 = texture2D(oldImage, vec2(uv.x + mytime * mytime * mytime, uv.y * 1.5));
	
	layer3 = currentImageT3.rgb + oldImageT3.rgb;
	
	// FILTERING MASKS INTO LAYERS
	vec3 all =   mask1 * layer1 
						 + mask2 * layer3 
						 + mask3 * layer2;
						 
	gl_FragColor = vec4(all, 0.0);
}