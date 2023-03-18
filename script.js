document.addEventListener("DOMContentLoaded", function () {
  const magicButton = document.getElementById("magicButton");
  const messageContainer = document.getElementById("messageContainer");
  const message = document.getElementById("message");
  const messages = [
    "You just made the world a little brighter!",
    "Congratulations! You've unlocked a moment of joy!"
  ];

  function showMessage() {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    message.textContent = randomMessage;
    messageContainer.classList.remove("hidden");
  }

  function createCircleAnimation() {
    const circleAnimation = document.createElement("div");
    circleAnimation.classList.add("circle-animation");
    document.body.appendChild(circleAnimation);
    setTimeout(() => {
      document.body.removeChild(circleAnimation);
      showMessage();
    }, 1000);
  }

  magicButton.addEventListener("click", function () {
    magicButton.classList.add("hidden");
    createCircleAnimation();
  });
});
