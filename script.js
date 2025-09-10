async function checkCode() {
  const code = document.querySelector("#code").value;

  const res = await fetch("https://api.leprosorium2.ru/check-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  });

  const data = await res.json();
  console.log(data);
}
