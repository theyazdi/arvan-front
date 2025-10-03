export function postRefId(refIdValue: string , mobileNumber?:string) {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", "https://asan.shaparak.ir");
    form.setAttribute("target", "_self");

    const hiddenField1 = document.createElement("input");
    hiddenField1.setAttribute("name", "RefId");
    hiddenField1.setAttribute("value", refIdValue);

    const hiddenField2 = document.createElement("input");
    hiddenField2.setAttribute("name", "mobileap");
    hiddenField2.setAttribute("value", mobileNumber || "");

    form.appendChild(hiddenField1);
    form.appendChild(hiddenField2);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }