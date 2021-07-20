const rust = import("../wasm/pkg");

export const fibonacci = (n: number): number => {
  if (n < 1) {
    return 0;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};

export const fibonacciRust = (n: number): Promise<number> =>
  rust.then((wasm) => wasm.fibonacci(n));
