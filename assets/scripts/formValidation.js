function checkDate() {
  const today = new Date();
  let tomorrowDay = today.getDate() + 1;
  let tomorrowMonth = today.getMonth() + 1;
  let tomorrowYear = today.getFullYear();

  tomorrowDay = correctDate(tomorrowDay);
  tomorrowMonth = correctDate(tomorrowMonth);

  const tomorrow = tomorrowYear + "-" + tomorrowMonth + "-" + tomorrowDay;
  const dateField = document.getElementById("dateField");
  document.getElementById("dateField").min = tomorrow;
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

function correctDate(period) {
  period < 10 ? (period = "0" + period) : period;
  return period;
}

function validateCheckbox() {
  const checkboxes = document.querySelectorAll(".single-checkbox");
  checkboxes.forEach((checkbox) =>
    checkbox.addEventListener("click", selectiveCheck)
  );
}

function selectiveCheck(event) {
  const maxChecked = 2;
  const checkedChecks = document.querySelectorAll(".single-checkbox:checked");
  if (checkedChecks.length > maxChecked) {
    event.preventDefault();
    return false;
  }
}

function changeSubmitBtn() {
  const submit = document.getElementById("submitBtn");
  const form = document.querySelector(".form");
  submit.setAttribute("disabled", "disabled");
  form.addEventListener("keyup", enableCompleteBtn);
  form.addEventListener("change", enableCompleteBtn);

  function enableCompleteBtn() {
    if (form.checkValidity()) {
      submit.removeAttribute("disabled");
    } else {
      submit.setAttribute("disabled", "disabled");
    }
  }
}

function checkValidityInputs() {
  const form = document.querySelector(".form");
  form.addEventListener(
    "blur",
    (e) => {
      const input = e.target;
      if (input.matches(".inputfield")) {
        if (input.checkValidity()) {
          input.classList.add("valid");
          input.classList.remove("invalid");
        } else {
          input.classList.add("invalid");
          input.classList.remove("valid");
        }
      }
    },
    true
  );
}

function summarizeOrder() {
  const submit = document.getElementById("submitBtn");
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
