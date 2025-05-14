// ✅ 기본 타입 간 호환성: 타입 계층도 기반 설명

// 📌 unknown: 모든 타입의 슈퍼타입 (Top Type)
// => 어떤 타입이든 unknown에 할당 가능 (업캐스팅만 허용)

function unknownExam() {
  // ✅ Up-casting (모든 타입은 unknown으로 할당 가능)
  let a: unknown = 1;
  let b: unknown = "hello";
  let c: unknown = true;
  let d: unknown = null;
  let e: unknown = undefined;

  // ❌ Down-casting: unknown을 다른 구체 타입에 바로 할당 불가
  let unknownVar: unknown;
  let num: number = unknownVar; // 오류
  let str: string = unknownVar; // 오류
  let bool: boolean = unknownVar; // 오류
}

/* ------------------------------------------- */

// 📌 never: 모든 타입의 서브타입 (Bottom Type, 공집합)
// => 어떤 타입으로도 업캐스팅 가능하지만,
// => 어떤 타입도 never로 다운캐스팅 불가능

function neverExam() {
  function neverFunc(): never {
    while (true) {} // 무한 루프: 절대 반환하지 않음
  }

  // ✅ Up-casting: never는 모든 타입에 할당 가능
  let num: number = neverFunc();
  let str: string = neverFunc();
  let bool: boolean = neverFunc();

  // ❌ Down-casting: 일반 타입을 never로 할당 불가능
  let never1: never = 10; // 오류
  let never2: never = "string"; // 오류
  let never3: never = true; // 오류
}

/* ------------------------------------------- */

// 📌 void: 반환값이 없음을 의미
// => void는 undefined의 슈퍼타입

function voidExam() {
  function voidFunc(): void {
    console.log("hi");
  }

  // ✅ undefined는 void에 할당 가능
  let voidVar: void = undefined;

  // ❌ void는 undefined에 할당 불가
  let undefinedVar: undefined = voidVar;
}

/* ------------------------------------------- */

// 📌 any: 타입 체커를 완전히 무시하는 특수 타입
// => 타입 계층 구조를 완전히 우회함 (타입 안전성 보장 안 됨)

function anyExam() {
  let unknownVar: unknown;
  let anyVar: any;
  let undefinedVar: undefined;
  let voidVar: void;
  let neverVar: never;

  // ✅ any ← unknown (가능)
  anyVar = unknownVar;

  // ✅ any → 다른 타입들 (가능) — 타입 검사 무시됨
  undefinedVar = anyVar;
  voidVar = anyVar;

  // ❌ never는 예외적으로 any로부터도 다운캐스팅 불가
  neverVar = anyVar; // 오류
}

/* ------------------------------------------- */
