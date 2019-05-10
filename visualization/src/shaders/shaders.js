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

    vec3 xyc0 = vec3(
        dot(xweights0, values),
        dot(yweights0, values),
        dot(cweights0, values)
    );
    vec3 xyc1 = vec3(
        dot(xweights1, values),
        dot(yweights1, values),
        dot(cweights1, values)
    );

    quiltCoord = vec2(s, t);
    
    vColor = vec3(1.0, 1.0, 1.0);

    float timescale = smoothstep(timerange.x, timerange.y, time);
    vec3 xyc = mix(xyc0, xyc1, timescale);
    gl_Position = vec4(xyc.x, xyc.y, 0.0, 1.0);
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