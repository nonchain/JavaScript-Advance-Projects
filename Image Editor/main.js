const container = document.querySelector('.container');
const btnChooseImage = document.querySelector('.choose__image'),
   btnSaveImage = document.querySelector('.save__image'),
   previewImage = document.querySelector('.preview__image > img'),
   inputChooseImage = document.querySelector('.upload'),
   buttonReset = document.querySelector('.reset__filter');

const buttonFilters = document.querySelectorAll('.btn__filter'),
   filterName = document.querySelector('.filter__info > .name'),
   filterValue = document.querySelector('.filter__info > .value'),
   filterRange = document.querySelector('.slider > input[type="range"]');

const rotateOptions = document.querySelectorAll('.btn__rotate');

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotateAngel = 0;

// FUNCTIONS
const applyFilter = () => {
   previewImage.style.transform = `rotate(${rotateAngel}deg)`;
   previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const resetFilters = () => {
   brightness = 100;
   saturation = 100;
   inversion = 0;
   grayscale = 0;
   rotateAngel = 0;

   buttonFilters[0].click();

   applyFilter();
}

const loadImage = () => {
   let file = inputChooseImage.files[0];

   if (!file) return   // User hasn't selected file
   previewImage.src = URL.createObjectURL(file);
   previewImage.style.backgroundColor = '#fafafa'
   container.classList.remove('disable');
}

const saveImage = () => {
   const canvas = document.createElement('canvas');
   const cxt = canvas.getContext('2d');
   canvas.width = previewImage.naturalWidth;
   canvas.height = previewImage.naturalHeight;

   cxt.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
   cxt.translate(canvas.width / 2, canvas.height / 2)
   if(rotateAngel !== 0) {
      cxt.rotate(rotateAngel * Math.PI/180);
   } 
   // image, dx, dy, dWidth, dHeight
   cxt.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
   
   const link = document.createElement('a');
   link.download = 'image.jpg';
   link.href = canvas.toDataURL();
   link.click();
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
btnSaveImage.addEventListener('click', saveImage)
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
rotateOptions.forEach(option => {
   option.addEventListener('click', () => {
      if (option.id === 'rotate-right') {
         rotateAngel += 90;
      }
      if (option.id === 'rotate-left') {
         rotateAngel -= 90;
      }

      applyFilter();
   })
});