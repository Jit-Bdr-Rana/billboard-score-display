const clearInputValue = (id: string, value = "") => {
  const input: HTMLInputElement = document.getElementById(
    id
  ) as HTMLInputElement;
  input.value = value;
};

export { clearInputValue };
