import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import PicoGL from 'picogl';

import readLogData from '../scripts/LogDataRepository';
import readTileData from '../scripts/TileDataRepository';

import { vertShader, fragShader } from '../shaders/shaders.js';

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
              if (!value) { return }
              picoUniformBuffer.set(nameToIndex[key], value).update() 
          }
      })
  })
  result.bindToPicoDrawCall = function(picoDrawCall) {
      picoDrawCall.uniformBlock(name, picoUniformBuffer)
  }
  return result
}

function bindImageToPicoDrawCall(picoApp, picoDrawCall, name, url) {
    const image = new Image()
    image.onload = function() {
        const texture = picoApp.createTexture2D(image, { flipY: true })
        picoDrawCall.texture(name, texture)
        picoDrawCall.hold = false
    }
    image.src = url
}

function setupPicoGL(canvas) {
    let app = PicoGL.createApp(canvas)
    .clearColor(0, 0, 0, 1)

    const program = app.createProgram(vertShader(), fragShader())
    //const data = app.createVertexBuffer(PicoGL.FLOAT, 4, readLogData())
    const data = app.createVertexBuffer(PicoGL.FLOAT, 4, readTileData())
    const vertices = app.createVertexArray()
    .vertexAttributeBuffer(0, data)

    let uniforms = definePicoUniform(app, "ConfigUniforms", {
        time: PicoGL.FLOAT,
        timerange: PicoGL.FLOAT_VEC2,
        srange0: PicoGL.FLOAT_VEC2,
        srange1: PicoGL.FLOAT_VEC2,
        trange0: PicoGL.FLOAT_VEC2,
        trange1: PicoGL.FLOAT_VEC2,
        urange0: PicoGL.FLOAT_VEC2,
        urange1: PicoGL.FLOAT_VEC2,
        vrange0: PicoGL.FLOAT_VEC2,
        vrange1: PicoGL.FLOAT_VEC2,
        xweights0: PicoGL.FLOAT_VEC4,
        xweights1: PicoGL.FLOAT_VEC4,
        yweights0: PicoGL.FLOAT_VEC4,
        yweights1: PicoGL.FLOAT_VEC4,
        cweights0: PicoGL.FLOAT_VEC4,
        cweights1: PicoGL.FLOAT_VEC4
    })

    const drawCall = app
    .createDrawCall(program, vertices)
    .primitive(PicoGL.POINTS)

    drawCall.hold = true
    
    uniforms.bindToPicoDrawCall(drawCall)
    bindImageToPicoDrawCall(app, drawCall, 'quilt', './quilt.png')

    function drawFunction() {
        app.clear();
        if (!drawCall.hold) {
            drawCall.draw();
        }
    }

    return {
        uniforms,
        drawFunction
    }
}

function panelsToUniforms(input, uniforms) {
  uniforms.srange0 = uniforms.srange1
  uniforms.trange0 = uniforms.trange1
  uniforms.urange0 = uniforms.urange1
  uniforms.vrange0 = uniforms.vrange1
  uniforms.map0 = uniforms.map
  uniforms.xweights0 = uniforms.xweights1
  uniforms.yweights0 = uniforms.yweights1
  uniforms.cweights0 = uniforms.cweights1
  uniforms.timerange = new Float32Array([uniforms.time, uniforms.time + 2])

  uniforms.srange1 = new Float32Array([input.S.min / 100, input.S.max / 100])
  uniforms.trange1 = new Float32Array([input.T.min / 100, input.T.max / 100])
  uniforms.urange1 = new Float32Array([input.U.min / 100, input.U.max / 100])
  uniforms.vrange1 = new Float32Array([input.V.min / 100, input.V.max / 100])
  let variables = [ input.S, input.T, input.U, input.V ]
  uniforms.xweights1 = new Float32Array(variables.map(v => v.x ? 1.0 : 0.0))
  uniforms.yweights1 = new Float32Array(variables.map(v => v.y ? 1.0 : 0.0))
  uniforms.cweights1 = new Float32Array(variables.map(v => v.color ? 1.0 : 0.0))
}

class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        menuValue: 0,
        animationTime: 0,
        gpuUniforms: {},
        drawFunction: () => {}
    };
  }

  draw(time) {
    const { gpuUniforms, gpuDrawFunction } = this.state;
    gpuUniforms.time = time / 1000;
    gpuDrawFunction();
    requestAnimationFrame(time => this.draw(time));
  }

  componentDidMount() {
    const canvas = document.getElementById('canvas')
    const { uniforms, drawFunction } = setupPicoGL(canvas)
    
    this.setState({ 
      gpuUniforms: uniforms,
      gpuDrawFunction: drawFunction
    });

    requestAnimationFrame(time => this.draw(time));
  }

  render() {
    const { classes, panels } = this.props;
    const { gpuUniforms } = this.state;

    panelsToUniforms(panels, gpuUniforms);

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