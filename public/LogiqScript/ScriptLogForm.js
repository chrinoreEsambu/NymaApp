document
  .getElementById("sign-up")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const pseudo = document.getElementById("register-username").value.trim();
    const usermail = document.getElementById("register-email").value.trim();
    const userpassword = document
      .getElementById("register-password")
      .value.trim();
    const inner = document.getElementById("inner");

    if (!usermail) {
      inner.innerHTML = "Empty Field";
      inner.style.backgroundColor = "#f44336";
      inner.style.color = "#fff";
      inner.style.display = "block";
      return;
    }

    if (!usermail.includes("@") || !usermail.includes(".")) {
      inner.innerHTML = "Invalid Mail address";
      inner.style.backgroundColor = "#f44336";
      inner.style.color = "#fff";
      inner.style.display = "block";
      return;
    }

    try {
      const response = await fetch("adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, usermail, userpassword }),
      });

      if (response.ok) {
        inner.textContent = "Account Created Successfully";
        alert(
          "votre compte a ete creer patienté quelque seconde vous serez redirigez"
        );
        inner.style.backgroundColor = "#4caf50";
        inner.style.color = "#fff";
        inner.style.display = "block";

        setTimeout(() => {
          window.location.href = "usermessage/message.html";
        }, 1000);
      } else {
        inner.textContent = "Account not created";
        inner.style.backgroundColor = "#f44336";
        inner.style.color = "#fff";
        inner.style.display = "block";
      }
    } catch (error) {
      inner.textContent = "Error during the request";
      console.error("Error during the request", error);
    }
  });
