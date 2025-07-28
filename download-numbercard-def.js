(async () => {
  const numbercards = ["Driver Not Assigned Trips", "Tomorrow's Trips", "Today's Trips"];

  for (const numbercard of numbercards) {
    const url = `/api/resource/Number Card/${encodeURIComponent(numbercard)}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.data) {
        const filename = `${numbercard.replace(/[^a-z0-9]/gi, '_')}.json`; // clean filename
        const blob = new Blob([JSON.stringify(json.data, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log(`✅ Downloaded ${filename}`);
      }
    } catch (err) {
      console.warn(`❌ Failed to fetch numbercard: ${numbercard}`, err);
    }
  }
})();