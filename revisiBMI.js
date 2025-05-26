let selectedGender = null;

document.getElementById("maleBtn").addEventListener("click", () => {
  selectedGender = "male";
  toggleGenderButton("male");
});

document.getElementById("femaleBtn").addEventListener("click", () => {
  selectedGender = "female";
  toggleGenderButton("female");
});

function toggleGenderButton(gender) {
  document.getElementById("maleBtn").classList.remove("active");
  document.getElementById("femaleBtn").classList.remove("active");
  document.getElementById(`${gender}Btn`).classList.add("active");
}

// Perkiraan rentang BMI berdasarkan kurva pertumbuhan WHO/CDC (sederhana)
const bmiThresholdsByAge = {
  male: {
    15: { under: 17.5, normal: 24.3, overweight: 28.1 },
    16: { under: 18.0, normal: 24.8, overweight: 28.5 },
    17: { under: 18.5, normal: 25.2, overweight: 29.0 },
    18: { under: 18.5, normal: 25.5, overweight: 29.5 },
    19: { under: 18.5, normal: 25.5, overweight: 29.9 }
  },
  female: {
    15: { under: 17.0, normal: 24.0, overweight: 27.6 },
    16: { under: 17.5, normal: 24.5, overweight: 28.0 },
    17: { under: 18.0, normal: 25.0, overweight: 28.5 },
    18: { under: 18.0, normal: 25.2, overweight: 29.0 },
    19: { under: 18.0, normal: 25.4, overweight: 29.3 }
  }
};

function calculateBMI() {
  const heightCm = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const age = parseInt(document.getElementById("age").value);

  if (!selectedGender || isNaN(heightCm) || isNaN(weight) || isNaN(age)) {
    alert("Please fill in all fields and select gender.");
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM ** 2);
  const bmiPrime = bmi / 25;
  const ponderalIndex = weight / (heightM ** 3);
  const minWeight = (18.5 * heightM ** 2).toFixed(1);
  const maxWeight = (25 * heightM ** 2).toFixed(1);

  let category = "";
  let highlightId = "";

  if (age >= 20) {
    // Dewasa (standar WHO)
    if (bmi < 18.5) {
      category = "Underweight";
      highlightId = "cat-under";
    } else if (bmi < 25) {
      category = "Normal weight";
      highlightId = "cat-normal";
    } else if (bmi < 30) {
      category = "Overweight";
      highlightId = "cat-over";
    } else {
      category = "Obesity";
      highlightId = "cat-obese";
    }
  } else {
    // Remaja dan anak-anak (per usia dan gender)
    const thresholds = bmiThresholdsByAge[selectedGender]?.[age];
    if (!thresholds) {
      alert("BMI category for this age is not available.");
      return;
    }

    if (bmi < thresholds.under) {
      category = "Underweight";
      highlightId = "cat-under";
    } else if (bmi < thresholds.normal) {
      category = "Normal weight";
      highlightId = "cat-normal";
    } else if (bmi < thresholds.overweight) {
      category = "Overweight";
      highlightId = "cat-over";
    } else {
      category = "Obesity";
      highlightId = "cat-obese";
    }
  }

  document.getElementById("bmi").value = bmi.toFixed(2) + " kg/m²";
  document.getElementById("healthy-weight").value = `${minWeight} kg - ${maxWeight} kg`;
  document.getElementById("bmi-prime").value = bmiPrime.toFixed(2);
  document.getElementById("ponderal").value = ponderalIndex.toFixed(2);
  document.querySelectorAll(".bmi-right input")[1].value = category;

  document.querySelectorAll(".bmi-bar").forEach(bar =>
    bar.classList.remove("highlight", "expanded")
  );
  if (highlightId) {
    document.getElementById(highlightId)?.classList.add("highlight", "expanded");
  }
}
