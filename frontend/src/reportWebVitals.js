const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    import("web-vitals").then(
      ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      }
    );
  }
};

export default reportWebVitals;

// Example usage in index.js:
// reportWebVitals(console.log);

// Or send to analytics:
// reportWebVitals((metric) => {
//   fetch('/analytics', {
//     method: 'POST',
//     body: JSON.stringify(metric),
//   });
// });
