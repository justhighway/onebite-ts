/**
 * ✅ 타입 좁히기 (Type Narrowing)
 *
 * 유니언 타입처럼 넓은 타입에서 조건문 등을 통해
 * 특정 조건 내에서 더 구체적인(좁은) 타입으로 판별하는 과정
 */

/**
 * 💡 타입 좁히기는 어떻게 동작하는가?
 *
 * TypeScript는 특정한 **타입 가드 패턴**을 인식해서
 * 조건문 내의 타입을 자동으로 좁혀줌
 *
 * ✅ 대표적인 타입 가드 예시:
 *  - typeof (typeof params === "type")
 *  - instanceof (instance instanceof Constructor)
 *  - in 연산자 (property in type)
 *  - 사용자 정의 타입 가드 (is 키워드)
 */

/* ---------------------------------- */

// 📌 Type Guard 예시: typeof 연산자
type Params1 = number | string;

function func1(params: Params1) {
  params.toFixed(); // ❌ Error! string일 수도 있기 때문
  params.toUpperCase(); // ❌ Error! number일 수도 있기 때문

  // ✅ 특정 조건 안에서만 타입을 좁힐 수 있음
  // => 타입스크립트가 '타입 가드'라고 판단하는 문법을 사용했을 때 자동 추론됨

  if (typeof params === "number") {
    params.toFixed(); // ✅ 타입이 number로 좁혀짐
  } else if (typeof params === "string") {
    params.toUpperCase(); // ✅ 타입이 string으로 좁혀짐
  }
}

/* ---------------------------------- */

// 📌 Date 추가 예시
type Params2 = number | string | Date;

function func2(params: Params2) {
  if (typeof params === "object") {
    params.getTime(); // Date로 잘 추론됨
  }
}

// 📌 null 타입 포함된 예시
type Params3 = number | string | Date | null;

function func3(params: Params3) {
  // typeof null === 'object' 이기 때문에 위험
  if (typeof params === "object") {
    params.getTime(); // ❌ null일 가능성이 남아 있음
  }
}

// ✅ 안전한 방식: instanceof 사용
function func4(params: Params3) {
  if (params instanceof Date) {
    params.getTime(); // ✅ 안전하게 Date로 좁혀짐
  }
}

/* ---------------------------------- */

// ❌ instanceof는 일반 객체 타입에는 사용할 수 없음
type Person = {
  name: string;
  age: number;
};

type Params4 = number | string | Date | null | Person;

function func5(params: Params4) {
  // ❌ 오류: Person은 타입이지 생성자 함수가 아님
  if (params instanceof Person) {
    console.log(params);
  }
}

// ✅ 일반 객체 타입을 좁힐 땐 'in' 연산자를 사용
function func6(params: Params4) {
  if (typeof params === "number") {
    params.toFixed();
  } else if (typeof params === "string") {
    params.toUpperCase();
  } else if (params instanceof Date) {
    params.getTime();
  }
  // ✅ null 체크 + in 연산자로 타입 좁히기
  else if (params && "age" in params) {
    console.log(params); // ✅ Person으로 자동 추론됨
  }
}

/* ---------------------------------- */

// ❓ 다음 예제는 왜 오류가 나는가?
type Params5 = number | string | Date | null | Person;
function func7(params: Params5) {
  // ❌ 오류 발생
  if (params && "age" in params) {
    console.log(params);
  }
}

/**
 * 📌 오류 설명
 * 'in' 연산자의 오른쪽 피연산자는 반드시 object 타입이어야 함.
 *
 * 그런데 위 코드에서 `params`의 타입은 다음과 같은 Union 타입임:
 * → string | number | Date | Person | null
 *
 * 이 중 `string`, `number`, `null`은 object 타입이 아니므로
 * 'in' 연산자를 사용할 수 없어 컴파일 에러 발생.
 *
 * ✅ 해결 방법
 * 'in' 연산자를 사용하기 전에 `typeof`, `instanceof` 등을 사용해
 * 타입을 먼저 좁혀서(object인지 확인한 뒤) 사용해야 함.
 *
 * 예시:
 * if (typeof params === 'object' && params !== null && 'name' in params) { ... }
 */
