// Calorie Calculator
// Global variables
let selectedGender = 'male';

// DOM elements
const genderButtons = document.querySelectorAll('.gender-btn');
const calorieForm = document.getElementById('calorieForm');
const bmrResult = document.getElementById('bmr-result');
const tdeeResult = document.getElementById('tdee-result');
const recommendedResult = document.getElementById('recommended-result');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    // Gender button selection
    genderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            genderButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update selected gender
            selectedGender = this.getAttribute('data-gender');
        });
    });

    // Form submission
    calorieForm.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateCalories();
    });
}

function calculateCalories() {
    // Get form values
    const ageInput = document.getElementById('age').value;
    const heightInput = document.getElementById('height').value;
    const weightInput = document.getElementById('weight').value;
    const activityInput = document.getElementById('activity').value;
    const goalsInput = document.getElementById('goals').value;

    // Convert to numbers
    const age = Number(ageInput);
    const height = Number(heightInput);
    const weight = Number(weightInput);
    const activityLevel = Number(activityInput);
    const goals = goalsInput;

    console.log('Form values:', { age, height, weight, activityLevel, goals, selectedGender });

    // Validate inputs
    if (!validateInputs(age, height, weight, activityLevel, goals)) {
        return;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (selectedGender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activityLevel;

    // Calculate recommended calorie intake based on goals
    let recommendedCalories;
    if (goals === 'lose') {
        recommendedCalories = tdee - 500;
    } else if (goals === 'gain') {
        recommendedCalories = tdee + 500;
    } else if (goals === 'maintain') {
        recommendedCalories = tdee;
    } else {
        recommendedCalories = tdee;
    }

    console.log('Calculated values:', { bmr, tdee, recommendedCalories });

    // Display results
    displayResults(Math.round(bmr), Math.round(tdee), Math.round(recommendedCalories));
}

function validateInputs(age, height, weight, activityLevel, goals) {
    if (isNaN(age) || age < 1 || age > 120) {
        alert('Please enter a valid age between 1 and 120');
        return false;
    }

    if (isNaN(height) || height < 1 || height > 300) {
        alert('Please enter a valid height between 1 and 300 cm');
        return false;
    }

    if (isNaN(weight) || weight < 1 || weight > 500) {
        alert('Please enter a valid weight between 1 and 500 kg');
        return false;
    }

    if (isNaN(activityLevel) || activityLevel === 0) {
        alert('Please select an activity level');
        return false;
    }

    if (!goals || goals === '') {
        alert('Please select a goal');
        return false;
    }

    return true;
}

function displayResults(bmr, tdee, recommended) {
    console.log('Displaying results:', { bmr, tdee, recommended });
    
    // Update results immediately first
    bmrResult.textContent = bmr + ' cal/day';
    tdeeResult.textContent = tdee + ' cal/day';
    recommendedResult.textContent = recommended + ' cal/day';

    // Add animation effect
    const resultElements = [bmrResult, tdeeResult, recommendedResult];
    
    resultElements.forEach(element => {
        element.style.opacity = '0.5';
        element.style.transform = 'translateY(5px)';
        element.style.transition = 'all 0.3s ease';
    });

    setTimeout(() => {
        resultElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 50);
}

// Additional features
function resetForm() {
    calorieForm.reset();
    selectedGender = 'male';
    
    // Reset gender buttons
    genderButtons.forEach(btn => btn.classList.remove('active'));
    genderButtons[0].classList.add('active');
    
    // Reset results
    bmrResult.textContent = '-';
    tdeeResult.textContent = '-';
    recommendedResult.textContent = '-';
}

// Export functions for potential external use
window.CalorieCalculator = {
    calculate: calculateCalories,
    reset: resetForm
};