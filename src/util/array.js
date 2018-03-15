export const removeDuplicate = eq => arr =>
  arr.filter((a, i) => i === arr.findIndex(b => eq(a, b)))

export const removeDuplicateId = removeDuplicate((a, b) => a.id == b.id)

export const removeDuplicatePrimitive = removeDuplicate((a, b) => a === b)
