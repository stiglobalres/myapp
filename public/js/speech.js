const synth = window.speechSynthesis;
const inputForm = document.querySelector("form");
const inputTxt = document.querySelector(".txt");
const voiceSelect = document.querySelector("select");

const btn_speak  = document.getElementById("speak");
const btn_pause = document.getElementById("pause");
const btn_stop = document.getElementById("stop");
const element = document.getElementById("reader");
const list = element.querySelectorAll("p");

const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector(".pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector(".rate-value");

var utterThis  = new SpeechSynthesisUtterance();

let voices = [];
let utterIndex = 0;
let totalUtter = list.length;
let selectedVoice ='';

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
  const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
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

function play() {
  btn_speak.classList.remove('fa');
  btn_speak.classList.add('hidden');

  btn_pause.classList.remove('hidden');
  btn_pause.classList.add('fa');

  btn_stop.classList.remove('disabled');
  btn_stop.removeAttribute('disabled');
  speak();
}

function pause() {
  btn_speak.classList.add('fa');
  btn_speak.classList.remove('hidden');

  btn_pause.classList.add('hidden');
  btn_pause.classList.remove('fa');

  list.forEach((line, index) => {
    list[index].classList.remove('bg-gray-300');
  });
  synth.cancel(utterThis);
}

function stop() {
  utterIndex =0;
  btn_stop.setAttribute('disabled','disabled');
  btn_stop.classList.add('disabled');

  btn_speak.classList.add('fa');
  btn_speak.classList.remove('hidden');

  btn_pause.classList.add('hidden');
  btn_pause.classList.remove('fa');

  list.forEach((line, index) => {
    list[index].classList.remove('bg-gray-300');
  });

  synth.cancel(utterThis);
}

function setUtter(x) {
  let text = list[x].textContent;
  if(x >= totalUtter) {
    return;
  }
  if(text =='') {
    utterIndex += 1;
    setUtter(utterIndex);
    return;
  }
  if(list[x].textContent)
  utterThis = new SpeechSynthesisUtterance(list[x].textContent);

  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedVoice) {
      utterThis.voice = voices[i];
      break;
    }
  }
  synth.speak(utterThis);
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {

  setUtter(utterIndex);
  utterThis.onstart = function(event) {
    list[utterIndex].classList.add('bg-gray-300');
    list[utterIndex].scrollIntoView({ behavior: "smooth",block: 'center', inline:'center' });
  }

  utterThis.onerror = (event) => {
    console.log(
      `An error has occurred with the speech synthesis: ${event.error}`,
    );
  };

  utterThis.addEventListener('end', function(e) {
    console.log('speech synthesis onend');
    window.setTimeout(() => {
      list[utterIndex].classList.remove('bg-gray-300');
      utterIndex += 1;
        if(utterIndex < totalUtter) {
          speak();
        }
    }, 500);
  });

}


btn_speak.addEventListener("click", function (event) {
  play();
});

btn_pause.addEventListener("click", function (event) {
  pause();
});

btn_stop.addEventListener("click", (event)=>{
  stop();
})

voiceSelect.onchange = function () {
  selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");
  play();
  this.blur();
};

voiceSelect.onclick = function () {
  pause();
};

