import { FormatOptions as FO } from "@/types";

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

  private static removeSpaces(text: string) {
    return text.replace(/\s/g, "");
  }

  private static add5Spaces(text: string) {
    return text.replace(/(.{5})/g, "$1 ");
  }

  static format(text: string, option: FO.FormatOptionValType) {
    switch (option) {
      case FO.FORMAT_OPTIONS.NO_SPACES:
        return this.removeSpaces(text);
      case FO.FORMAT_OPTIONS.WITH_5_SPACES:
        return this.add5Spaces(text);
      default:
        return text;
    }
  }
}

export default TextProcessor;
