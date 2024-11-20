
export class UserEmail {
  private readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private value: string;

  constructor(value: string) {
    if (value == null) {
      throw new Error('이메일을 입력해주세요.');
    }
    if (value.length < 20) {
      throw new Error('이메일은 20자 이내로 입력해주세요.');
    }
    if (!this.EMAIL_REGEX.test(value)) {
      throw new Error('이메일 형식이 올바르지 않습니다.');
    }
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }
}
