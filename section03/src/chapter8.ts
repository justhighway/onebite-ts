/**
 * ✅ 서로소 유니온 타입 (Discriminated Union / Tagged Union)
 *
 * 특정 프로퍼티(`tag`와 같은 리터럴 값)를 기준으로
 * 여러 타입 중 어떤 타입인지 명확하게 구분할 수 있도록 만든 유니온 타입이다.
 * 타입을 좁혀가며 정확하게 조건 분기할 수 있다.
 *
 * ✅ 특징:
 * - 타입 간 교집합이 없도록 구성된다 (즉, '서로소' 관계)
 * - 공통 프로퍼티 + 구분자(tag)를 통해 Type Guard를 명확하게 적용할 수 있다
 * - 주로 switch-case와 함께 사용되며, 타입 추론이 정확하게 작동한다
 * - 새로운 타입이 추가되면 `never`를 통해 누락 여부를 확인할 수 있다
 */

/* ---------------------------------------------- */

// ❌ in 연산자를 이용한 타입 분기 방식
// 코드만 봐서는 직관적으로 알기가 어려움

interface Admin {
  name: string;
  count: number;
}

interface Member {
  name: string;
  point: number;
}

interface Guest {
  name: string;
  visit: number;
}

type User1 = Admin | Member | Guest;

function login(user: User1) {
  // Type Guard: in 연산자 사용
  if ("count" in user) {
    console.log(`${user.name}님 지금까지 ${user.count}번 강퇴했습니다.`);
  } else if ("point" in user) {
    console.log(`${user.name}님 지금까지 ${user.point} 포인트 쌓았습니다.`);
  } else {
    console.log(`${user.name}님 지금까지 ${user.visit}번 방문했습니다.`);
  }
}

/* ---------------------------------------------- */

// ✅ tag 프로퍼티를 추가한 Discriminated Union 방식
// in 연산자를 사용하는 것보다 훨씬 직관적임

interface Admin {
  tag: "ADMIN";
  name: string;
  count: number;
}

interface Member {
  tag: "MEMBER";
  name: string;
  point: number;
}

interface Guest {
  tag: "GUEST";
  name: string;
  visit: number;
}

type User2 = Admin | Member | Guest;

function func2(user: User2) {
  switch (user.tag) {
    case "ADMIN":
      console.log(`${user.name}님 지금까지 ${user.count}번 강퇴했습니다.`);
      break;
    case "MEMBER":
      console.log(`${user.name}님 지금까지 ${user.point} 포인트 쌓았습니다.`);
      break;
    case "GUEST":
      console.log(`${user.name}님 지금까지 ${user.visit}번 방문했습니다.`);
      break;
    default:
      const _exhaustive: never = user; // 타입 누락 방지용 exhaustive check
      break;
  }
}

func2({ tag: "ADMIN", name: "관리자", count: 10 });
func2({ tag: "MEMBER", name: "회원", point: 10 });
func2({ tag: "GUEST", name: "게스트", visit: 10 });

/* ---------------------------------------------- */

// 📌 비동기 작업 상태를 표현할 때도 Discriminated Union을 쓰면 명확하다

// ❌ 안 좋은 예: 옵셔널 프로퍼티로 상태별 데이터를 구분
type AsyncTask1 = {
  state: "LOADING" | "ERROR" | "SUCCESS"; // 서로소 유니온처럼 보이지만...
  error?: {
    message: string;
  };
  response?: {
    data: string;
  };
};

const loading: AsyncTask1 = {
  state: "LOADING",
};

const error: AsyncTask1 = {
  state: "ERROR",
  error: {
    message: "에러가 발생했습니다.",
  },
};

const success: AsyncTask1 = {
  state: "SUCCESS",
  response: {
    data: "데이터",
  },
};

// 옵셔널 체이닝을 강제하게 됨
function processResult1(task: AsyncTask1) {
  switch (task.state) {
    case "LOADING":
      console.log("로딩중");
      break;
    case "ERROR":
      console.log(`에러 발생: ${task.error?.message}`);
      break;
    case "SUCCESS":
      console.log(`응답 성공: ${task.response?.data}`);
      break;
  }
}

/* ---------------------------------------------- */

// ✅ 개선된 예: 상태별로 타입을 분리하여 유니온 구성

type LoadingTask = {
  state: "LOADING";
};

type ErrorTask = {
  state: "ERROR";
  error: {
    message: string;
  };
};

type SuccessTask = {
  state: "SUCCESS";
  response: {
    data: string;
  };
};

type AsyncTask2 = LoadingTask | ErrorTask | SuccessTask;

function processResult2(task: AsyncTask2) {
  switch (task.state) {
    case "LOADING":
      console.log("로딩중");
      break;
    case "ERROR":
      console.log(`에러 발생: ${task.error.message}`); // 타입 좁혀짐
      break;
    case "SUCCESS":
      console.log(`응답 성공: ${task.response.data}`); // 타입 좁혀짐
      break;
  }
}

/**
 * ✅ 요약
 * - 옵셔널 필드를 사용하는 대신, 상태마다 타입을 쪼개어 유니온 타입을 구성하자
 * - 이 방식이 더 안전하고, 타입 추론도 잘 작동하며, 가독성도 좋다
 */
