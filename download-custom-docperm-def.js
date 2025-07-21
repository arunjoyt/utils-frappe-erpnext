(async () => {
  const roles = ["Trip Manager", "Trip Coordinator", "Trip Driver"]; 

  for (const role of roles) {
    const listUrl = `/api/resource/Custom DocPerm?filters=${encodeURIComponent(JSON.stringify([["role", "=", role]]))}&limit_page_length=1000`;

    try {
      const res = await fetch(listUrl);
      const { data } = await res.json();

      if (!data || !data.length) {
        console.log(`ℹ️ No Custom DocPerms found for role: ${role}`);
        continue;
      }

      const fullEntries = [];

      for (const item of data) {
        const detailUrl = `/api/resource/Custom DocPerm/${encodeURIComponent(item.name)}`;
        const detailRes = await fetch(detailUrl);
        const detailJson = await detailRes.json();
        if (detailJson.data) {
          fullEntries.push(detailJson.data);
        }
      }

      const filename = `${role.replace(/[^a-z0-9]/gi, '_')}_custom_docperms.json`;
      const blob = new Blob([JSON.stringify(fullEntries, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`✅ Downloaded full Custom DocPerms for role: ${role}`);
    } catch (err) {
      console.error(`❌ Error while fetching Custom DocPerms for role: ${role}`, err);
    }
  }
})();