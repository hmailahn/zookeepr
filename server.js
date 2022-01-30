const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { animals } = require('./data/animals');

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if(query.personalityTraits) {
        //save personalitytraits as a dedicated array
        //if personalitytraits is a string, place it into a new array and save. 
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        ///loop through each trait in the personalitytraits array:
        personalityTraitsArray.forEach(trait => {
            ///check the trait against each animal in the filterresults array.
            //remember, it is initially a copy of the animalsArray
            // but here we are updating it for each trait in the .forEach() loop.
            // for each trait being targeted by the filter, the filterResults
            //array will then contain only the entries that contain the trait, 
            //so that the end we';llhave an array of animals that have every one 
            // of the traits when the .forEach() loop is finished. 
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});