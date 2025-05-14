// ✅ 타입 추론 (Type Inference)

/**
 * 타입스크립트는 "점진적 타입 시스템 (Gradual Typing)"을 채택한 언어임
 * → 정적 타입 + 동적 타입을 혼합하여 사용 가능
 * → 타입이 없어도 코드가 동작하는 유연함이 특징
 */

/**
 * 타입스크립트는 **초기값을 기준**으로 변수의 타입을 **자동으로 추론**
 * → 타입을 일일이 명시하지 않아도 안전성과 생산성을 동시에 확보할 수 있음
 */

// ▶️ 변수의 초기화 값을 기준으로 타입 추론
let a = 10; // number
let b = "string"; // string
// c = { id: number, ...}
let c = {
  id: 1,
  name: "이정환",
  profile: {
    nickname: "winterlood",
  },
  urls: ["www.google.com"],
};

// ▶️ 구조 분해 할당에서도 타입 추론이 적용됨
let { id, name, profile } = c;
let [one, two, three] = [1, "hello", true];

// ▶️ 함수도 마찬가지로 기본값, 반환값 기준으로 타입 추론
function func(message = "hello") {
  return message; // string
}

/* ------------------------ */

/**
 * 🔸 암시적 any 타입 (Implicit Any)
 *
 * 타입 주석 없이 선언만 한 변수는 기본적으로 `any`로 추론됨.
 * (`tsconfig.json`에서 `noImplicitAny: true`가 설정되어 있으면 오류 발생)
 */

let d; // 암묵적 any 타입
d = 10;
d.toFixed(); // number 타입으로 진화했음 (Number 메서드 상속)
d.toUpperCase(); // number 타입이므로 String 메서드 사용 불가

d = "string"; // 이후 string도 할당 가능
d.toUpperCase(); // string 타입으로 진화했음 (String 메서드 상속)
d.toFixed(); // string 타입이므로 Number 메서드 사용 불가

// 명시적으로 any를 지정한 경우에는 오류가 발생하지 않는다 (주의))
let e: any;
e = 10;
e.toFixed();
e.toUpperCase();

e = "string";
e.toFixed();
e.toUpperCase();

/* ------------------------ */

/**
 * 🔸 타입 Widening (타입 넓히기)
 *
 * const 변수는 값이 변하지 않기 때문에 **리터럴 타입**으로 추론됨
 * let 변수는 재할당 가능성을 고려하여 **기본 타입**으로 추론됨
 */

const num1 = 10; // 타입: 10 (number literal)
let num2 = 10; // 타입: number (일반 number 타입으로 widen)

const str1 = "string"; // 타입: "string" (string literal)
let str2 = "string";

// 🔸 객체나 배열 같은 참조 타입은
// const, let을 떠나서 포함한 요소들의 범용적 유니언 타입으로 추론된다.
const arr1 = [1, "str", true];
let arr2 = [1, "str", true];

const obj1 = {
  a: 1,
  b: "string",
};
let obj2 = {
  a: 1,
  b: "string",
};
