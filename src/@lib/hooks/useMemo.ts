/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

// useMemo 훅은 계산 비용이 높은 값을 메모이제이션합니다.
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요! 이게 제일 중요합니다.

  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const previousRef = useRef<{ deps: DependencyList; value: T } | null>(null);
  const previous = previousRef.current;
  const current = _deps;
  // 2. 현재 의존성과 이전 의존성 비교
  // shallowEquals를 사용하여 비교합니다.
  const isEqual = previous && _equals(previous.deps, current);
  // 3. 의존성이 같다면 이전 결과 반환
  if (isEqual) {
    return previous.value;
  }
  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  // factory 함수를 실행하여 새로운 값을 생성합니다.
  const value = factory();
  // 이전 ref에 새로운 의존성과 값을 저장합니다.
  previousRef.current = { deps: current, value };
  // 4. 메모이제이션된 값 반환

  // 구현을 완성해주세요.
  return factory();
}
