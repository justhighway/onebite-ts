// 함수 타입 표현식 (Function Type Expression)
// 함수의 '시그니처' (매개변수 타입과 반환 타입)만을 정의하는 데 사용
// syntax: (param: type, ...) => return type

// 함수의 타입을 타입 별칭으로 만들어줄 수 있다.
// -> (a: number, b: number) => number 라는 타입을
// -> "Operation1"이라는 이름으로 부르겠다
type Operation1 = (a: number, b: number) => number;

// 함수 타입 표현식 적용: Operation1 타입으로 함수를 정의
// Operation1 타입은 함수의 '시그니처' (입력/출력 타입)만 정의
const add1: Operation1 = (a, b) => a + b;
const sub1: Operation1 = (a, b) => a - b;
const mul1: Operation1 = (a, b) => a * b;
const div1: Operation1 = (a, b) => a / b;

// 타입 별칭 없이 인라인으로 직접 함수 타입을 명시할 수도 있음
// Operation1 타입을 풀어쓴 것과 동일하며, 역시 함수 시그니처만 정의
const add2: (a: number, b: number) => number = (a, b) => a + b;

/* ------------------------------------ */

// 호출 시그니처(콜 시그니처)

/**
 * 함수 자체가 객체임을 이용해, 함수의 호출 시그니처 외에도
 * 추가적인 프로퍼티나 메서드를 함께 정의할 때 사용
 * 함수이면서 동시에 다른 멤버를 가진 객체처럼 사용되는 '하이브리드 타입'을 정의할 때 유용
 */

// 함수도 객체이기 때문에 타입을 객체 리터럴 형태로 만들어줄 수 있음
// -> 하이브리드 시그니처의 추가 가능성을 의미
type Operation2 = {
  // 호출 시그니처 (함수의 매개변수 및 반환 타입 정의)
  (a: number, b: number): number;

  // 하이브리드 시그니처 (함수 객체에 추가될 프로퍼티/메서드 정의)
  // Operation2 타입의 함수는 'name' 프로퍼티를 가지게 됨
  name: string;
};

// 호출 시그니처 적용: Operation2 타입으로 함수를 정의
const add3: Operation2 = (a, b) => a + b;
const sub2: Operation2 = (a, b) => a - b;
const mul2: Operation2 = (a, b) => a * b;
const div2: Operation2 = (a, b) => a / b;

// 하이브리드 시그니처 사용 예시
// 함수 객체에 접근하듯 프로퍼티에 접근하고 값을 할당할 수 있음
add3.name = "Addition Function";
console.log(sub2.name);

// 함수는 객체므로, 프로퍼티를 가질 수 있다
function func() {}
func.props = "hi";

/* ------------------------------------ */

// 핵심 요약

/**
 * 함수 타입 표현식 (=>)
 * 순수한 '함수 시그니처' (매개변수, 반환 타입)만 정의할 때 사용한다.
 */

/**
 * 호출 시그니처 ({() => type; ...})
 * '함수 시그니처' 와 함께 '추가 프로퍼티/메서드'를 정의하여,
 * 함수이면서 동시에 다른 멤버를 가진 '하이브리드 타입'을 만들 때 사용한다.
 */
