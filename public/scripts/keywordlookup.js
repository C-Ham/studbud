const collapseButton = document.getElementById("collapse-btn");
const keywordLookup = document.getElementById("keyword-lookup");
const searchField = document.getElementById("search-field");
const synonymList = document.getElementById("synonym-list");

searchField.addEventListener("keypress", function(event) {
    if(event.key == "Enter") {
        event.preventDefault();
        console.log(searchField.value);
        const existingDefs = document.querySelectorAll('.keyword-result');
        existingDefs.forEach(def => def.remove());

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchField.value}`)
        .then(response => response.json())
        .then(data => 
            data[0].meanings.forEach(
                function(meaning) {
                    if(meaning.synonyms.join(", ")) { 
                        let defSynonyms = document.createElement("div");
                        defSynonyms.classList.add('keyword-result');
                        synonymList.appendChild(defSynonyms); 
                        let defTitle = "<p class='keyword-result--title'><i>" + meaning.synonyms.join(", ") + "</i></p>";
                        defSynonyms.innerHTML = defTitle;
                    }
                    
                    meaning.definitions.forEach(
                        function(def) {  
                            let defWrapper = document.createElement("div");
                            defWrapper.classList.add('keyword-result');
                            let defTitle = "<h4 class='keyword-result--title'><i>" + meaning.partOfSpeech + "</i></h4>";
                            let defDesc = "<p class='keyword-result--desc'>" + def.definition + "</p>";
                            defWrapper.innerHTML = defTitle + defDesc;
                            keywordLookup.appendChild(defWrapper);
                        })
                    }
                ));
    }
})


    
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

