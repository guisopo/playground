#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st = cos(gl_FragCoord.xy/(cos(u_mouse.x)+5.0));
	gl_FragColor = vec4(st.x,st.x,st.x,1.0);
}
