let db = firebase.firestore()

window.addEventListener('DOMContentLoaded', async function(event) {
  let url ='https://api.themoviedb.org/3/movie/now_playing?api_key=d8731d19dcfc30a3559312f3ea845aed&language=en-US'
  let response = await fetch(url)
  let json = await response.json()
  let movies = [json.results]
  console.log(movies)

  for (let i=0; i<movies.length; i++) {
    for (let j=0; j < movies[i].length; j++){
      let movieID = movies[i][j].id 
      let posterURL = movies[i][j].poster_path
      
      document.querySelector('.movies').insertAdjacentHTML('beforeend', 
        `<div class="movies-${movieID} w-1/5 p-4">
        <img src="https://image.tmdb.org/t/p/w500/${posterURL}" class="w-full">
        <a href="#" class="watched-button block text-center text-white bg-green-500 mt-4 px-4 py-2 rounded">I've watched this!</a>
        </div>`)
      
        let temp=await db.collection('watched').doc(`${movieID}`).get()
        console.log(temp)
        console.log(temp.data())
        if(temp.data()) {
        document.querySelector(`.movies-${movieID}`).classList.add('opacity-20')
      }  

      document.querySelector(`.movies-${movieID} .watched-button`).addEventListener('click', async function(event){
        event.preventDefault()

      if(document.querySelector(`.movies-${movieID}`).classList.contains('opacity-20')) {
        event.preventDefault()
        document.querySelector(`.movies-${movieID}`).classList.remove('opacity-20')
        await db.collection('watched').doc(`${movieID}`).delete({})
        console.log(`Movie ${movieID} was un-watched.`)

      } else {
        document.querySelector(`.movies-${movieID}`).classList.add('opacity-20')
        await db.collection('watched').doc(`${movieID}`).set({})
        console.log(`Movie ${movieID} was watched.`)}})
    }}
})