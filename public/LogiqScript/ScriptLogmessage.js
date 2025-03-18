document
  .getElementById("message-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const contentmessage = document.getElementById("message").value.trim();
    const inner = document.getElementById("inner");

    const pseudo = "pseudo";
    const uniqueLink = "uniqueLink";

    if (!contentmessage) {
      inner.innerHTML = "Empty Field";
      inner.style.backgroundColor = "#f44336";
      inner.style.color = "#fff";
      inner.style.display = "block";
      return;
    }

    try {
      const response = await fetch(`/message/${pseudo}/${uniqueLink}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: contentmessage }),
      });

      if (response.ok) {
        console.log("Message sent successfully");
        inner.textContent = "Message sent successfully";
        inner.style.backgroundColor = "#4caf50";
        inner.style.color = "#fff";
        inner.style.display = "block";
      } else {
        console.log("Failed to send message");
        inner.textContent = "Message not created";
        inner.style.backgroundColor = "#f44336";
        inner.style.color = "#fff";
        inner.style.display = "block";
      }

      setTimeout(() => {
        inner.style.display = "none";
      }, 3000);

      document.getElementById("message").value = "";
    } catch (error) {
      console.error("Error:", error);
      inner.textContent = "Error during the request";
      inner.style.backgroundColor = "#f44336";
      inner.style.color = "#fff";
      inner.style.display = "block";

      setTimeout(() => {
        inner.style.display = "none";
      }, 3000);
    }
  });
