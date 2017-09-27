// @flow
type GenSelectorsType = {
  selectors: {},
  stateKey: string,
  excluded?: Array<string>
};

export const arrayReplace = (list: Array<mixed>, element:any, newElement:any): Array<mixed> => {
  return list.map(e => e === element ? newElement: e);
}

export const genSelector = (selector: Function, stateKey: string) =>
  (state: Object, ...args: Array<any>) =>
    selector(state[stateKey], ...args);

export const genSelectors = ({ selectors, stateKey, excluded = [] }: GenSelectorsType ) => {
  let wSelectors = {};
  Object.keys(selectors).filter(selectorName =>
    selectorName !== 'default' && !excluded.includes(selectorName)).forEach(selectorName => {
      wSelectors[selectorName] = (state, ...args) =>
        selectors[selectorName](state[stateKey], ...args);
    }
  );

  return wSelectors;
}

export const onEnter = (fn: Function, nfn: Function = _ => _): Function => (e: any) => {
  if (e.key === 'Enter') {
    return fn(e);
  }

  return nfn(e);
}
