function loadCategories() {
  fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => dataList(data.categories));
}
const buttonRemove = () => {
  const revomeActiveClass = document.getElementsByClassName("active");
  for (const btn of revomeActiveClass) {
    btn.classList.remove("active");
  }
};
const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};
const displayVideoDetails = (video) => {
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details_container");
  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes"
      class="w-full" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    
  </div>
</div>
  `;
};
const dataList = (categories) => {
  const categorisNav = document.getElementById("categorisNav");
  for (let cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button id="btn-${cat.category_id}" onclick="videoLoadCategory(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categorisNav.appendChild(categoryDiv);
  }
};
const videoLoadCategory = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      buttonRemove();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      videosData(data.category);
    });
};
function videosList(searchText = "") {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => {
      buttonRemove();
      document.getElementById("btn-all").classList.add("active");
      videosData(data.videos);
    });
}
const videosData = (videos) => {
  const videosFiles = document.getElementById("videos");
  videosFiles.innerHTML = "";
  if (videos.length == 0) {
    videosFiles.innerHTML = `
  <div class="flex flex-col items-center text-center col-span-full pt-10">
          <img src="asstes/Icon.png" alt="" class="h-[150px] w-[150px] " />
          <p class="text-2xl font-semibold">
            Oops!! Sorry, There is no <br />
            content here
          </p>
        </div>
 `;
  }
  videos.forEach((video) => {
    const videoDiv = document.createElement("div");
    videoDiv.innerHTML = `
   <div class="">
          <div class="card bg-base-100">
            <figure class="relative transition-transform duration-500 hover:scale-102 ">
              <img
                src="${video.thumbnail}"
                alt="Shoes"
                class='h-[200px] w-full object-cover '
              />
              <p
                class="absolute text-xs bg-gray-900 bottom-2 right-2 text-white rounded-sm p-1"
              >
                3hrs 56 min ago
              </p>
            </figure>
            <div class="flex gap-5 py-5">
              <div class="avatar">
                <div
                  class="ring-primary ring-offset-base-100 w-14 h-14 rounded-full ring ring-offset-2"
                >
                  <img
                    src="${video.authors[0].profile_picture}"
                  />
                </div>
              </div>
              <div>
                <h2 class="card-title">${video.title}</h2>
                <p class="flex items-center gap-1 text-gray-500">
                  ${video.authors[0].profile_name}
                  ${
                    video.authors[0].verified == true
                      ? `<img
                    src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                    alt=""
                    class="w-4 h-4"
                  />`
                      : ``
                  }
                </p>
                <p class="text-gray-500">${video.others.views} views</p>
              </div>
            </div>
          </div>
          <button onclick="loadVideoDetails('${
            video.video_id
          }')" class="btn btn-block">Show details</button>
        </div>
    `;
    videosFiles.appendChild(videoDiv);
  });
};
document.getElementById("search-input").addEventListener("keyup", (event) => {
  const input = event.target.value;
  videosList(input);
});

videosList();
loadCategories();
