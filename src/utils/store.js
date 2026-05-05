const KEY = 'tpl_preapproval_passes'

export function getAllPasses() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function savePass(formData) {
  const passes = getAllPasses()
  const number = passes.length + 1
  const passNumber = `PA-${String(number).padStart(3, '0')}`
  const newPass = {
    ...formData,
    passNumber,
    savedAt: new Date().toISOString(),
  }
  passes.push(newPass)
  localStorage.setItem(KEY, JSON.stringify(passes))
  return passNumber
}

export function getPassByNumber(passNumber) {
  return getAllPasses().find(p => p.passNumber === passNumber) || null
}