document.addEventListener("DOMContentLoaded",()=>{
  const dropBox = document.getElementById("dropbox");
  const imageInput = document.getElementById("images");
  const imagePreview = document.getElementById("imagePreview");
  const title = document.getElementById("title");
  const addForm = document.getElementById("addForm");

  dropBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropBox.style.borderColor = " #007bff";
    dropBox.style.color = " #007bff";
  });
  dropBox.addEventListener("dragleave", () => {
    dropBox.style.borderColor = "";
    dropBox.style.color = "";
  });
  dropBox.addEventListener("drop", (e) => {
    e.preventDefault();
    dropBox.style.borderColor = "";
    dropBox.style.color = "";

    const files = Array.from(e.dataTransfer.files);
    imageInput.files = e.dataTransfer.files;
    handleMultiplePreviews(files);
  });

  imageInput.addEventListener("change", () => {
    const files = Array.from(imageInput.files);
    handleMultiplePreviews(files);
  });

  function handleMultiplePreviews(files) {
    imagePreview.style.display = "flex";
    imagePreview.innerHTML = ""; // clear previous previews

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = document.createElement("img");
        img.src = event.target.result;
        img.style.width = "100px";
        img.style.height = "100px";
        img.style.objectFit = "cover";
        img.style.border = "1px solid #ccc";
        img.style.borderRadius = "8px";
        imagePreview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  // addForm.addEventListener("submit",(e)=>{
  //     if (!title.value.trim()) {
  //       e.preventDefault(); // ❗ Prevents form from submitting
  //       alert("Please insert the title first.");
  //     }
  // })

})