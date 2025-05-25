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
    if (bmi < 18.5) {
      category = "Underweight";
      highlightId = "cat-under";
    } else if (bmi < 25) {
      category = "Normal weight";
      highlightId = "cat-normal";
    } else if (bmi < 30) {
      category = "Overweight";
      highlightId = "cat-over";
    } else if (bmi < 40) {
      category = "Obesity";
      highlightId = "cat-obese";
    } else {
      category = "Extreme Obesity";
      highlightId = "cat-extreme";
    }
  } else {
    const thresholds = {
      male: { P5: 14.5, P85: 19.5, P95: 22.0 },
      female: { P5: 14.2, P85: 19.0, P95: 21.5 }
    };

    const { P5, P85, P95 } = thresholds[selectedGender];

    if (bmi < P5) {
      category = "Underweight";
      highlightId = "cat-under";
    } else if (bmi < P85) {
      category = "Healthy weight";
      highlightId = "cat-normal";
    } else if (bmi < P95) {
      category = "Overweight";
      highlightId = "cat-over";
    } else {
      category = "Obese";
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
