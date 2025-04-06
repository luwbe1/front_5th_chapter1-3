/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성

  // 2. 메모이제이션된 컴포넌트 생성

  // 3. equals 함수를 사용하여 props 비교

  // 4. props가 변경된 경우에만 새로운 렌더링 수행

  return Component;
}
