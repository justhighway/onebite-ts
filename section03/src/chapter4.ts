// ✅ 대수 타입 (Algebraic Types)
// 👉 여러 개의 타입을 조합해 새롭게 만드는 타입

/* ------------------------ */

// 1️⃣ Union Type (합집합 타입) — `|` 연산자 사용

// 여러 타입 중 하나 이상의 타입일 수 있음
let a: string | number | boolean;
a = 1;
a = "hello";
a = true;

// 배열 내 요소가 각각 string, number, boolean 중 하나일 수 있음
let arr: (string | number | boolean)[] = [1, "hello", true];

// 객체 유니온 타입 예시
type Dog = {
  name: string;
  color: string;
};

type Person = {
  name: string;
  language: string;
};

type Union1 = Dog | Person;

// 각 타입 중 하나의 구조를 따르거나, 둘 다 포함할 수도 있음
let union1: Union1 = {
  name: "돌돌이",
  color: "white",
};

let union2: Union1 = {
  name: "홍길동",
  language: "Korean",
};

// 둘 다 포함한 형태도 가능
let union3: Union1 = {
  name: "복합",
  color: "black",
  language: "English",
};

// ❌ 이건 오류 — 둘 중 어느 타입도 만족하지 않음 (name만 존재)
let unionInvalid: Union1 = {
  name: "불완전한 객체",
};

/**💡 정리:
 * Union 타입은 "둘 중 하나" 또는 "둘 다"를 포함하는 구조도 가능
 * 단, 어느 하나의 타입도 완전히 만족하지 않으면 오류
 */

/* ------------------------ */

// 2️⃣ Intersection Type (교차 타입) — `&` 연산자 사용

// 💡 기본 타입 간 교차는 공통점이 없으므로 `never` 타입이 됨
let variable: number & string; // 타입: never

// 🔶 Intersection은 주로 객체 타입에서 사용
type Intersection = Dog & Person;

// 두 타입의 **모든 프로퍼티**를 포함해야 함
let intersection1: Intersection = {
  name: "겸직견",
  color: "brown",
  language: "일본어",
};

/** 💡 정리:
 * Intersection 타입은 두 타입의 **요구사항을 모두 만족**해야 함
 * 수학적 교집합처럼 공통된 부분만 취하는 것이 아니라,
 * 두 타입을 **병합(Merge)**한 형태로 동작
 */
