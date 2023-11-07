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
        } else if (record.recordType === "url") {
          const url = record.data;
          show_data.innerHTML = url;
          alert(`> URL: ${url}`);
        } else if (record.mediaType === "application/json") {
          const json = JSON.parse(record.data);
          alert(`> JSON: ${json}`);
        } else {
          alert(`> Unknown record type`);
        }
      }
    });
  } catch (error) {
    alert("Argh! " + error);
  }
});

// btn_write.addEventListener("click", async () => {
//   alert("User clicked write button");

//   try {
//     const ndef = new NDEFReader();
//     try {
//       await ndef.write({
//         records: [{ recordType: "url", data: "http://example.com/" }],
//       });
//     } catch {
//       console.log("Write failed :-( try again.");
//     }
//   } catch (error) {
//     alert("Argh! " + error);
//   }
// });

// btn_read.addEventListener("click", async () => {
//   alert("User clicked make read-only button");

//   try {
//     const ndef = new NDEFReader();
//     await ndef.makeReadOnly();
//     alert("> NFC tag has been made permanently read-only");
//   } catch (error) {
//     alert("Argh! " + error);
//   }
// });

// When click btn show_log will show the tab log in F12
