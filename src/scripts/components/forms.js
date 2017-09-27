// @flow
import React from 'react';

type RenderInputType = {
  input: Object,
  meta: Object
}
type DropDownType = {
  input: Object,
  elements: Array<any>,
  defaultValue: any,
  defaultText: string,
  meta: Object
};

type RenderSelectOptionsType = {
  id: number,
  name: string
};

export const RenderInput = ({ input, meta, ...field }: RenderInputType) =>
  <input
    { ...field }
    { ...input }
    className={ meta.error && meta.touched && "with-error" } />

export class DropDownSelect extends React.Component<DropDownType> {
  renderSelectOptions = ({ id, name }: RenderSelectOptionsType) => (
    <option key={ id } value={ id }>{ name }</option>
  )

  render() {
    const { input, elements, defaultValue, defaultText, meta } = this.props;
    return (
      <div>
        {
          meta.error && meta.touched &&
          <span className="error">{ meta.error }</span>
        }
        <select { ...input } className={ meta.error && meta.touched && "with-error" }>
          {
            typeof defaultValue !== 'undefined' &&
            <option value={ defaultValue }>{ defaultText }</option>
          }
          {
            elements.map(this.renderSelectOptions)
          }
        </select>
      </div>
    );
  }
}
