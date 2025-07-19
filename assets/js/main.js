const kontrak = {
  presensi: {
    range: document.getElementById("kontrakPresensiRange"),
    input: document.getElementById("kontrakPresensiInput"),
  },
  tugas: {
    range: document.getElementById("kontrakTugasRange"),
    input: document.getElementById("kontrakTugasInput"),
  },
  uts: {
    range: document.getElementById("kontrakUTSRange"),
    input: document.getElementById("kontrakUTSInput"),
  },
  uas: {
    range: document.getElementById("kontrakUASRange"),
    input: document.getElementById("kontrakUASInput"),
  },
};

const nilai = {
  presensi: {
    range: document.getElementById("nilaiPresensiRange"),
    input: document.getElementById("nilaiPresensiInput"),
  },
  tugas: {
    range: document.getElementById("nilaiTugasRange"),
    input: document.getElementById("nilaiTugasInput"),
  },
  uts: {
    range: document.getElementById("nilaiUTSRange"),
    input: document.getElementById("nilaiUTSInput"),
  },
  uas: {
    range: document.getElementById("nilaiUASRange"),
    input: document.getElementById("nilaiUASInput"),
  },
};

const resultGrade = document.querySelector(".nilai h1");
const resultScore = document.querySelector(".nilai h3");

function syncSlider(slider, input) {
  slider.addEventListener("input", () => {
    input.value = slider.value;
    updateSliderColor(slider);
    hitungNilai();
  });

  input.addEventListener("input", () => {
    let value = parseFloat(input.value);
    if (isNaN(value)) value = 0;
    value = Math.max(Math.min(value, 100), 0);
    slider.value = value;
    input.value = value;
    updateSliderColor(slider);
    hitungNilai();
  });

  updateSliderColor(slider);
}

function updateSliderColor(slider) {
  const value = slider.value;
  const percent = ((value - slider.min) / (slider.max - slider.min)) * 100;

  let color = "green";
  if (value >= 75) {
    color = "green";
  } else if (value >= 50) {
    color = "yellow";
  } else {
    color = "red";
  }

  slider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${percent}%, #ccc ${percent}%, #ccc 100%)`;
}

Object.values(kontrak).forEach((el) => syncSlider(el.range, el.input));
Object.values(nilai).forEach((el) => syncSlider(el.range, el.input));

function hitungNilai() {
  const bobot = {
    presensi: parseFloat(kontrak.presensi.input.value) || 0,
    tugas: parseFloat(kontrak.tugas.input.value) || 0,
    uts: parseFloat(kontrak.uts.input.value) || 0,
    uas: parseFloat(kontrak.uas.input.value) || 0,
  };

  const totalBobot = bobot.presensi + bobot.tugas + bobot.uts + bobot.uas;
  document.getElementById(
    "persentaseKontrakCount"
  ).innerHTML = `${totalBobot}%`;

  if (totalBobot > 100) {
    resultScore.innerHTML = "<p>Total bobot kontrak perkuliahan max 100%</p>";
    resultGrade.innerHTML = "<p>-</p>";
    resultScore.style.color = "red";
    return;
  } else {
    resultScore.style.color = "";
  }

  const skor = {
    presensi: parseFloat(nilai.presensi.input.value) || 0,
    tugas: parseFloat(nilai.tugas.input.value) || 0,
    uts: parseFloat(nilai.uts.input.value) || 0,
    uas: parseFloat(nilai.uas.input.value) || 0,
  };

  document.getElementById("countNilaiMatkul").innerHTML = `${
    skor.presensi + skor.tugas + skor.uts + skor.uas
  }`;

  const total =
    (skor.presensi * bobot.presensi) / 100 +
    (skor.tugas * bobot.tugas) / 100 +
    (skor.uts * bobot.uts) / 100 +
    (skor.uas * bobot.uas) / 100;

  resultScore.textContent = total.toFixed(1);
  resultGrade.textContent = getPredikat(total);
}

function getPredikat(nilai) {
  if (nilai >= 85) return "A";
  if (nilai >= 80) return "A-";
  if (nilai >= 75) return "B+";
  if (nilai >= 70) return "B";
  if (nilai >= 65) return "B-";
  if (nilai >= 60) return "C+";
  if (nilai >= 55) return "C";
  if (nilai >= 50) return "C-";
  if (nilai >= 45) return "D";
  return "E";
}

hitungNilai();
