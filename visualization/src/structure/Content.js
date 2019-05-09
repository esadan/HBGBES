import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import PicoGL from 'picogl';

import readLogData from '../scripts/LogDataRepository';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    canvas: {
        width: '100%',
        height: '100%',
        backgroundColor: 'pink'
    }
});

function definePicoUniform(picoApp, name, properties) {
  let nameToIndex = Object.keys(properties).reduce((prev, curr, index) => {
      prev[curr] = index
      return prev
  }, {})
  let listOfTypes = Object.keys(properties).map(key => properties[key])
  let picoUniformBuffer = picoApp.createUniformBuffer(listOfTypes)

  let values = {}
  let result = {}
  Object.keys(properties).forEach(key => {
      Object.defineProperty(result, key, {
          get() { return values[key] },
          set(value) { 
              values[key] = value
              picoUniformBuffer.set(nameToIndex[key], value).update() 
          }
      })
  })
  result.bindToPicoDrawCall = function(picoDrawCall) {
      picoDrawCall.uniformBlock(name, picoUniformBuffer)
  }
  return result
}

let frag = `#version 300 es
precision highp float;
 
uniform sampler2D tex;
in vec3 vColor;
 
out vec4 fragColor;
void main() {
    fragColor = vec4(vColor, 1.0); //vec4(vColor, 1.0);
}`

let vert = `#version 300 es

layout(std140) uniform;

layout(location=0) in vec4 a;

uniform ConfigUniforms {
    float time;
    float daniel0;
    float daniel1;
};

out vec3 vColor;

void main() {
    vec4 p0 = vec4(2.0 * a.y - 1.0, 2.0 * a.x - 1.0, 0.0, 1.0);
    vec4 p1 = vec4(2.0 * a.z - 1.0, 2.0 * a.w - 1.0, 0.0, 1.0);
    
    //float s = 0.5 + sin(time / 1900.0) / 2.0;
    float s = smoothstep(daniel0, daniel1, time);
    vColor = vec3(a.x, a.y, a.z);

    gl_Position = mix(p0, p1, s);
    gl_PointSize = 2.0;
}`

let globalTime = 0

function setupPicoGL(canvas) {
    let app = PicoGL.createApp(canvas)
    .clearColor(0, 0, 0, 1)

    //const vert = require('../shaders/remap.vert.glsl')
    //const frag = require('../shaders/remap.frag.glsl')
    const program = app.createProgram(vert, frag)

    const data = app.createVertexBuffer(PicoGL.FLOAT, 4, readLogData())

    const vertices = app.createVertexArray()
    .vertexAttributeBuffer(0, data)

    let uniforms = definePicoUniform(app, "ConfigUniforms", {
        time: PicoGL.FLOAT,
        remapTime0: PicoGL.FLOAT,
        remapTime1: PicoGL.FLOAT
    })
      
    uniforms.time = 0.0
    uniforms.remapTime0 = 0.0
    uniforms.remapTime1 = 0.0

    const drawCall = app
    .createDrawCall(program, vertices)
    .primitive(PicoGL.POINTS)

    uniforms.bindToPicoDrawCall(drawCall)

    function draw(time) {
        globalTime = time / 1000
        uniforms.time = globalTime
        app.clear();
        drawCall.draw();
        // requestAnimationFrame(draw);
    }

    return {
        uniforms,
        draw
    }
}

function setitallup() {
    const canvas = document.getElementById('canvas')
    return setupPicoGL(canvas)
}

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        menuValue: 0
    };
  }

  componentDidMount() {
    let it = setitallup()
    it.draw()
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <canvas className={classes.canvas} id="canvas"></canvas>
        </Paper>
      </div>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);