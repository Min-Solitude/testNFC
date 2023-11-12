const id = new URLSearchParams(location.search).get("id");

console.log(id); // 1
console.log(typeof id); // 1

const btn_write = document.getElementById("btn_write");
const start = document.getElementById("start");

btn_write.addEventListener("click", async () => {
  start.style = `
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const ndef = new NDEFReader();

  await ndef.write({
    records: [{ recordType: "text", data: id }],
  });

  alert("Truyền dữ liệu thành công");

  start.style = `
    display: none;
  `;

  ndef.addEventListener("readingerror", () => {
    alert("Địt mẹ lỗi! Vui lòng thử lại?");
  });
});
