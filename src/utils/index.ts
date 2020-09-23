export const ncs = [
  "의사소통능력",
  "문제해결능력",
  "대인관계능력",
  "자원관리능력",
  "직업윤리",
  "정보능력",
  "수리능력",
  "직무수행능력",
  "전공능력",
];

export const getGongdbInputData = (): GongdbInputData => {
  let value = {} as GongdbInputData;

  document.querySelectorAll(".form-control").forEach((element) => {
    const name = element.attributes.getNamedItem("name")?.value as string;
    const inputValue = (element as HTMLInputElement).value;
    if (name in value) {
      if (Array.isArray(value[name])) {
        value = {...value, [name]: [...value[name] as string[], inputValue]};
      }
      else {
        value = {...value, [name]: [value[name] as string, inputValue]};
      }
    }
    else {
      value = {...value, [name]: inputValue};
    }
  });
  
  document.querySelectorAll(".form-check-input").forEach((element) => {
    const name = element.attributes.getNamedItem("name")?.value as string;
    const isChecked = (element as HTMLInputElement).checked;
    if (name in value) {
      if (Array.isArray(value[name])) {
        value = {...value, [name]: [...value[name] as boolean[], isChecked]};
      }
      else {
        value = {...value, [name]: [value[name] as boolean, isChecked]};
      }
    }
    else {
      value = {...value, [name]: isChecked};
    }
  });

  value.ncs = value.ncs.map((isChecked: boolean, index: number) => isChecked ? ncs[index] : null).filter((each: (string|null)) => each).join(",");

  return value;
};

export const clearForm = (): void => {
  document.querySelectorAll(".erasable").forEach((element) => {
    (element as HTMLInputElement).value = "";
  });

  document.querySelectorAll(".form-check-input").forEach((element) => {
    const isChecked = (element as HTMLInputElement).checked;
    if (isChecked) {
      (element as HTMLInputElement).click();
    }
  });
};

export const exportJSON = (object: any): void => {
  var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(object));
  
  let a = document.createElement("a");
  a.href = "data:" + data;
  a.download = "data.json";

  a.click();
  a.remove();
};

export const saveJSON = (object: any): void => {
  localStorage.setItem("gongdb-input", JSON.stringify(object));
};