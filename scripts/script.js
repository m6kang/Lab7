// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

let id = 0;
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        id++;
        newPost.id = id;
        newPost.addEventListener('click', () => {
          history.pushState({name: 'entry', id: newPost.id}, '', '#entry' + newPost.id);
          setState({name: 'entry', id: newPost.id});
        })
        document.querySelector('main').appendChild(newPost);
      });
    });
});

let settings = document.querySelector('header img');
settings.addEventListener('click', () => {
  history.pushState({name: 'settings', id: 0}, '', '#settings');
  setState({name: 'settings', id: 0});
});

let home = document.querySelector('header h1');
home.addEventListener('click', () => {
  history.pushState({name: 'home', id: 0}, '', ' ');
  setState({name: 'home', id: 0});
});

window.onpopstate = function(event) {
  setState(event.state);
};