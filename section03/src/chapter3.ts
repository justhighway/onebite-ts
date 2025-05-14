// ✅ 객체 간 타입 호환성
// 👉 어떤 객체 타입을 다른 객체 타입으로 취급해도 되는가?

// 📌 슈퍼타입 (super type)
// 👉 객체에서는 프로퍼티가 더 적은 타입이 슈퍼타입이 됨
type Animal = {
  name: string;
  color: string;
};

// 📌 서브타입 (sub type)
// 👉 Dog 타입은 Animal의 모든 프로퍼티를 포함하므로, Animal의 서브타입이 됨
type Dog = {
  name: string;
  color: string;
  breed: string; // 더 많은 정보를 갖고 있으므로 더 구체적인 타입
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

// ✅ 업캐스팅 (Up-casting): 서브타입 → 슈퍼타입
animal = dog; // OK

// ❌ 다운캐스팅 (Down-casting): 슈퍼타입 → 서브타입
dog = animal; // 오류 발생
