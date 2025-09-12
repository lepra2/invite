document.getElementById("codeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const code = document.getElementById("code").value;
  const token = document.querySelector("[name='cf-turnstile-response']").value;

  if (!token) {
    document.getElementById("result").textContent = "Ошибка: нет токена Turnstile";
    return;
  }

  try {
    // 1. Проверка кодового слова
    const checkRes = await fetch("https://api.leprosorium2.ru/check-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, "cf-turnstile-response": token }),
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
      body: JSON.stringify({ email, "cf-turnstile-response": token }),
    });
    const emailData = await emailRes.json();

    document.getElementById("result").textContent = JSON.stringify(emailData);
  } catch (err) {
    document.getElementById("result").textContent = "Ошибка: " + err.message;
  }
});
