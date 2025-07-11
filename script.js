const imageContainer = document.getElementById('image-container');
const mainText = document.getElementById('main-text');
const countdown = document.getElementById('countdown');
const notifyBtn = document.getElementById("notify-btn");

const IMAGE_SRC = "immagine.jpeg";
const SCRITTA = "CI RISENTIAMO PROSSIMAMENTE";
const MESSAGES = {
  "07-10": "Non è ancora il TUO momento!<br>Segnati il 22 luglio: sarà memorabile (per le tue anche)",
  "07-11": "Non è ancora il TUO momento!<br>Segnati il 22 luglio: sarà memorabile (per le tue anche)",
  "07-12": "Non è ancora il TUO momento!<br>Segnati il 22 luglio: sarà memorabile (per le tue anche)",
  "07-19": "PREPARA LA BORSA DA SPIAGGIA: ciabatte, costume e crema solare.",
  "07-20": "SCUSACI, ci siamo dimenticanti l’ombrellone P.s. Ah prepara anche il pranzo!",
  "07-21": "FATTI TROVARE PRONTA ALLE 10.30 (dai, portati pure un cambio carino)",
};

function showContent() {
  const now = new Date();
  const date = now.toISOString().slice(5, 10);
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = hours * 60 + minutes;
  const showImage = (
    (date >= "07-12" && date <= "07-18") ||
    (date === "07-22" && (
      time < 420 || // < 07:00
      (time >= 1000 && time < 1175) || // 16:40 - 19:35
      (time >= 1235 && time < 1350) || // 20:35 - 22:30
      (time >= 1370 && time < 1410)    // 22:50 - 23:30
    ))
  );

  if (showImage) {
    imageContainer.innerHTML = `<img src="${IMAGE_SRC}" alt="img" />
      <div style="position:absolute;top:15px;width:100%;text-align:center;color:white;font-size:1.1em;">${SCRITTA}</div>`;
    mainText.innerHTML = "";
  } else if (date === "07-22") {
    if (time >= 420 && time < 915) mainText.innerHTML = "SVEGLIAAAAA";
    else if (time >= 915 && time < 1000) mainText.innerHTML = "Ora che hai capito che il costume non servirà, PREPARA IL FEGATO, quello potrebbe essere utile";
    else if (time >= 1175 && time < 1235) mainText.innerHTML = "bevuto, hai bevuto (forse) ORA CENETTA";
    else if (time >= 1350 && time < 1370) mainText.innerHTML = "e ora chi lo paga il conto?";
    else if (time >= 1410) mainText.innerHTML = "Bene, ora che sei stata viziata, la riabilitazione ti aspetta, buona passeggiata fino a casa";
    else mainText.innerHTML = "";
    imageContainer.innerHTML = "";
  } else {
    imageContainer.innerHTML = "";
    mainText.innerHTML = MESSAGES[date] || "";
  }

  const eventDate = new Date("2025-07-22T10:30:00");
  const diff = eventDate - now;
  if (diff > 0) {
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    countdown.innerHTML = `Ci vediamo tra: ${d}g ${h}h ${m}m ${s}s`;
  } else {
    countdown.innerHTML = "";
  }
}
setInterval(showContent, 1000);

window.OneSignal = window.OneSignal || [];
OneSignal.push(function () {
  OneSignal.init({
    appId: "2aa43d68-c001-4e88-9a17-0db15e4c5236",
    notifyButton: { enable: false }
  });

  notifyBtn.addEventListener("click", () => {
    OneSignal.showSlidedownPrompt();
  });

  let lastMessage = "";
  setInterval(() => {
    const current = mainText.innerHTML + imageContainer.innerHTML;
    if (current !== lastMessage) {
      OneSignal.sendSelfNotification(
        "C’È POSTA PER TE!!!",
        "",
        null,
        null
      );
      lastMessage = current;
    }
  }, 10000);
});