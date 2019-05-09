export function vertShader() { return `
#version 300 es

layout(std140) uniform;

layout(location=0) in vec4 a;

uniform ConfigUniforms {
    float time;
    vec2 timerange;
    vec2 srange0;
    vec2 srange1;
    vec2 trange0;
    vec2 trange1;
    vec4 xweights0;
    vec4 xweights1;
    vec4 yweights0;
    vec4 yweights1;
};

out vec3 vColor;

void main() {
    float s = (2.0 * (a.x - srange1.x) / (srange1.y - srange1.x)) - 1.0;
    float t = (2.0 * (a.y - trange1.x) / (trange1.y - trange1.x)) - 1.0;
    float u = (2.0 * a.z) - 1.0;
    float v = (2.0 * a.w) - 1.0;
    
    vec4 values = vec4(s, t, u, v);
    float x = dot(xweights1, values);
    float y = dot(yweights1, values);

    vec4 p0 = vec4(x, y, 0.0, 1.0);
    vec4 p1 = vec4(x, y, 0.0, 1.0);
    
    //float s = 0.5 + sin(time / 1900.0) / 2.0;
    //float s = smoothstep(remapTime0, remapTime1, time);
    s = sin(time);
    vColor = vec3(1.0, 1.0, 1.0);

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