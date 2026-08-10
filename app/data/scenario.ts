export type Person = { name: string; team: string; status: "Eligible" | "Conflict"; note: string; alternative?: string };
export const scenario = {
  course: "New Manager Foundations", code: "LDR-104", requestor: "Claire Martin", city: "Paris", trainer: "Victor Ionescu",
  date: "Tuesday, 17 September 2026", time: "09:00–16:30 CEST", room: "Tour Granite · Aster 3", capacity: 16,
  people: [
    { name:"Alice Bernard", team:"Global Markets", status:"Eligible", note:"Curriculum and manager eligibility confirmed." },
    { name:"Benoît Leroy", team:"Finance", status:"Eligible", note:"Prerequisite complete; space available." },
    { name:"Chloé Dubois", team:"Compliance", status:"Eligible", note:"Mandatory learning assignment confirmed." },
    { name:"Daniel Moreau", team:"IT", status:"Eligible", note:"Prerequisite complete; space available." },
    { name:"Élodie Simon", team:"Risk", status:"Eligible", note:"Manager eligibility confirmed." },
    { name:"François Laurent", team:"Operations", status:"Eligible", note:"Prerequisite complete; space available." },
    { name:"Gabrielle Petit", team:"HR", status:"Eligible", note:"Manager eligibility confirmed." },
    { name:"Hugo Blanc", team:"Legal", status:"Eligible", note:"Prerequisite complete; space available." },
    { name:"Inès Robert", team:"Client Services", status:"Eligible", note:"Manager eligibility confirmed." },
    { name:"Julien Thomas", team:"Audit", status:"Eligible", note:"Prerequisite complete; space available." },
    { name:"Karim Bensaid", team:"Corporate Banking", status:"Conflict", note:"Client review already accepted for 10:00–11:30.", alternative:"Thursday, 19 September · 09:00–16:30" },
    { name:"Laura Gauthier", team:"Securities Services", status:"Conflict", note:"Mandatory risk committee overlaps 13:00–15:00.", alternative:"Tuesday, 24 September · 09:00–16:30" }
  ] as Person[],
  checks: ["Curriculum rule 4.2 — New manager population", "Rule 6.1 — Prerequisite completed", "Rule 8.3 — Maximum capacity", "Control C-117 — Trainer eligibility"],
};
