//DESCRIPTION: Handles all implementation for the dictionary lookup API


const collapseButton = document.getElementById("collapse-btn");
const keywordLookup = document.getElementById("keyword-lookup");
const searchField = document.getElementById("search-field");
const synonymList = document.getElementById("synonym-list");

//Search dictionary API on Enter key
searchField.addEventListener("keypress", function(event) {
    if(event.key == "Enter") {
        event.preventDefault();
        //Clear existing definitions for any previous searches
        const existingDefs = document.querySelectorAll('.keyword-result');
        existingDefs.forEach(def => def.remove());

        //Use fetch API
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
