import { ProductConsulting } from "../model/product-consulting.model";

export class ProductConsultingRegistrationValidator {
  private productConsulting: ProductConsulting;
  private errorMessages: string[] = [];

  constructor(viewModel: ProductConsulting) {
    this.productConsulting = viewModel;
  }

  // 이름 유효성 검사
  validateName(name: string): void {
    if (name == null || name.length == 0) {
      this.errorMessages.push('이름을 입력해주세요.');
    }
    else if (!/^[가-힣a-zA-Z]+$/.test(name.trim())) {
      this.errorMessages.push('이름은 한글과 영어만 입력 가능합니다.');
    }
  }


  // 전화번호 첫 번째 부분 유효성 검사 (2~3자리)
  validateTel1(tel1: string): void {
    if (tel1 == null || tel1.length == 0) {
      this.errorMessages.push('전화번호를 입력해주세요.');
    } else if (tel1.length < 2 || tel1.length > 3) {
      this.errorMessages.push('전화번호의 첫 번째 부분은 2자리 또는 3자리여야 합니다.');
    } else if (isNaN(Number(tel1))) {
      this.errorMessages.push('전화번호에 숫자가 아닌 값은 입력할 수 없습니다.');
    }
  }

  // 전화번호 두 번째 부분 유효성 검사 (4자리)
  validateTel2(tel2: string): void {
    if (tel2 == null || tel2.length == 0) {
      this.errorMessages.push('전화번호를 입력해주세요.');
    } else if (tel2.length !== 4) {
      this.errorMessages.push('전화번호의 두 번째 부분은 4자리여야 합니다.');
    } else if (isNaN(Number(tel2))) {
      this.errorMessages.push('전화번호에 숫자가 아닌 값은 입력할 수 없습니다.');
    }
  }

  // 전화번호 세 번째 부분 유효성 검사 (4자리)
  validateTel3(tel3: string): void {
    if (tel3 == null || tel3.length == 0) {
      this.errorMessages.push('전화번호를 입력해주세요.');
    } else if (tel3.length !== 4) {
      this.errorMessages.push('전화번호의 세 번째 부분은 4자리여야 합니다.');
    } else if (isNaN(Number(tel3))) {
      this.errorMessages.push('전화번호에 숫자가 아닌 값은 입력할 수 없습니다.');
    }
  }


  // 이메일 유효성 검사
  validateEmail(email: string): void {
    if (email == null || email.length == 0) {
      this.errorMessages.push('이메일을 입력해주세요.')
    }

    // @ 기호가 아닌 문자가 나올 때까지의 문자 + @ + @ 다음 + . + . 다음 -> 한글 입력 불가
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      this.errorMessages.push('올바른 이메일 주소를 입력해주세요.');
    }
  }

  validate(productConsulting: ProductConsulting): string[] {
    this.errorMessages = [];
    this.validateName(productConsulting.name);
    this.validateTel1(productConsulting.tel1);
    this.validateTel2(productConsulting.tel2);
    this.validateTel3(productConsulting.tel3);
    this.validateEmail(productConsulting.email);

    console.log('Error Messages:', this.errorMessages);

    return this.errorMessages;
  }
}