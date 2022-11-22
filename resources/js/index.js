const toJson= "https://api.rss2json.com/v1/api.json?rss_url=";

const accordion=document.getElementById("accordionExample");

function init(){

    magazines.forEach(async(rssUrl,index) => {
        
        const data = await fetchdata(toJson+rssUrl);
        addAccordion(data,index);
        
    });
}

async function fetchdata(url){
    try{
    const data=await fetch(url);
    const jsonData=await data.json();
    return jsonData;
    }
    catch(error){
        return null;
    }
}

function addAccordion(data,id){
    
       const accordItem=document.createElement("div");
       accordItem.className="accordion-item";
       accordItem.innerHTML=`
<h2 class="accordion-header" id="heading${id}">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="true" aria-controls="collapse${id}">
        ${data.feed.title}
      </button>
</h2>
<div id="collapse${id}" class="accordion-collapse collapse ${id===0 ?"show":""} aria-labelledby="heading${id}" data-bs-parent="#accordionExample">
    <div class="accordion-body">
      <div id="carouselExampleControls${id}" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" id="carousel-inner${id}">
   
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls${id}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls${id}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>
        </div>
        
      </div>
    </div>     
       
       `

    accordion.appendChild(accordItem);
    addCarousel(data.items,id);

}

function addCarousel(items,id){
  console.log(items);
    const carouselInner = document.getElementById(`carousel-inner${id}`);
    items.forEach((item,key) => { 
      console.log(item.enclosure.link);
    const carouselItem = document.createElement("div");
    let pubDate = new Date(item.pubDate).toLocaleDateString();
    carouselItem.className = `carousel-item ${key === 0 ? "active" : ""}`;
    carouselItem.innerHTML =`
    <div class="card" style="width: max-width;">
  <img class="card-img-top" src="${item.enclosure.link}" alt="${item.title}">
  <div class="card-body">
    <h3 class="card-title">${item.title}</h3>
    <p class="text-black-50">- ${item.author}  &nbsp;&nbsp;&nbsp; &bull; ${pubDate}</p>
    <p class="card-text">Description: ${item.description}</p>
    <a href="${item.link}">Visit for full article</a>
  </div>
</div>
 `;

    carouselInner.appendChild(carouselItem);
});

}

init();














