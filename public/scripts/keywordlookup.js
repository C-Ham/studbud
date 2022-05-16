const collapseButton = document.getElementById("collapse-btn");
const keywordLookup = document.getElementById("keyword-lookup");
const searchField = document.getElementById("search-field");

fetch('https://api.dictionaryapi.dev/api/v2/entries/en/smile')
  .then(response => response.json())
  .then(data => 
    data[0].meanings.forEach(
        function(meaning) {
            //console.log(meaning); 
            meaning.definitions.forEach(
                function(def) { 
                    console.log(def.definition); 
                    let defWrapper = document.createElement("div");
                    defWrapper.classList.add('keyword-result');
                    let defTitle = "<h4 class='keyword-result--title'>String()</h4>";
                    let defDesc = "<p class='keyword-result--desc'>" + def.definition + "</p>";
                    defWrapper.innerHTML = defTitle + defDesc;
                })
            }
        ));
    
function collapseToggle() {
    if (collapseButton.parentElement.classList.contains("collapsed")) {
        collapseButton.parentElement.classList.remove("collapsed");
        collapseButton.innerHTML = "&#8250;";
    }
    else {
        collapseButton.parentElement.classList.add("collapsed");
        collapseButton.innerHTML = "&#8249;";
    }
}

