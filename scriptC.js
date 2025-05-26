// GLOBAL
let selectedGender = 'male';
const genderButtons = document.querySelectorAll('.gender-btn');
const form = document.getElementById('calorieForm');
const bmrEl = document.getElementById('bmr-result');
const tdeeEl = document.getElementById('tdee-result');
const recEl = document.getElementById('recommended-result');

// Gender toggle
genderButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    genderButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    selectedGender = btn.dataset.gender;
  });
});

// Form submit
form.addEventListener('submit', e => {
  e.preventDefault();
  const age = +document.getElementById('age').value;
  const height = +document.getElementById('height').value;
  const weight = +document.getElementById('weight').value;
  const activity = +document.getElementById('activity').value;
  const goal = document.getElementById('goals').value;

  // BMR
  let bmr = (10*weight) + (6.25*height) - (5*age) + (selectedGender==='male'?5:-161);
  const tdee = bmr * activity;
  let rec = goal==='lose' ? tdee-500 : goal==='gain' ? tdee+500 : tdee;

  // Round & display
  [bmrEl, tdeeEl, recEl].forEach(el => {
    el.value = Math.round(el===bmrEl?bmr:(el===tdeeEl?tdee:rec)) + ' cal/day';
    el.style.opacity = '0.5';
    el.style.transform = 'translateY(5px)';
    el.style.transition = 'all 0.3s';
  });
  setTimeout(()=>{
    [bmrEl, tdeeEl, recEl].forEach((el,i)=> {
      setTimeout(()=>{
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i*100);
    });
  },50);
});
