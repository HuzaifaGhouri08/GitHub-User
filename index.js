// Grab elements from id's
const input = document.getElementById('search-input');
const btn = document.getElementById('search-button');
const output = document.getElementById('output');
const avatarImg = document.getElementById('img');
const nameElem = document.getElementById('name');
const userNameElem = document.getElementById('userName');
const joiningDateElem = document.getElementById('joiningDate');
const bioElem = document.getElementById('bio');
const repoElem = document.getElementById('repo');
const followersElem = document.getElementById('followers');
const followingElem = document.getElementById('following');
const locationElem = document.getElementById('location');
const twitterElem = document.getElementById('twitter');
const websiteElem = document.getElementById('website');
const companyElem = document.getElementById('company');
const spinner = document.getElementById('spinner');

// Add event listener to input
input.addEventListener('input', handleInput);

// Add event listener to button
btn.addEventListener('click', handleButtonClick);

// Function to handle input changes
function handleInput() {
  if (input.value.length > 0) {
    showButton();
  } else {
    hideButton();
  }
}

// Function to show button
function showButton() {
  btn.classList.add('visible');
}

// Function to hide button
function hideButton() {
  btn.classList.remove('visible');
}

// Function to handle button click
function handleButtonClick(e) {
  spinner.style.display = 'block';
  e.preventDefault();
  output.style.display = 'none'; // hide output initially
  const userData = input.value;
  fetchUserData(userData);
  setTimeout(() => {
    spinner.style.display = 'none';
    output.style.display = 'block'; // show output after 2 minutes
  }, 2000);
  input.value = '';
  hideButton();
}

// Function to fetch user data from API
function fetchUserData(userData) {
  const url = `https://api.github.com/users/${userData}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let avatarUrl = data.avatar_url;
      avatarImg.src = avatarUrl;
      nameElem.textContent = data.name;
      const profileUrl = data.html_url;
      userNameElem.innerHTML = `<a href="${profileUrl}" target="_blank">@${data.login}</a>`;
      joiningDateElem.textContent = new Date(data.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      bioElem.textContent = data.bio || 'This user has no bio.';
      document.getElementById('repo').innerHTML = `<a href="${data.html_url}?tab=repositories" target="_blank">${data.public_repos}</a>`;
      document.getElementById('followers').innerHTML = `<a href="${data.html_url}?tab=followers" target="_blank">${data.followers}</a>`;
      document.getElementById('following').innerHTML = `<a href="${data.html_url}?tab=following" target="_blank">${data.following}</a>`;
      document.getElementById('location').innerHTML = `<a href="https://www.google.com/maps/place/${data.location}" target="_blank">${data.location}</a>`;
      document.getElementById('twitter').innerHTML = `<a href="https://twitter.com/${data.twitter_username}" target="_blank">${data.twitter_username}</a>`;
      document.getElementById('blog').innerHTML = `<a href="${data.blog}" target="_blank">${data.blog}</a>`;
      document.getElementById('company').innerHTML = `<a href="https://github.com/${data.company}" target="_blank">${datacompany}</a>`;
    })
    .catch((error) => console.log(error));
}
