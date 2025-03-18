document
  .getElementById("signin")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    const pseudoInput = document.getElementById("login-username");
    const passwordInput = document.getElementById("login-password");
    const pseudo = pseudoInput.value.trim();
    const userpassword = passwordInput.value.trim();
    const innersign = document.getElementById("innersign");

    if (!pseudo || !userpassword) {
      innersign.innerHTML = "Empty Field";
      innersign.style.backgroundColor = "#f44336";
      innersign.style.color = "#fff";
      innersign.style.display = "block";
      return;
    }

    try {
      const response = await fetch("addusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, userpassword }),
      });

      if (response.ok) {
        innersign.textContent = "Connected Successfully Please wait";
        innersign.style.backgroundColor = "#4caf50";
        innersign.style.color = "#fff";
        innersign.style.display = "block";

        pseudoInput.value = "";
        passwordInput.value = "";

        // setTimeout(() => {
        //   window.location.href = "usermessage/message.html";
        // }, 1000);
      } else {
        innersign.textContent = "Incorrect Pseudo or Password";
        innersign.style.backgroundColor = "#f44336";
        innersign.style.color = "#fff";
        innersign.style.display = "block";

        pseudoInput.value = "";
        passwordInput.value = "";
      }
    } catch (error) {
      console.error("Error during the request", error);
      innersign.textContent = "Error during the request";
      innersign.style.backgroundColor = "#f44336";
      innersign.style.color = "#fff";
      innersign.style.display = "block";

      pseudoInput.value = "";
      passwordInput.value = "";
    }
  });
