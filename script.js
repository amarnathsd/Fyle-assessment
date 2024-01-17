let page = 1;

function fetchUserAndRepositories(username) {
  const perPage = 6;
  const userApiUrl = `https://api.github.com/users/${username}`;
  const reposApiUrl = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`;

  // Fetch user data
  fetch(userApiUrl)
    .then(response => response.json())
    .then(userData => {
      const avatarImage = document.getElementById('avatarImage');
      const userName = document.getElementById('userName');
      const userLocation = document.getElementById('userLocation');

      avatarImage.src = userData.avatar_url;
      userName.innerText = userData.login;
      userLocation.innerText = userData.location || 'Location not available';

      
      fetch(reposApiUrl)
        .then(response => response.json())
        .then(repositories => {
          
          repositoriesData = repositories.map(repo => ({
            name: repo.name,
            description: repo.description,
            languages: repo.language,
          }));

          
          const repositoriesContainer = document.getElementById('repositories');
          repositoriesContainer.innerHTML = '';

          for (const repository of repositoriesData) {
    
            const repositoryElement = document.createElement('div');
            repositoryElement.classList.add('repository');

            const nameElement = document.createElement('h2');
            nameElement.innerText = repository.name;
            repositoryElement.appendChild(nameElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.innerText = repository.description;
            repositoryElement.appendChild(descriptionElement);

            const languagesElement = document.createElement('p');
            languagesElement.innerText = 'Languages: ' + repository.languages;
            repositoryElement.appendChild(languagesElement);

            repositoriesContainer.appendChild(repositoryElement);
          }
        })
        .catch(error => {
          console.error('Error fetching repositories:', error);
        });

    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });

  
  const currentPageElement = document.getElementById('currentPage');
  currentPageElement.innerText = page.toString();
}

const fetchButton = document.getElementById('fetchButton');
const olderButton = document.getElementById('olderButton');
const newerButton = document.getElementById('newerButton');

fetchButton.addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  if (username) {
    fetchUserAndRepositories(username);
  } else {
    alert('Please enter a GitHub username.');
  }
});

olderButton.addEventListener('click', () => {
  if (page > 1) {
    page--;
    fetchUserAndRepositories(document.getElementById('username').value.trim());
  }
});

newerButton.addEventListener('click', () => {
  page++;
  fetchUserAndRepositories(document.getElementById('username').value.trim());
});

// (default username: johnpapa)
fetchUserAndRepositories('johnpapa');
