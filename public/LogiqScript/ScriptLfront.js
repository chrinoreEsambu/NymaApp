document
  .getElementById("btt")
  .addEventListener("click", async function (event) {
    event.preventDefault();
    const innerplace = document.getElementById("innermailmsg");
    const mail = document.getElementById("mail").value.trim();

    if (!mail) {
      innerplace.innerHTML = "Empty field";
      innerplace.style.backgroundColor = "#f44336";
      innerplace.style.color = "#fff";
      innerplace.style.display = "block";
      return;
    }
    if (!mail.includes("@") || !mail.includes(".")) {
      innerplace.innerHTML = "invalid mail address";
      innerplace.style.backgroundColor = "#f44336";
      innerplace.style.color = "#fff";
      innerplace.style.display = "block";
      return;
    }

    try {
      const response = await fetch("addmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail }),
      });

      if (response.ok) {
        innerplace.textContent = "Mail sent successfully";
        innerplace.style.backgroundColor = "#4caf50";
        // #88ffd1 avec un boxshadow
        innerplace.style.color = "#fff";
        innerplace.style.display = "block";
      } else {
        innerplace.textContent = "critical error adding mail";
        innerplace.style.backgroundColor = "#f44336";
        innerplace.style.color = "#fff";
        innerplace.style.display = "block";
      }
    } catch (error) {
      innerplace.textContent = "Error during the request";
      console.error("Error during the request", error);
    }
  });
