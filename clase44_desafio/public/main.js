const formProd = document.getElementById("formProd");
const formMsj = document.getElementById("formMsj");

const renderProduct = (data) => {
  const html = data
    .map((elem, index) => {
      return `
	    <tr>
          <td>${elem.title}</td>
          <td>${elem.price}</td>
          <td class="w-25 p-3"><img
              src="${elem.thumbnail}"
              alt="..."
              class="img-fluid"
            /></td>
        </tr>`;
    })
    .join(" ");
  document.querySelector("#tableBody").innerHTML = html;
};

const renderMessages = (data) => {
  const html = data
    .map((elem, index) => {
      let date = new Date(elem.date).toLocaleString();
      return `<div >
				<strong class="text-primary">${elem.author.id}</strong><span style="color:brown">[${date}]</span>:
				<i style="color:green">${elem.text}</i>  
    <img width="20" height="20" src=${elem.author.avatar} />`;
    })
    .join(" ");
  document.querySelector("#messages").innerHTML = html;
};

const renderProductAdd = (data) => {
  const html = `
	<td>${data.title}</td>
	<td>$${data.price}</td>
	<td alt="Max-width 50%"><img
		src="${data.thumbnail}"
		alt="..."
		class="img-fluid "
	  /></td>`;
  const tr = document.createElement("tr");
  tr.innerHTML = html;
  document.querySelector("#tableBody").append(tr);
};

const renderMessageAdd = (data) => {
  let date = new Date(data.date).toLocaleString();
  const html = `
  <strong class="text-primary">${data.email}</strong><span style="color:brown">[${date}]</span>:
  <i style="color:green">${data.texto}</i>
	<img width="20" height="20" src=${data.avatar} />`;
  const div = document.createElement("div");
  div.innerHTML = html;
  document.querySelector("#messages").append(div);
};

const agregarProd = async (e) => {
  e.preventDefault();
  const product = {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    thumbnail: document.querySelector("#thumbnail").value,
  };

  let query = `mutation {
    createProduct(datos: {
      title: "${product.title}",
      price: ${product.price},
      thumbnail: "${product.thumbnail}"
    }) {
      id
      title
      thumbnail
      price
    }
  }`;

  let resp = await fetch("/graphql", {
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
  });
  resp = await resp.json();
  console.log(resp.data.createProduct);

  renderProductAdd(resp.data.createProduct);
};

const addMessage = async (e) => {
  e.preventDefault();
  const message = {
    email: document.querySelector("#userEmail").value,
    nombre: document.querySelector("#userNombre").value,
    apellido: document.querySelector("#userApellido").value,
    edad: document.querySelector("#userEdad").value,
    alias: document.querySelector("#userAlias").value,
    avatar: document.querySelector("#userAvatar").value,
    texto: document.querySelector("#text").value,
    date: new Date(),
  };
  let resp = await fetch("/addMsg", {
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  resp = await resp.json();

  renderMessageAdd(message);

  return false;
};

formProd.addEventListener("submit", agregarProd);
formMsj.addEventListener("submit", addMessage);
