// 함수 타입 정의

/**
 * 타입스크립트 함수를 설명하는 가장 좋은 방법?
 * -> 어떤 타입의 매개변수를 받고, 어떤 타입의 결과 값을 반환하는지 표현하기
 */

/* ------------------------------------------------- */

/**
 * 매개변수 a, b를 각각 number 타입으로 정의하면
 * 함수의 반환 값(a + b)도 자연스럽게 number 타입으로 추론된다
 * 명시적으로 함수 반환 값의 타입도 정의할 수 있다.
 */

// 함수 선언식
function add1(a: number, b: number) {
  return a + b;
}

// 화살표 함수
const add2 = (a: number, b: number) => a + b;

// 매개변수 기본값
/**
 * 초기화 한 기본 값에 따라 매개변수 타입이 추론된다.
 * 옵셔널 파라미터 (?)로 지정할 수도 있다.
 * 옵셔널 파라미터는 필수 매개변수보다 항상 뒤에 있어야 한다 (맨 뒤)
 */
function introduce1(name = "이정환", tall?: number) {
  console.log(`name: ${name}`);
  // tall은 undefined일 수 있기 때문 오류 발생
  console.log(`tall: ${tall + 10} `);
}

// tall은 옵셔널이기 때문에 생략 가능
introduce1("이정환");
// 옵셔널 파라미터의 타입은 number | undefined니까 undefined도 전달 가능해짐
introduce1("이정환", undefined);

// 타입 가드 적용한 버전
function introduce2(name = "이정환", tall?: number) {
  console.log(`name: ${name}`);
  // 옵셔널 파라미터는 타입 가드로 막아줘야 한다
  if (typeof tall === "number") {
    console.log(`tall: ${tall + 10} `);
  }
}

// 마찬가지로 tall은 옵셔널이기 때문에 생략 가능
introduce2("이정환");
// undefined도 전달 가능
introduce2("이정환", undefined);

/* ------------------------------------------------- */

// rest parameter의 타입
// 배열 또는 튜플 타입으로 정의

function getSum(...rest: number[]) {}
function getString(...rest: [string, string]) {}

getSum(1, 2, 3);
getString("hello", "world");
