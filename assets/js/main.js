const values = {
  nilaiPresensiInput: 50,
  nilaiTugasInput: 50,
  nilaiUTSInput: 50,
  nilaiUASInput: 50,

  kontrakPresensiInput: 25,
  kontrakTugasInput: 25,
  kontrakUTSInput: 25,
  kontrakUASInput: 25,
};

const resultValueNumber = document.getElementById("resultValueNumber");
const resultGradeNA = document.getElementById("resultGradeNA");
const persentaseKontrakCount = document.getElementById(
  "persentaseKontrakCount"
);
const countNilaiMatkul = document.getElementById("countNilaiMatkul");

updateContractTotal();
updateNilaiMatkulTotal();
calculateGrade();

function setupSlidersAndInputs(sectionId, updateTotalsFunction) {
  document
    .querySelectorAll(`#${sectionId} .range-colored`)
    .forEach((slider) => {
      const targetId = slider.getAttribute("data-value");
      const numberInput = document.getElementById(targetId);

      slider.addEventListener("input", (e) => {
        numberInput.value = e.target.value;
        values[targetId] = Number(e.target.value);
        updateSliderColor(slider);
        calculateGrade();
        updateTotalsFunction();
      });

      numberInput.addEventListener("input", (e) => {
        let val = Number(e.target.value);
        if (val > 100) val = 100;
        if (val < 0) val = 0;
        slider.value = val;
        values[targetId] = val;
        updateSliderColor(slider);
        calculateGrade();
        updateTotalsFunction();
      });
      updateSliderColor(slider);
    });
}

setupSlidersAndInputs("kontrakPerkuliahan", updateContractTotal);
setupSlidersAndInputs("nilaiMatakul", updateNilaiMatkulTotal);

function updateSliderColor(slider) {
  const value = parseFloat(slider.value);
  const min = parseFloat(slider.min);
  const max = parseFloat(slider.max);
  const percent = ((value - min) / (max - min)) * 100;

  let color;
  if (value >= 75) {
    color = "#4CAF50";
  } else if (value >= 50) {
    color = "#FFEB3B";
  } else if (value >= 25) {
    color = "#ff7b24ff";
  } else {
    color = "#ff0000";
  }

  slider.style.background = `linear-gradient(to right, ${color} 0%, ${color} ${percent}%, #ccc ${percent}%, #ccc 100%)`;
}

function calculateGrade() {
  const totalContractWeight =
    Number(values.kontrakPresensiInput) +
    Number(values.kontrakTugasInput) +
    Number(values.kontrakUTSInput) +
    Number(values.kontrakUASInput);

  if (totalContractWeight === 0) {
    resultValueNumber.innerText = "0.0";
    resultGradeNA.innerText = "E";
    return;
  }

  if (totalContractWeight > 100) {
    resultGradeNA.innerText = "-";
    resultValueNumber.innerHTML =
      "<p>Total bobot kontrak perkuliahan max 100%</p>";
    resultValueNumber.style.color = "red";
    resultValueNumber.style.fontSize = "0.9rem";
    return;
  }

  const finalScore =
    (Number(values.nilaiPresensiInput) * Number(values.kontrakPresensiInput)) /
      100 +
    (Number(values.nilaiTugasInput) * Number(values.kontrakTugasInput)) / 100 +
    (Number(values.nilaiUTSInput) * Number(values.kontrakUTSInput)) / 100 +
    (Number(values.nilaiUASInput) * Number(values.kontrakUASInput)) / 100;

  resultValueNumber.innerText = roundValueDecimal(finalScore);
  resultGradeNA.innerText = determineGrade(finalScore);
}

function determineGrade(finalScore) {
  if (finalScore >= 85) return "A";
  if (finalScore >= 80) return "A-";
  if (finalScore >= 75) return "B+";
  if (finalScore >= 70) return "B";
  if (finalScore >= 65) return "B-";
  if (finalScore >= 60) return "C+";
  if (finalScore >= 55) return "C";
  if (finalScore >= 50) return "C-";
  if (finalScore >= 45) return "D";
  return "E";
}

function roundValueDecimal(number) {
  return Math.round(number * 100) / 100;
}

function updateContractTotal() {
  const total =
    Number(values.kontrakPresensiInput) +
    Number(values.kontrakTugasInput) +
    Number(values.kontrakUTSInput) +
    Number(values.kontrakUASInput);
  persentaseKontrakCount.innerText = `${total}%`;

  if (total > 100) {
    persentaseKontrakCount.style.color = "red";
    resultGradeNA.innerText = "-";
    resultValueNumber.innerHTML =
      "<p>Total bobot kontrak perkuliahan max 100%</p>";
    resultValueNumber.style.color = "red";
    resultValueNumber.style.fontSize = "0.95rem";
  } else {
    persentaseKontrakCount.style.color = "";
    resultValueNumber.style.color = "";
    resultValueNumber.style.fontSize = "18.72px";
    calculateGrade();
  }
}

function updateNilaiMatkulTotal() {
  const total =
    Number(values.nilaiPresensiInput) +
    Number(values.nilaiTugasInput) +
    Number(values.nilaiUTSInput) +
    Number(values.nilaiUASInput);
  countNilaiMatkul.innerText = `${total}`;
}
