export const getCurrentLogMonth = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  return currentMonth;
}
