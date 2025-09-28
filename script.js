// Get references to the form and its elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const messageElement = document.getElementById("greeting");
const progressBar = document.getElementById("progressBar");
const attendanceCount = document.getElementById("attendeeCount");

// Track attendance
let count = 0;
const maxCount = 15; // Maximum number of attendees

// Load counts from localStorage if they exist
if (localStorage.getItem("attendeeCount")) {
  count = parseInt(localStorage.getItem("attendeeCount"));
  attendanceCount.textContent = count;
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = percentage + "%";
}
if (localStorage.getItem("waterCount")) {
  document.getElementById("waterCount").textContent =
    localStorage.getItem("waterCount");
}
if (localStorage.getItem("zeroCount")) {
  document.getElementById("zeroCount").textContent =
    localStorage.getItem("zeroCount");
}
if (localStorage.getItem("powerCount")) {
  document.getElementById("powerCount").textContent =
    localStorage.getItem("powerCount");
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Custom code runs here when the form is submitted

  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  //Increment count and check limit
  count++;
  localStorage.setItem("attendeeCount", count); // Save attendee count
  console.log("Total Check-ins: ", count);

  // Show updated attendee count
  attendanceCount.textContent = count;

  //Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = percentage + "%";
  console.log(`Progress: ${percentage}%`);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  let teamCount = parseInt(teamCounter.textContent) + 1;
  teamCounter.textContent = teamCount;
  localStorage.setItem(team + "Count", teamCount); // Save team count

  // Check if goal reached
  if (count >= maxCount) {
    // Find winning team
    const waterCount = parseInt(
      document.getElementById("waterCount").textContent
    );
    const zeroCount = parseInt(
      document.getElementById("zeroCount").textContent
    );
    const powerCount = parseInt(
      document.getElementById("powerCount").textContent
    );

    let winningTeam = "Team Water Wise";
    let maxTeamCount = waterCount;
    if (zeroCount > maxTeamCount) {
      winningTeam = "Team Net Zero";
      maxTeamCount = zeroCount;
    }
    if (powerCount > maxTeamCount) {
      winningTeam = "Team Renewables";
      maxTeamCount = powerCount;
    }

    const celebration = `🏆 Goal reached! Congratulations, ${winningTeam}! 🎊`;
    messageElement.textContent = celebration;
    messageElement.className = "greeting-fun";
  } else {
    // Show welcome message
    const message = `🎉 Welcome, ${name} from ${teamName}! 🌟`;
    messageElement.textContent = message;
    messageElement.className = "greeting-fun";
    console.log(message);
  }

  // Reset the form
  form.reset();
});
