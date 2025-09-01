  
document.addEventListener("DOMContentLoaded", music);

function music() {
    let soundEnabled = false;  // global sound state
    let muteBtn = document.getElementById("mute-btn");
    muteBtn.addEventListener("click", function () { 
        soundEnabled = !soundEnabled;
   
    // If turning sound OFF → pause melody if playing
    if (soundEnabled===true) {
      document.getElementById("intro-melody").play();
        muteBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i> Sound On` ;
    } else {
        document.getElementById("intro-melody").pause(); 
         muteBtn.innerHTML =  `<i class="fa-solid fa-volume-xmark"></i> Sound Off` ;
    }
  });
}

const startScreen = document.getElementById("start-screen");
const nameScreen = document.getElementById("name-screen");

document.getElementById("start-btn").addEventListener("click", namePage);

function namePage() {
  startScreen.classList.remove("active");
  nameScreen.classList.add("active");
}

document.getElementById("name-btn").addEventListener("click", function () {
  const title = document.querySelector(".person-title").value;
  const name = document.querySelector(".name-input").value.trim();

  // Clear previous messages
  document.getElementById("title-error").textContent = "";
  document.getElementById("name-error").textContent = "";

  if (!title) {
    document.getElementById("title-error").innerHTML =
      `<i class="fa-solid fa-triangle-exclamation"></i> Please select a title.`;
    return false;
  }

  if (!name) {
    document.getElementById("name-error").innerHTML =
      `<i class="fa-solid fa-triangle-exclamation"></i>Please enter your name.`;
    return false;
  }

  // If both are filled,
  localStorage.setItem("playerName", name);
  localStorage.setItem("playerTitle", title);
  window.location.href = "enter_name.html";
  return true;
});
