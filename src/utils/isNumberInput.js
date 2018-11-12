export default (evt) => {
  const charCode = (evt.which) ? evt.which : evt.keyCode;
  return charCode < 48 || charCode > 57 ? evt.preventDefault() : true;
};
