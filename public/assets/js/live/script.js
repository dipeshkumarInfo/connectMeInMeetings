function countdownTimer(startTime, endTime, daysId, hoursId, minutesId, secondsId, countdownTimerDivId, join_link ='', home_page_link = '') {
    // Get the current date and time
    const now = new Date();
    
    // Create new Date objects for the start and end times
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startTime.split(':')[0], startTime.split(':')[1], 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endTime.split(':')[0], endTime.split(':')[1], 0, 0);
  
    if (now < start) {
      // Calculate the time difference between now and start time
      const timeLeft = new Date(start - now);
      const totalSecondsLeft = Math.floor(timeLeft / 1000);
      const daysLeft = Math.floor(totalSecondsLeft / (24 * 60 * 60));
      const hoursLeft = Math.floor((totalSecondsLeft % (24 * 60 * 60)) / (60 * 60));
      const minutesLeft = Math.floor((totalSecondsLeft % (60 * 60)) / 60);
      const secondsLeft = totalSecondsLeft % 60;

        document.getElementById(daysId).innerHTML = `${daysLeft} D`;
        document.getElementById(hoursId).innerHTML = `${hoursLeft} H`;
        document.getElementById(minutesId).innerHTML = `${minutesLeft} M`;
        document.getElementById(secondsId).innerHTML = `${secondsLeft} S`;
  
      // Update the countdown every second
      const countdownInterval = setInterval(() => {
        const now = new Date();
        const timeLeft = new Date(start - now);
        const totalSecondsLeft = Math.floor(timeLeft / 1000);
        const daysLeft = Math.floor(totalSecondsLeft / (24 * 60 * 60));
        const hoursLeft = Math.floor((totalSecondsLeft % (24 * 60 * 60)) / (60 * 60));
        const minutesLeft = Math.floor((totalSecondsLeft % (60 * 60)) / 60);
        const secondsLeft = totalSecondsLeft % 60;

        document.getElementById(daysId).innerHTML = `${daysLeft} D`;
        document.getElementById(hoursId).innerHTML = `${hoursLeft} H`;
        document.getElementById(minutesId).innerHTML = `${minutesLeft} M`;
        document.getElementById(secondsId).innerHTML = `${secondsLeft} S`;
  
        if (now >= start) {
          clearInterval(countdownInterval);
          countdownToEndTime(countdownTimerDivId);
        }
      }, 1000);
    } else if (now >= start && now < end) {
      countdownToEndTime(countdownTimerDivId);
    } 
    else{
      document.getElementById("session_status").innerHTML = `Session Time Over, You Can't Join Now`;
    }
  
    function countdownToEndTime(countdownTimerDivId) {

        document.getElementById(daysId).innerHTML = `00 D`;
        document.getElementById(hoursId).innerHTML = `00 H`;
        document.getElementById(minutesId).innerHTML = `00 M`;
        document.getElementById(secondsId).innerHTML = `00 S`;

        document.getElementById("session_status").innerHTML = `Session Stared You Can Join`;
        document.getElementById(countdownTimerDivId).innerHTML = `
        <div class="btn-joins">
                <a href="${join_link}">Join</a>
                <a href="${home_page_link}">Return To Home Screen</a>
            </div>
            `;


        // Calculate the time difference between now and end time
        // const timeLeft = new Date(end - now);
        // const totalSecondsLeft = Math.floor(timeLeft / 1000);
        // const daysLeft = Math.floor(totalSecondsLeft / (24 * 60 * 60));
        // const hoursLeft = Math.floor(totalSecondsLeft / (60 * 60));
        // const minutesLeft = Math.floor((totalSecondsLeft % (60 * 60)) / 60);
        // const secondsLeft = totalSecondsLeft % 60;

        // document.getElementById(daysId).innerHTML = `${daysLeft} D`;
        // document.getElementById(hoursId).innerHTML = `${hoursLeft} H`;
        // document.getElementById(minutesId).innerHTML = `${minutesLeft} M`;
        // document.getElementById(secondsId).innerHTML = `${secondsLeft} S`;

        // document.getElementById(countdownTimerDivId).innerHTML  += `<small class='small'>(Remain Time To Over Session)</small>`;
    }
  }
  
  function copyText(text) {
    // Create a temporary textarea element to hold the text
    var temp = document.createElement("textarea");
    temp.value = text;
    
    // Add the textarea element to the document
    document.body.appendChild(temp);
    
    // Select the text in the textarea element
    temp.select();
    
    // Copy the selected text to the clipboard
    document.execCommand("copy");
    
    // Remove the textarea element from the document
    document.body.removeChild(temp);
    alert('Copied');
  }

  function toggleIcons(e, class1, class2) {
    e.classList.toggle(class1);
    e.classList.toggle(class2);
  }