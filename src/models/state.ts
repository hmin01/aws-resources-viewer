import { atom, selector } from 'recoil';

/** [Atom] Role arn 상태 변수 */
const roleAtom = atom<string | undefined>({
  key: 'roleAtom',
  default: undefined
});
/** [Atom] 페이지 전환 상태 변수 */
const transformAtom = atom<boolean>({
  key: 'transformAtom',
  default: false
});

/** [Selector] Role arn 읽기/쓰기를 위한 순수 함수 */
export const roleSelector = selector<string | undefined>({
  key: 'roleSelector',
  get: ({ get }) => get(roleAtom),
  set: ({ set }, value) => set(roleAtom, value)
});
/** [Selector] 페이지 변환을 위한 순수 함수 */
export const transformSelector = selector<boolean>({
  key: 'transformSelector',
  get: ({ get }) => get(transformAtom),
  set: ({ set }, value) => set(transformAtom, value)
});