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
    vec2 urange0;
    vec2 urange1;
    vec2 vrange0;
    vec2 vrange1;
    vec4 xweights0;
    vec4 xweights1;
    vec4 yweights0;
    vec4 yweights1;
    vec4 cweights0;
    vec4 cweights1;
};

out vec3 vColor;
out vec2 quiltCoord;

void main() {
    float s = (2.0 * (a.x - srange1.x) / (srange1.y - srange1.x)) - 1.0;
    float t = (2.0 * (a.y - trange1.x) / (trange1.y - trange1.x)) - 1.0;
    float u = (2.0 * (a.z - urange1.x) / (urange1.y - urange1.x)) - 1.0;
    float v = (2.0 * (a.w - vrange1.x) / (vrange1.y - vrange1.x)) - 1.0;
    
    vec4 values = vec4(s, t, u, v);
    float x = dot(xweights1, values);
    float y = dot(yweights1, values);
    float c = dot(cweights1, values);

    quiltCoord = vec2(s, t);

    vec4 p0 = vec4(x, y, 0.0, 1.0);
    vec4 p1 = vec4(x, y, 0.0, 1.0);
    
    //float s = 0.5 + sin(time / 1900.0) / 2.0;
    //float s = smoothstep(remapTime0, remapTime1, time);
    s = sin(time);
    vColor = vec3(1.0, 1.0, 1.0);

    gl_Position = mix(p0, p1, s);
    gl_PointSize = 20.0;
}
`.trim()}

export function fragShader() { return `
#version 300 es
precision highp float;
 
uniform sampler2D quilt;

in vec3 vColor;
in vec2 quiltCoord;
 
out vec4 fragColor;
void main() {
    vec2 diff = gl_PointCoord - vec2(.5, .5);
    vec2 textureCoord = quiltCoord + gl_PointCoord / 100.0;
    vec4 q = texture(quilt, textureCoord);

    fragColor = vec4(q.rgb, 1.0); //vec4(vColor, 1.0);
}
`.trim()}