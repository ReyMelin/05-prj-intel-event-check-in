// Get references to the form and its elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const messageElement = document.getElementById("greeting");
const progressBar = document.getElementById("progressBar");
const attendanceCount = document.getElementById("attendeeCount");

// Track attendance
let count = 0;
const maxCount = 15 // Maximum number of attendees

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
  console.log("Total Check-ins: ", count);

  // Show updated attendee count
  attendanceCount.textContent = count;

  //Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = percentage + "%";
  console.log(`Progress: ${percentage}%`);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

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
