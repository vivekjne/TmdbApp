import { CreditResponse } from "../../types/Credits.type";

export const formatCredit = (creditData: CreditResponse) => {
  const castByDepartment = new Map();
  const crewByDepartment = new Map();

  if (creditData) {
    creditData.cast.forEach((c) => {
      if (castByDepartment.has(c.known_for_department)) {
        castByDepartment.get(c.known_for_department).push(c);
      } else {
        castByDepartment.set(c.known_for_department, [c]);
      }
    });

    creditData.crew.forEach((c) => {
      if (crewByDepartment.has(c.known_for_department)) {
        crewByDepartment.get(c.known_for_department).push(c);
      } else {
        crewByDepartment.set(c.known_for_department, [c]);
      }
    });
  }

  return { castByDepartment, crewByDepartment };
};

export type FormatCreditType = ReturnType<typeof formatCredit>;
