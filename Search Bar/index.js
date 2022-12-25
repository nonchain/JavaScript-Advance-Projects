const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const autoBox = searchWrapper.querySelector(".auto-box");

// if user press any key and release
inputBox.onkeyup = (e) => {
   const value = e?.target?.value;
   if(value) {
      let searchResult = words.filter(data => data.toLowerCase().startsWith(value.toLowerCase()));   // words from suggestion.js file
      searchResult = searchResult.map(data => `<li>${data}</li>`)
      searchWrapper.classList.add('active')
      showSuggestions(searchResult);
      const allItems = autoBox.querySelectorAll("li");
      setOnClick(allItems)
   }
   else {
      searchWrapper.classList.remove('active')
   }

}

function showSuggestions(list) {
   let listData;
   !list.length ? listData= inputBox.value : listData = list.join('');
   autoBox.innerHTML = listData;
}

function setOnClick(items) {
   for (const item of items) {
      item.setAttribute("onclick", "select(this)")
   }
}

function select(item) {
   alert(`${item.innerText} selected`)
}