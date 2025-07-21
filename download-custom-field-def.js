(async () => {
  const doctypes = ["Sales Invoice", "Address"];

  for (const dt of doctypes) {
    const listUrl = `/api/resource/Custom Field?filters=${encodeURIComponent(JSON.stringify([["dt", "=", dt]]))}&fields=["name"]&limit_page_length=1000`;

    try {
      const listRes = await fetch(listUrl);
      const listJson = await listRes.json();
      const names = (listJson.data || []).map(f => f.name);

      const fields = [];

      for (const name of names) {
        const safeName = encodeURIComponent(name);
        const fieldUrl = `/api/resource/Custom Field/${safeName}`;
        try {
          const fieldRes = await fetch(fieldUrl);
          const fieldJson = await fieldRes.json();
          if (fieldJson.data) fields.push(fieldJson.data);
        } catch (err) {
          console.warn(`❌ Failed to fetch: ${name}`, err);
        }
      }

      if (fields.length > 0) {
        const blob = new Blob([JSON.stringify(fields, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${dt.replace(/\s+/g, "_")}_custom_fields.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log(`✅ Downloaded Custom Fields for ${dt}`);
      } else {
        console.log(`ℹ️ No custom fields found for ${dt}`);
      }

    } catch (err) {
      console.error(`❌ Failed to fetch list for ${dt}:`, err);
    }
  }

  console.log("✅ All done.");
})();