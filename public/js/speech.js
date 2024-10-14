const synth = window.speechSynthesis;
const inputForm = document.querySelector("form");
const inputTxt = document.querySelector(".txt");
const voiceSelect = document.querySelector("select");

const btn_speak  = document.getElementById("speak");
const btn_stop = document.getElementById("stop");
const element = document.getElementById("reader");
const list = element.querySelectorAll("p");

const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector(".pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector(".rate-value");


var utterThis  = new SpeechSynthesisUtterance();

let voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();

    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
  });
  const selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    if(voices[i].lang == 'en-GB' || voices[i].lang == 'en-US') {
        option.textContent = `${voices[i].name} (${voices[i].lang})`;
        if (voices[i].default) {
            option.textContent += " -- DEFAULT";
          }
      
          option.setAttribute("data-lang", voices[i].lang);
          option.setAttribute("data-name", voices[i].name);
          voiceSelect.appendChild(option);
    }


  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
  if(synth.paused) {
    console.log("speechSynthesis.paused");
    document.getElementById('speak').classList.remove('fa-play');
    document.getElementById('speak').classList.add('fa-pause');
    synth.resume();
    return
  }
  else if (synth.speaking) {
    console.log("speechSynthesis.speaking");
    document.getElementById('speak').classList.add('fa-play');
    document.getElementById('speak').classList.remove('fa-pause');
    synth.pause();
    return;
  }
  else {
    document.getElementById('speak').classList.remove('fa-play');
    document.getElementById('speak').classList.add('fa-pause');
  }


  let text ="";
  list.forEach((val)=>{
      text +="\n"+ val.innerText 
  })

   // const utterThis = new SpeechSynthesisUtterance(text);
   utterThis.text = text;
    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    const selectedOption =
      voiceSelect.selectedOptions[0].getAttribute("data-name");

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    synth.speak(utterThis);

}


btn_speak.addEventListener("click", function (event) {
    speak();

});


btn_stop.addEventListener("click", (event)=>{
    synth.cancel(utterThis);
})

voiceSelect.onchange = function () {
  speak();
  this.blur();
};

voiceSelect.onclick = function () {
    synth.cancel(utterThis);
};

synth.addEventListener('speak', function(ev) {
  console.log('speaking')
});

