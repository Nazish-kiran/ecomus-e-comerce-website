// const urls = "https://api.escuelajs.co/api/v1/products";
// let getData = async () => {
//   let response = await fetch(urls);
//   let data = await response.json();
//   const cardRow = document.querySelector(".card-row");
//   data.forEach((elem, key) => {
//     let img = elem.images[0]

//     cardRow.innerHTML += `
//          <div class="card-content">
//          <img src="${img}" alt="">
//             <div
//               class="card border-0 overflow-hidden"
//               style="width: 30rem; height: 42rem"
//             >
//               <div class="sec2-card  card-body d-flex align-items-end" style='background-image:url("${img}");background-size: cover; background-position: center;'>
//                 <div
//                   class="black-box bg-black w-100 opacity-50 text-light small fw-bold justify-content-center align-items-center d-none"
//                 >
//                   S M X XL
//                 </div>
//               </div>
//             </div>
//             <div class="card-txt text-start pt-4">
//               <p class="txt-font red-hover cursor-pointer">Ribbed Tank Top</p>
//               <p class="small fw-bold pt-2">$16.95</p>
//             </div>
//           </div>
//     `;
//   });
// };
// getData();

  const cardRow = document.querySelector(".card-row");
var showdata = () => {
  var dataShow = new Promise((resolve, reject) => {
    fetch("https://fakestoreapi.com/products")
      .then((e) => {
        return e.json();
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return dataShow;
};

showdata()
.then((res) => {
    res.forEach((product) => {
        cardRow.innerHTML += `
         <div class="card-content">
            <div
              class="card border-0 overflow-hidden"
              style="width: 30rem; height: 39rem"
            >
              <div class="sec2-card card-body d-flex align-items-end" style='background-image:url("${product.image}");          background-repeat:no-repeat;background-size:cover; background-position:center;'>
              </div>
            </div>
            <div class="card-txt text-start pt-4" style="width:200px">
              <p class="small red-hover cursor-pointer">${product.title}</p>
              <p class="small fw-bold pt-2">$16.95</p>
            </div>
          </div>
    `;
    });
  })
  .catch((error) => {
    console.log(error);
  });
