const wrapper = document.querySelector('.wrapper');
const options = document.querySelector('.options');
const btnSelect = document.querySelector('.select__btn');

btnSelect.addEventListener('click', () => {
  wrapper.classList.toggle('active');
})

addCountry();

function addCountry() {
  fetch('./countries.json')
  .then(response => response.json())
  .then(countries => {
    countries.forEach(country => {
      let li = `<li>${country.name}</li>`
      options.insertAdjacentHTML("beforeend", li);
    });
  })
}
