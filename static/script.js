

document.addEventListener('DOMContentLoaded', function () {
    
    fetchJobsData();
});

async function fetchJobsData() {
    try {
        const response = await fetch('/static/jobs-data.json');
        const data = await response.json();

        console.log('Loaded job data:', data);

        
        displayFeaturedJobs(data.featuredJobs);
    } catch (error) {
        console.error('Error fetching job data:', error);
    }
}

function displayFeaturedJobs(jobs) {
    const featuredJobsSection = document.getElementById('featured-jobs');

    
    featuredJobsSection.innerHTML = '';

    
    jobs.forEach(job => {
        const jobCard = createJobCard(job);

        
        featuredJobsSection.appendChild(jobCard);
    });
}

function searchJobs() {
    const searchTitle = document.getElementById('job-title').value.toLowerCase();
    const searchLocation = document.getElementById('location').value.toLowerCase();
    const searchKeywords = document.getElementById('keywords').value.toLowerCase();

    const allJobCards = document.querySelectorAll('.job-card');

    allJobCards.forEach(jobCard => {
        const titleElement = jobCard.querySelector('h3');
        const locationElement = jobCard.querySelector('p');
        const keywordsElement = jobCard.querySelector('.keywords');

        
        const title = titleElement ? titleElement.textContent.toLowerCase() : '';
        const location = locationElement ? locationElement.textContent.toLowerCase() : '';
        const keywords = keywordsElement ? keywordsElement.textContent.toLowerCase() : '';

        
        const isTitleMatch = title.includes(searchTitle);
        const isLocationMatch = location.includes(searchLocation);
        const isKeywordsMatch = keywords.includes(searchKeywords);

        
        jobCard.style.display = isTitleMatch && isLocationMatch && isKeywordsMatch ? 'block' : 'none';
    });
}


function createJobCard(job) {
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');

    const titleElement = document.createElement('h3');
    titleElement.textContent = job.title;

    const locationElement = document.createElement('p');
    locationElement.textContent = job.location;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = job.description;

    
    const keywordsElement = document.createElement('p');
    keywordsElement.textContent = `Keywords: ${job.keywords}`; // Make sure you have a 'keywords' property in your job data
    keywordsElement.classList.add('keywords');

    const applyButton = document.createElement('button'); // Change from anchor to button element
    applyButton.textContent = 'Apply';
    applyButton.classList.add('apply-button');
    applyButton.addEventListener('click', () => applyForJob(job.title, job.applyLink)); // Add click event listener

    jobCard.appendChild(titleElement);
    jobCard.appendChild(locationElement);
    jobCard.appendChild(descriptionElement);
    jobCard.appendChild(keywordsElement);
    jobCard.appendChild(applyButton);

    return jobCard;
}



function applyForJob(jobTitle, applyLink) {
    window.open(applyLink, '_blank');
}
