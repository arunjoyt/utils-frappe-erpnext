(async () => {
  const roles = ["Trip Driver", "Trip Coordinator", "Trip Manager"];

  for (const role of roles) {
    const url = `/api/resource/Role/${encodeURIComponent(role)}`;
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.data) {
        const filename = `${role.replace(/[^a-z0-9]/gi, '_')}.json`; // clean filename
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
      console.warn(`❌ Failed to fetch role: ${role}`, err);
    }
  }
})();