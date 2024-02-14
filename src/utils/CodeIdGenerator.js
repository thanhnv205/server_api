class CodeIdGenerator {
  constructor(prefix, initialCount = 1) {
    this.prefix = prefix
    this.count = initialCount
  }

  generateCodeId() {
    const codeId = `${this.prefix}${this.padNumber(this.count)}`
    this.count += 1
    return codeId
  }

  padNumber(number) {
    return String(number).padStart(3, '0')
  }
}

export default CodeIdGenerator