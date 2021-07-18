React-Three-Fiber typescript starter

Demo: https://r3f-typescript-starter.artlongbottom.com/

### Eject and add `glslify-loader` + `raw-loader`

- `yarn add glslify-loader raw-loader`

```js
// config/webpack.config.js
// Add before `file-loader`
{
  test: /\.(glsl|vs|fs|vert|frag)$/,
  exclude: /node_modules/,
  use: ["raw-loader", "glslify-loader"],
},
```
