1. Go to root directory of the project and run `cargo new wasm`.
2. Open the generated `Cargo.toml` file and add the following lines after `[package]`:

```toml
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.74"
```

3. Add the following lines to `wasm/src/main.rs`:

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
    println!("{}", fibonacci(40));
}

```

4. Test by running `cargo run` in the wasm directory.
5. Delete generated files in wasm directory.
6. Rename main.rs to lib.rs
7. Comment out `main()` function from lib.rs
8. Watch as a target folder is created and everything fixes itself.
