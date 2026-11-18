(function () {
  "use strict";

  const NUMBER_SELECTOR =
    'input[aria-labelledby="number-0000003b-acc"]';

  const GROUP_SELECTOR =
    '[data-role="container"][data-type="repeatable"]';

  function initialize() {
    const numberInput = document.querySelector(NUMBER_SELECTOR);
    const group = document.querySelector(GROUP_SELECTOR);

    if (!numberInput || !group) {
      console.warn("[GBS] Delegate fields not found.");
      return;
    }

    if (window.__gbsDelegateValidation) return;
    window.__gbsDelegateValidation = true;

    const message = document.createElement("div");
    message.id = "gbs-delegate-error";
    message.setAttribute("role", "alert");
    message.style.cssText =
      "color:#b42318;font-size:14px;margin-top:8px;";

    numberInput
      .closest('[data-role="input-row"]')
      ?.appendChild(message);

    function validate() {
      const expected = Number(numberInput.value);
      const actual = Number(
        group.getAttribute("data-num-children")
      );

      let error = "";

      if (!Number.isInteger(expected) || expected < 1) {
        error = "Please enter a valid number of delegates.";
      } else if (expected !== actual) {
        error =
          `You entered ${expected} delegate(s), ` +
          `but added ${actual} delegate group(s). ` +
          "Please add or remove delegate groups.";
      }

      message.textContent = error;
      numberInput.setCustomValidity(error);

      return !error;
    }

    numberInput.addEventListener("input", validate);
    numberInput.addEventListener("change", validate);

    const observer = new MutationObserver(validate);
    observer.observe(group, {
      attributes: true,
      attributeFilter: ["data-num-children"]
    });

    const form = numberInput.closest("form");

    if (form) {
      form.addEventListener("submit", function (event) {
        if (!validate()) {
          event.preventDefault();
          event.stopImmediatePropagation();
          numberInput.reportValidity();
          numberInput.focus();
        }
      }, true);
    }

    validate();

    console.info("[GBS] Delegate validation active.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
