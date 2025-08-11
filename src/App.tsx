import React, { useState } from 'react';
import Papa from 'papaparse';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isDark, setIsDark] = useState(false);

  const jsonToCsv = () => {
    try {
      const jsonData = JSON.parse(input);
      const csv = Papa.unparse(jsonData);
      setOutput(csv);
    } catch {
      alert('Invalid JSON format');
    }
  };

  const csvToJson = () => {
    Papa.parse(input, {
      header: true,
      complete: (results) => setOutput(JSON.stringify(results.data, null, 2)),
      error: () => alert('Invalid CSV format'),
    });
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  const copyOutput = () => {
    if (!output) return alert('Nothing to copy!');
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  const downloadOutput = () => {
    if (!output) return alert('Nothing to download!');
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = output.trim().startsWith('{') ? 'output.json' : 'output.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') setInput(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className={isDark ? 'bg-dark text-light min-vh-100' : 'bg-light text-dark min-vh-100'}>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="display-5 fw-bold">VectorConvert</h1>
          <button
            className={`btn btn-${isDark ? 'light' : 'dark'}`}
            onClick={() => setIsDark(!isDark)}
            title="Toggle Dark Mode"
          >
            {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <p className="text-center mb-5 fs-5">
          Convert between JSON and CSV formats quickly and easily.
        </p>

        <div className="row g-4">
          {/* Input Card */}
          <div className={`col-md-6`}>
            <div className={`card h-100 shadow-sm ${isDark ? 'bg-secondary text-light' : ''}`}>
              <div className={`card-header fw-bold ${isDark ? 'bg-primary bg-opacity-75 text-white' : 'bg-primary text-white'}`}>
                Input (Paste JSON or CSV)
              </div>
              <div className="card-body d-flex flex-column">
                <textarea
                  className={`form-control mb-3 flex-grow-1 ${isDark ? 'bg-dark text-light' : ''}`}
                  rows={15}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your JSON or CSV here..."
                />
                <input
                  type="file"
                  accept=".json,.csv,text/plain"
                  className={`form-control ${isDark ? 'bg-dark text-light' : ''}`}
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          </div>

          {/* Output Card */}
          <div className={`col-md-6`}>
            <div className={`card h-100 shadow-sm ${isDark ? 'bg-secondary text-light' : ''}`}>
              <div className={`card-header fw-bold ${isDark ? 'bg-success bg-opacity-75 text-white' : 'bg-success text-white'}`}>
                Output
              </div>
              <div className="card-body d-flex flex-column">
                <textarea
                  className={`form-control mb-3 flex-grow-1 ${isDark ? 'bg-dark text-light' : ''}`}
                  rows={15}
                  value={output}
                  readOnly
                  placeholder="Your converted output will appear here"
                />
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-info me-2 flex-grow-1"
                    onClick={copyOutput}
                    title="Copy output to clipboard"
                  >
                    📋 Copy Output
                  </button>
                  <button
                    className="btn btn-warning flex-grow-1"
                    onClick={downloadOutput}
                    title="Download output as file"
                  >
                    💾 Download Output
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-4">
          <button className="btn btn-primary me-2" onClick={jsonToCsv}>
            JSON → CSV
          </button>
          <button className="btn btn-success me-2" onClick={csvToJson}>
            CSV → JSON
          </button>
          <button className="btn btn-secondary" onClick={clearAll}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
