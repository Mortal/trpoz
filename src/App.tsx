import React from "react";
import "./App.css";

const jsAsync = import("./lib/rust/pkg/index");

const parseFile = async (f: FileList) => {
  const file = f[0];
  if (!file) return;
  const js = await jsAsync;
  const chunkSize = 4 * 1024 * 1024;
  let s = 0;
  const t = performance.now();
  for (let i = 0; i < file.size; i += chunkSize) {
    const j = Math.min(i + chunkSize, file.size);
    const sl = file.slice(i, j);
    const b: ArrayBuffer = await (sl as any).arrayBuffer();
    s += js.sum(new Uint8Array(b));
    console.log({progress:j/file.size, s, t: j / (performance.now() - t)});
  }
};

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <input type="file" onChange={e => e.target.files && parseFile(e.target.files)} />
      </header>
    </div>
  );
};

export default App;
