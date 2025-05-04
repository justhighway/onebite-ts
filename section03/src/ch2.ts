// 타입 호환 (타입 계층도 기반)

// unknown: 모든 타입의 super type

function unknownExam() {
  // up casting
  let a: unknown = 1;
  let b: unknown = "hello";
  let c: unknown = true;
  let d: unknown = null;
  let e: unknown = undefined;

  // down casting (안됨)
  let unknownVar: unknown;
  // let num: number = unknownVar;
  // let str: string = unknownVar;
  // let bool: boolean = unknownVar;
}

/* -------------------- */

// never: 모든 타입의 sub type (공집합)

function neverExam() {
  function neverFunc(): never {
    while (true) {}
  }

  // up casting
  let num: number = neverFunc();
  let str: string = neverFunc();
  let bool: boolean = neverFunc();

  // down casting
  // let never1: never = 10;
  // let never2: never = "string";
  // let never3: never = true;
}

/* -------------------- */

// void
// void 타입은 undefined 타입의 super 타입이다
function voidExam() {
  function voidFunc(): void {
    console.log("hi");
  }

  let voidVar: void = undefined;
}

/* -------------------- */

// any (치트키)
// 타입 계층도를 완전히 무시함 (never 제외) - 웬만해서 사용 안 하길 권장

function anyExam() {
  let unknownVar: unknown;
  let anyVar: any;
  let undefinedVar: undefined;
  let voidVar: void;
  let neverVar: never;

  // 자신한테 down casting 되어도 오류 없음
  anyVar = unknownVar;

  // 자신이 down casting 되어도 오류 없음
  undefinedVar = anyVar;
  voidVar = anyVar;

  // never는 down casting 불가
  // neverVar = anyVar;
}
