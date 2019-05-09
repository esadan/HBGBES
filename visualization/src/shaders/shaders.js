export function vertShader() { return `
#version 300 es

layout(std140) uniform;

layout(location=0) in vec4 a;

uniform ConfigUniforms {
    float time;
    float remapTime0;
    float remapTime1;
};

out vec3 vColor;

void main() {
    vec4 p0 = vec4(2.0 * a.y - 1.0, 2.0 * a.x - 1.0, 0.0, 1.0);
    vec4 p1 = vec4(2.0 * a.z - 1.0, 2.0 * a.w - 1.0, 0.0, 1.0);
    
    //float s = 0.5 + sin(time / 1900.0) / 2.0;
    float s = smoothstep(remapTime0, remapTime1, time);
    s = sin(time);
    vColor = vec3(a.x, a.y, a.z);

    gl_Position = mix(p0, p1, s);
    gl_PointSize = 2.0;
}
`.trim()}

export function fragShader() { return `
#version 300 es
precision highp float;
 
uniform sampler2D tex;
in vec3 vColor;
 
out vec4 fragColor;
void main() {
    vec2 diff = gl_PointCoord - vec2(.5, .5);
    if (length(diff) > 0.5) { 
        discard;
    }
    fragColor = vec4(vColor, 1.0); //vec4(vColor, 1.0);
}
`.trim()}