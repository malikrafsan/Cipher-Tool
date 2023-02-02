class TextProcessor {
  private static removeNonAlphabet(text: string) {
    return text.replace(/[^a-zA-Z]/g, "");
  }

  private static toUpperCase(text: string) {
    return text.toUpperCase();
  }

  static clean(text: string) {
    return this.toUpperCase(this.removeNonAlphabet(text));
  }
}

export default TextProcessor;
