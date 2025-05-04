// 객체 간 타입 호환성
// 객체에서는 조건(프로퍼티)가 더 적은 타입이 super 타입이 됨

// super type
type Animal = {
  name: string;
  color: string;
};

// sub type
type Dog = {
  name: string;
  color: string;
  breed: string;
};

let animal: Animal = {
  name: "기린",
  color: "yellow",
};

let dog: Dog = {
  name: "돌돌이",
  color: "white",
  breed: "진도",
};

// up cast
animal = dog;

// down cast
// dog = animal;

/* ------------------------ */

// 초과 프로퍼티 검사
