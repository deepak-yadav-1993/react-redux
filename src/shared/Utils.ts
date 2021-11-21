/**
 * Given a string, returns the string with first character uppercased
 * @param data
 * @returns
 */
export const firstCharacterToUpperCase = (data: string): string => {
  return `${data[0].toUpperCase()}${data.slice(1)}`;
};
