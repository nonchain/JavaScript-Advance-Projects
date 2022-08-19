const container = document.querySelector('.container');
const btnChooseImage = document.querySelector('.choose__image'),
   previewImage = document.querySelector('.preview__image > img'),
   inputChooseImage = document.querySelector('.upload'),
   buttonReset = document.querySelector('.reset__filter');

const buttonFilters = document.querySelectorAll('.btn__primary'),
   filterName = document.querySelector('.filter__info > .name'),
   filterValue = document.querySelector('.filter__info > .value'),
   filterRange = document.querySelector('.slider > input[type="range"]');

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

// FUNCTIONS
const applyFilter = () => {
   previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const resetFilters = () => {
   brightness = 100;
   saturation = 100;
   inversion = 0;
   grayscale = 0;

   document.querySelector('.filter .btn-active').classList.remove('btn-active');
   buttonFilters[0].classList.add('btn-active');
   filterName.innerHTML = 'Brightness';

   filterRange.max = '200';
   filterValue.innerHTML = `${brightness}%`;
   filterRange.value = brightness;

   applyFilter();
}

const loadImage = () => {
   let file = inputChooseImage.files[0];

   if (!file) return   // User hasn't selected file
   previewImage.src = URL.createObjectURL(file);
   previewImage.style.backgroundColor = '#fafafa'
   container.classList.remove('disable');
}

const updateFilter = () => {
   filterValue.innerHTML = `${filterRange.value}%`;
   const selectedButton = document.querySelector('.filter .btn-active');

   switch (selectedButton.id) {
      case 'brightness':
         brightness = filterRange.value;
         break;
      case 'saturation':
         saturation = filterRange.value;
         break;
      case 'inversion':
         inversion = filterRange.value;
         break;
      case 'grayscale':
         grayscale = filterRange.value;
         break;
   }
   applyFilter();
}

// CLICK LISTENERS
inputChooseImage.addEventListener('change', loadImage)
btnChooseImage.addEventListener('click', () => inputChooseImage.click())
filterRange.addEventListener('input', updateFilter);
buttonReset.addEventListener('click', resetFilters)
buttonFilters.forEach(btn => {
   btn.addEventListener('click', () => {
      document.querySelector('.filter .btn-active').classList.remove('btn-active');
      btn.classList.add('btn-active');
      filterName.innerHTML = btn.innerHTML;

      switch (btn.id) {
         case 'brightness':
            filterRange.max = '200';
            filterValue.innerHTML = `${brightness}%`;
            filterRange.value = brightness;
            break;
         case 'saturation':
            filterRange.max = '200';
            filterValue.innerHTML = `${saturation}%`;
            filterRange.value = saturation;
            break;
         case 'inversion':
            filterRange.max = '100';
            filterValue.innerHTML = `${inversion}%`;
            filterRange.value = inversion;
            break;
         case 'grayscale':
            filterRange.max = '100';
            filterValue.innerHTML = `${grayscale}%`;
            filterRange.value = grayscale;
            break;
      }
   })
});