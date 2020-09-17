/* This extracts the query string */
const queryString = window.location.search;
console.log(queryString);

// Categories
fetch('https://opentdb.com/api_category.php')
    .then(res => {
        return res.json();
    })
    .then(data => {
        let categories = data.trivia_categories;
        console.log(categories);

        let select = document.getElementById('topic_input');

        for(let i = 0; i < categories.length; i++) {
            let category = document.createElement('option');
            category.text = categories[i].name;
            category.value = categories[i].name;
            select.appendChild(category);
        }
    })





/* this uses them to make an API call 
fetch('https://opentdb.com/api.php'+queryString,)
    .then(res => {
        return res.json();
    })
    .then(data => console.log(data)) */