const wordInput = document.querySelector('#word-input')
const searchForm = document.querySelector('#searchForm')
const btn = document.querySelector('#btn')
const characterName = document.querySelector('#name');
const description = document.querySelector('#description');
const source = document.querySelector('#character-image');


btn.addEventListener('click', async e => {
    e.preventDefault();

    let results = [];
    let query = wordInput.value.trim().toLowerCase();

      if (wordInput.value === 'Chinazom') {
            characterName.textContent = 'Nlacahike Araoku'
            description.textContent = 'Omo, na idiot';
            source.src = 'https://i.ibb.co/XfDRm1nF/nlachaike.jpg'
            return;
        }

    let totalPages = 9;
    
    try  {
        const fetchPromises = [];
        for (let i = 1; i <= totalPages; i++) {
            fetchPromises.push(
                fetch(`https://dsa-production.up.railway.app/api/list?page=${i}`).then(res => res.json())
            );
        }

        const allData = await Promise.all(fetchPromises);

        allData.forEach(data => {
            const characters = data.content;
            if (Array.isArray(characters) && characters.length > 0) {
                const matches = characters.filter(c => c.name?.toLowerCase().includes(query));
                results = results.concat(matches);
            }
        })
            let fs = results[0];               
            characterName.textContent = fs.name;
            description.textContent = fs.description;
            source.src = fs.img;
            console.log(results)

    } catch (error) {
        console.error("an error occurred while fetching data:", error);
        characterName.textContent = "Sorry, couldn't find it : ("
        description.textContent = "";
        source.src = "";
    }

})

