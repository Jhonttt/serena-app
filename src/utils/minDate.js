export const minDate = () => {
  const minBirthDate = new Date();
  minBirthDate.setFullYear(minBirthDate.getFullYear() - 110);
  const minDateStr = minBirthDate.toISOString().split("T")[0];
  return minDateStr;
}