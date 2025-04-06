const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && typeof obj === "object";
};

// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 객체의 키 개수가 다른 경우 처리
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((item, index) => objB[index] === item);
  }

  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);

    const keysA = new Set(entriesA.map(([key]) => key));
    const keysB = new Set(entriesB.map(([key]) => key));
    if (keysA.size !== keysB.size) {
      return false;
    }
    for (const key of keysA) {
      if (!keysB.has(key)) {
        return false;
      }
      if (!deepEquals(objA[key], objB[key])) {
        return false;
      }
    }
    // Check if all keys in objB are also in objA
    for (const key of keysB) {
      if (!keysA.has(key)) {
        return false;
      }
      if (!deepEquals(objB[key], objA[key])) {
        return false;
      }
    }

    return (
      entriesA.length === entriesB.length &&
      entriesA.every(([key, value]) => {
        return deepEquals(value, objB[key]);
      })
    );
  }
  return objA === objB;
}
