import { atom, selector } from 'recoil';

/** [Atom] Role arn 상태 변수 */
const roleAtom = atom<string | undefined>({
  key: 'roleAtom',
  default: undefined
});
/** [Atom] 스캔 결과 파일 이름 */
const scanFileAtom = atom<string | undefined>({
  key: 'scanFileAtom',
  default: undefined
});

/** [Selector] Role arn 읽기/쓰기를 위한 순수 함수 */
export const roleSelector = selector<string | undefined>({
  key: 'roleSelector',
  get: ({ get }) => get(roleAtom),
  set: ({ set }, value) => set(roleAtom, value)
});
/** [Selector] 스캔 파일을 위한 순수 함수 */
export const scanFileSelector = selector<string | undefined>({
  key: 'scanFileSelector',
  get: ({ get }) => get(scanFileAtom),
  set: ({ set }, value) => set(scanFileAtom, value)
});