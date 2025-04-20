function loadCategories() {
  fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => dataList(data.categories));
}
const dataList = (categories) => {
  const categorisNav = document.getElementById("categorisNav");
  for (let cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categorisNav.appendChild(categoryDiv);
  }
};
loadCategories();
