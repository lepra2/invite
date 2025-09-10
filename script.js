document.getElementById("codeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const code = document.getElementById("code").value;

  try {
    const response = await fetch("https://api.leprosorium2.ru/check-code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();
    document.getElementById("result").textContent = JSON.stringify(data);
  } catch (err) {
    document.getElementById("result").textContent = "Ошибка: " + err.message;
  }
});
