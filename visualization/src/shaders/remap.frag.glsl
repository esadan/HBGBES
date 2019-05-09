#version 300 es
precision highp float;
 
uniform sampler2D tex;
in vec3 vColor;
 
out vec4 fragColor;
void main() {
    fragColor = vec4(vColor, 1.0); //vec4(vColor, 1.0);
}