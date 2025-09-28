// Get references to the form and its elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const messageElement = document.getElementById("greeting");
const progressBar = document.getElementById("progressBar");
const attendanceCount = document.getElementById("attendeeCount");
const waterAttendees = document.getElementById("waterAttendees");
const zeroAttendees = document.getElementById("zeroAttendees");
const powerAttendees = document.getElementById("powerAttendees");
const undoBtn = document.getElementById("undoBtn");

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

// Load attendee names by team from localStorage if they exist
let teamAttendees = {
  water: [],
  zero: [],
  power: [],
};
if (localStorage.getItem("teamAttendees")) {
  teamAttendees = JSON.parse(localStorage.getItem("teamAttendees"));
  function renderTeamList(team, ulElement) {
    ulElement.innerHTML = "";
    for (let i = 0; i < teamAttendees[team].length; i++) {
      const li = document.createElement("li");
      li.textContent = teamAttendees[team][i];
      ulElement.appendChild(li);
    }
  }
  renderTeamList("water", waterAttendees);
  renderTeamList("zero", zeroAttendees);
  renderTeamList("power", powerAttendees);
}

// Track undo functionality
let canUndo = false;
let lastCheckIn = null;

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

  // Add attendee name to the correct team list and localStorage
  teamAttendees[team].push(name);
  localStorage.setItem("teamAttendees", JSON.stringify(teamAttendees));
  const teamLi = document.createElement("li");
  teamLi.textContent = name;
  if (team === "water") {
    waterAttendees.appendChild(teamLi);
  } else if (team === "zero") {
    zeroAttendees.appendChild(teamLi);
  } else if (team === "power") {
    powerAttendees.appendChild(teamLi);
  }

  // Store last check-in info for undo
  lastCheckIn = {
    name: name,
    team: team,
  };
  canUndo = true;
  undoBtn.disabled = false;

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

// Undo Check-In button functionality
undoBtn.addEventListener("click", function () {
  if (!canUndo || !lastCheckIn) {
    return;
  }

  // Remove last attendee from team list
  let teamList = teamAttendees[lastCheckIn.team];
  if (
    teamList.length > 0 &&
    teamList[teamList.length - 1] === lastCheckIn.name
  ) {
    teamList.pop();
    localStorage.setItem("teamAttendees", JSON.stringify(teamAttendees));
    // Remove last <li> from the correct team ul
    let ulElement;
    if (lastCheckIn.team === "water") {
      ulElement = waterAttendees;
    } else if (lastCheckIn.team === "zero") {
      ulElement = zeroAttendees;
    } else if (lastCheckIn.team === "power") {
      ulElement = powerAttendees;
    }
    if (ulElement && ulElement.lastChild) {
      ulElement.removeChild(ulElement.lastChild);
    }
  }

  // Decrement team count
  let teamCount = parseInt(
    document.getElementById(lastCheckIn.team + "Count").textContent
  );
  if (teamCount > 0) {
    teamCount--;
    document.getElementById(lastCheckIn.team + "Count").textContent = teamCount;
    localStorage.setItem(lastCheckIn.team + "Count", teamCount);
  }

  // Decrement overall count
  if (count > 0) {
    count--;
    attendanceCount.textContent = count;
    localStorage.setItem("attendeeCount", count);
    const percentage = Math.round((count / maxCount) * 100);
    progressBar.style.width = percentage + "%";
  }

  // Clear lastCheckIn and disable undo
  canUndo = false;
  lastCheckIn = null;
  undoBtn.disabled = true;

  // Clear greeting message
  messageElement.textContent = "";
});

// Admin Reset button functionality
const adminResetBtn = document.getElementById("adminResetBtn");
adminResetBtn.addEventListener("click", function () {
  const password = prompt("Enter 4-digit admin password:");
  if (password === "1234") {
    localStorage.clear();
    location.reload();
  } else {
    alert("Incorrect password. Reset cancelled.");
  }
});
