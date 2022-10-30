const socket = io.connect();

const renderProduct = (data) => {
  console.log("chat" + data);
  const html = data
    .map((elem, index) => {
      return `
	    <tr>
          <td>${elem.title}</td>
          <td>${elem.price}</td>
          <td><img
              src="${elem.thumbnail}"
              alt="..."
              class="img-responsive img-thumbnail"
            /></td>
        </tr>`;
    })
    .join(" ");
  document.querySelector("#tableBody").innerHTML = html;
};

const renderMessages = (data) => {
  const html = data
    .map((elem, index) => {
      return `<div>
				<strong class="text-primary">${elem.author}</strong><span style="color:brown">[${elem.date}]</span>:
				<i style="color:green">${elem.text}</i>
			</div>`;
    })
    .join(" ");
  document.querySelector("#messages").innerHTML = html;
};

const renderProductAdd = (data) => {
  const html = `
	<td>${data.title}</td>
	<td>${data.price}</td>
	<td><img
		src="${data.thumbnail}"
		alt="..."
		class="img-responsive img-thumbnail"
	  /></td>`;
  const tr = document.createElement("tr");
  tr.innerHTML = html;
  document.querySelector("#tableBody").append(tr);
};

const renderMessageAdd = (data) => {
  const html = `
  <strong class="text-primary">${data.author}</strong><span style="color:brown">[${data.date}]</span>:
  <i style="color:green">${data.text}</i>
	`;
  const div = document.createElement("div");
  div.innerHTML = html;
  document.querySelector("#messages").append(div);
};

const addProduct = (e) => {
  const product = {
    title: document.querySelector("#title").value,
    price: document.querySelector("#price").value,
    thumbnail: document.querySelector("#thumbnail").value,
  };
  socket.emit("new-product", product);
  return false;
};

const addMessage = (e) => {
  const message = {
    author: document.querySelector("#userEmail").value,
    text: document.querySelector("#text").value,
    date: new Date().toLocaleString(),
  };
  socket.emit("new-message", message);
  return false;
};

socket.on("list-product", (data) => {
  renderProduct(data);
});

socket.on("product-push", (data) => {
  renderProductAdd(data);
});

socket.on("messages", (data) => {
  renderMessages(data);
});

socket.on("messages-push", (data) => {
  renderMessageAdd(data);
});
