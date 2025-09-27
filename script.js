// Get references to the form and its elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");

// Track attendance
let count = 0;
const maxCount = 50; // Maximum number of attendees

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

  //Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // Show welcome message
  const greeting = `Welcome, ${name} from ${teamName}!`;
  greeting.textContent = greeting;
  console.log(greeting);

  // Reset the form
  form.reset();
});
