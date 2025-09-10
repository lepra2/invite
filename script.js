document.getElementById("codeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const code = document.getElementById("code").value;

  try {
    const response = await fetch("https://api.leprosorium2.ru/check-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    document.getElementById("result").textContent =
      data.success ? "ДА ЛАДНА" : "Ну вот :)";
  } catch (err) {
    document.getElementById("result").textContent = "Ошибка соединения";
  }
});
