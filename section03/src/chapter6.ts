// ✅ Type Assertion (타입 단언)

/**
 * 타입 단언은 개발자가 타입스크립트에게
 * "내가 이 타입을 확실히 알고 있다"고 알려주는 방법이다
 * 컴파일러가 타입을 추론하지 못하거나,
 * 추론한 타입이 너무 넓어서 개발자가 더 좁은 타입으로 "단언"할 때 사용한다.
 */

type Person = {
  name: string;
  age: number;
};

// ❌ 이 코드는 오류 발생
// 구조적 타입 시스템에서 Person 타입을 완전히 만족하지 않음
let person1: Person = {}; // Property 'name' is missing
person1.name = "lee"; // name 프로퍼티가 없다고 판단됨
person1.age = 20;

// ❌ 타입 추론에서도 오류 발생
// 프로퍼티를 가지지 않는 단순 객체 타입(any와 동일)으로 추론됨
let person2 = {};
person2.name = "lee";
person2.age = 20;

// ✅ 타입 단언을 통해 해결 (Person 타입 강제 적용)
let person3 = {} as Person;
person3.name = "lee";
person3.age = 20;

// ⚠️ 주의: 타입 단언은 런타임에서 값을 바꾸는 게 아니라 컴파일러를 속이는 것이므로,
// `person`이 실제로 `name`, `age`를 포함하지 않으면 런타임 오류가 발생할 수 있음

/* ----------------------------------------- */

// 초과 프로퍼티 검사 타입 단언으로 우회하기

type Dog = {
  name: string;
  color: string;
};

// ❌ 초과 프로퍼티 검사 발생 (Excess Property Check)
// 객체 리터럴로 초기화를 하면 초과 프로퍼티 검사가 발동된다.
const dog1: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도", // 오류 발생: 'breed' does not exist in type 'Dog'
};

// ✅ 타입 단언으로 우회
const dog2 = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
} as Dog;

// ⚠️ 하지만 타입 단언보다는 아래 방식처럼 중간 변수에 할당하는 것이 더 안전한 방법
const rawDog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
};
const dog: Dog = rawDog;

/* ----------------------------------------- */

// ✅ 타입 단언의 규칙

/** A as B 형태에서
 * A가 B의 **상위 타입 (supertype)** 이거나
 * A가 B의 **하위 타입 (subtype)** 이면 단언이 허용됨
 *
 * 즉, A와 B가 서로 **호환 가능한 타입**이어야 함
 */

// 예시: unknown은 모든 타입의 상위 타입이므로 가능
let num1 = 10 as unknown;

// 예시: never는 모든 타입의 하위 타입이므로 가능 (그러나 의미 없음)
let num2 = 10 as never;

/* ❌ 완전히 다른 타입 간에는 단언 불가능 */
let num3 = 10 as string;

// ✅ 다중 단언 (double assertion)
// 런타임에 아무런 타입 체크 없이 통과되므로, 신뢰성 매우 낮음 (가급적 사용 X)
let num4 = 10 as unknown as string;

/* ----------------------------------------- */

/** ✅ const 단언 - `as const`
 * literal + readonly로 만들어주는 것
 */

let num5 = 10; // 타입: number
let num6 = 10 as const; // 타입: 10 (리터럴 타입)

// ✅ 객체에도 사용 가능
/**
 *  프로퍼티가 모두 readonly가 되고,
 * 값들도 리터럴 타입으로 고정됨
 */
let cat = {
  name: "야옹이",
  color: "yellow",
} as const;

// ✅ 배열에도 사용 가능
const tuple = [1, 2, 3] as const; // 타입: readonly [1, 2, 3]

/* ----------------------------------------- */

// ✅ Non-null 단언 연산자 (!)

/**
 * 옵셔널 체이닝에서는 결과가 `undefined`일 수 있기 때문에 타입 에러가 날 수 있음
 * `!` 연산자를 쓰면 해당 값이 `null`이나 `undefined`가 아님을 확신한다는 의미
 */

type Post = {
  title: string;
  author?: string; // optional
};

let post: Post = {
  title: "게시글 1",
  author: "이정환",
};

// ❌ 오류 발생
// const len: number = post.author?.length; // type: number | undefined

// ✅ Non-null 단언
const len: number = post.author!.length;

// ⚠️ 실제로 author가 undefined일 경우, 런타임에서 에러 발생
// 반드시 값이 존재하는지 확실한 경우에만 사용

/* ----------------------------------------- */

/**
 * ✅ 정리
 *
 * - 타입 단언은 타입스크립트 컴파일러를 "속이는" 문법입니다.
 * - 실제 타입이 바뀌는 것은 아니므로, **확신할 수 있는 상황에서만 사용**해야 합니다.
 * - 되도록이면 타입 추론과 명시적 타입 지정으로 충분히 커버하고,
 *   타입 단언은 마지막 수단으로 사용하는 것이 좋습니다.
 */
