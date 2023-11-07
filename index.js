const btn_scan = document.getElementById("btn_scan");
const btn_write = document.getElementById("btn_write");
const btn_read = document.getElementById("btn_read");

const show_data = document.getElementById("Show_data");
const show_log = document.getElementById("Show_log");

btn_scan.addEventListener("click", async () => {
  alert("User clicked scan button");

  try {
    const ndef = new NDEFReader();
    await ndef.scan();
    alert("> Scan started");

    ndef.addEventListener("readingerror", () => {
      alert("Argh! Cannot read data from the NFC tag. Try another one?");
    });

    ndef.addEventListener("reading", ({ message, serialNumber }) => {
      alert(serialNumber);

      for (const record of message.records) {
        if (record.recordType === "text") {
          const textBytes = new Uint8Array(record.data.buffer);
          const text = new TextDecoder("utf-8").decode(textBytes);
          show_data.innerHTML = text;
          alert(`> Text: ${text}`);
        } else {
          const textBytes = new Uint8Array(record.data.buffer);

          const text = new TextDecoder("utf-8").decode(textBytes);

          show_data.innerHTML = text;

          alert(`> Text: ${text}`);
        }
      }
    });
  } catch (error) {
    alert("Argh! " + error);
  }
});

btn_write.addEventListener("click", async () => {
  alert("User clicked write button");

  const ndef = new NDEFReader();
  ndef.onreading = (event) => alert("We read a tag!");

  function write(data, { timeout } = {}) {
    return new Promise((resolve, reject) => {
      const ctlr = new AbortController();
      ctlr.signal.onabort = () => reject("Time is up, bailing out!");
      setTimeout(() => ctlr.abort(), timeout);

      ndef.addEventListener(
        "reading",
        (event) => {
          ndef.write(data, { signal: ctlr.signal }).then(resolve, reject);
        },
        { once: true }
      );
    });
  }

  await ndef.scan();
  try {
    // Let's wait for 5 seconds only.
    await write(
      "https://translate.google.com/?hl=vi&sl=en&tl=vi&text=An%20error%20has%20occurred%20during%20the%20writing%20process&op=translate",
      { timeout: 5_000 }
    );
  } catch (err) {
    console.error("Something went wrong", err);
  } finally {
    console.log("We wrote to a tag!");
  }
});
