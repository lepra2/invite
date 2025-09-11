document.getElementById("codeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const code = document.getElementById("code").value;

  try {
    // 1. Проверка кодового слова же
    const checkRes = await fetch("https://api.leprosorium2.ru/check-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const checkData = await checkRes.json();

    if (!checkData.success) {
      document.getElementById("result").textContent = "Неверное кодовое слово";
      return;
    }

    // 2. Отправка email
    const emailRes = await fetch("https://api.leprosorium2.ru/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const emailData = await emailRes.json();

    document.getElementById("result").textContent = JSON.stringify(emailData);
  } catch (err) {
    document.getElementById("result").textContent = "Ошибка: " + err.message;
  }
});
