(async () => {
  const doctypeNames = ["Trip", "Trip Driver", "Trip Additional Charge", "Trip Fare Component", "Sales Invoice", "Customer"];

  for (const doctype of doctypeNames) {
    try {
      const res = await fetch(`/api/resource/DocType/${encodeURIComponent(doctype)}`);
      if (!res.ok) {
        console.warn(`❌ Failed to fetch ${doctype}:`, res.statusText);
        continue;
      }

      const json = await res.json();
      const data = json.data;

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${doctype.replace(/\s+/g, "_")}_doc.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`✅ Downloaded: ${doctype}`);
    } catch (err) {
      console.error(`❌ Error downloading ${doctype}:`, err);
    }
  }

  console.log("✅ All requested Doctypes processed.");
})();