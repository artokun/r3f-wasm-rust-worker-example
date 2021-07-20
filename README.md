1. Eject!
1. Go to root directory of the project and run `cargo new wasm`.
1. Open the generated `Cargo.toml` file and add the following lines after `[package]`:

```toml
[lib]
crate-type = ["cdylib"]
path = "src/lib.rs"

[dependencies]
wasm-bindgen = "0.2.74"
```

AND Add the following lines to `wasm/src/main.rs`:

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 1,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

// Test
fn main() {
    println!("{}", fibonacci(42));
}

```

4. Test by running `cargo run` in the wasm directory.
5. Rename main.rs to lib.rs
6. Remove `main()` function from lib.rs
7. Watch as a target folder is created and everything fixes itself.
8. Add wasm dependencies `yarn add @wasm-tool/wasm-pack-plugin wasm-loader`
9. Import `const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");` at the top of `config/webpack.config.js`
10. Search for `HtmlWebpackPlugin` in `config/webpack.config.js` and add the following lines AFTER it:

```js
new WasmPackPlugin({
  crateDirectory: path.resolve(__dirname, "../src/wasm"),
}),
```

13. Now search for `file-loader` and insert the following lines BEFORE it:

```js
{
  test: /\.wasm$/,
  include: path.resolve(__dirname, "src"),
  use: [{
      loader: require.resolve("wasm-loader"),
      options: {}
  }],
},

```

14. Lastly add `/\.wasm$/` to the end of the exclude list in `file-loader`

15. Restart the project
16. View the `src/wasm/pkg` directory
17. Go back to `App.tsx` and import the rust wasm-bindgen

```tsx
const rust = import("./wasm/pkg");
```

17. Create the rust useCallback function

```tsx
const getRsTime = useCallback(async () => {
  const startTime = Date.now();
  const wasm = await rust;
  wasm.fibonacci(42);
  setRsTime((Math.floor(Date.now() - startTime) / 1000).toFixed(2) + "s RS");
}, []);
```

18. Add to the red box onClick event

```
  onClick={getRsTime}
```
