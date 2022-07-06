function checkDate() {
  let tomorrow = new Date();
  let dd = tomorrow.getDate() + 1;
  let mm = tomorrow.getMonth() + 1;
  let yyyy = tomorrow.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  tomorrow = yyyy + "-" + mm + "-" + dd;
  let dateField = document.getElementById("dateField");
  document.getElementById("dateField").min = tomorrow;
  console.log(dateField.checkValidity(), dateField.value < tomorrow);
  console.log(dateField);
  dateField.addEventListener("change", function () {
    if (dateField.value < tomorrow) {
      dateField.setCustomValidity(
        "Delivery date should be not earlier than tomoorrow"
      );
    } else {
      dateField.setCustomValidity("");
    }
  });
}

function validateCheckbox() {
  const checkbox = document.querySelectorAll(".single-checkbox");
  const max = 2;
  for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = selectiveCheck;
    function selectiveCheck() {
      const checkedChecks = document.querySelectorAll(
        ".single-checkbox:checked"
      );
      if (checkedChecks.length >= max + 1) return false;
    }
  }
}

function changeSubmitBtn() {
  const submit = document.getElementById("submitBtn");
  const form = document.querySelector(".form");
  submit.setAttribute("disabled", "disabled");
  form.addEventListener("keyup", enableCompleteBtn);
  form.addEventListener("change", enableCompleteBtn);

  function enableCompleteBtn() {
    if (form.checkValidity() === true) {
      submit.removeAttribute("disabled");
    } else {
      submit.setAttribute("disabled", "disabled");
    }
  }
}

function checkValidityInputs() {
  const inputs = document.querySelectorAll('input:not([type="submit"])');
  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      if (input.checkValidity() === true) {
        input.classList.add("valid");
        input.classList.remove("invalid");
      } else {
        input.classList.add("invalid");
        input.classList.remove("valid");
      }
    });
  });
}

function summarizeOrder() {
  const submit = document.getElementById("submitBtn");
  let cartField = document.getElementById("cartField");
  const street = document.getElementById("street");
  const name = document.getElementById("name");
  const surname = document.getElementById("surname");
  const house = document.getElementById("house");
  const flat = document.getElementById("flat");
  const deliveryDate = document.getElementById("dateField");

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("cartField").innerHTML = `
            <h2>The order created.<br>
            The delivery address is ${street.value} street, house ${house.value}, flat ${flat.value}.<br> 
            Customer ${name.value} ${surname.value}.<br>
            Delivery date - ${deliveryDate.value}.</h2>`;
    localStorage.setItem("items", JSON.stringify([]));
  });
}

export {
  checkDate,
  validateCheckbox,
  changeSubmitBtn,
  checkValidityInputs,
  summarizeOrder,
};
