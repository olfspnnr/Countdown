import * as React from "react";

export interface modalProps {
  modalOption: modalOptions;
  getValues: (...values: any[]) => any;
}

export interface modalForm {
  label: string;
  inputType: string;
  returnValue: string;
}

export interface modalOptions {
  headLine: string;
  forms: modalForm[];
}

export const Modal = (props: modalProps) => {
  let currentValues = {} as any;
  const handleOnChange = (label: string, value: any) => {
    currentValues[label] = value;
  };
  const handleOnSubmit = () => {
    props.getValues(currentValues);
  };

  return (
    <div id="modal" className="flex absolute w-32 h-24 justify-center">
      {this.props.modalOption.forms.length > 0 && (
        <form onSubmit={() => handleOnSubmit()}>
          {this.props.modalOption.forms.map((form: modalForm) => {
            <div>
              <label htmlFor={form.label}>{form.label}</label>
              <input
                id={form.label}
                type={form.inputType}
                onChange={event => handleOnChange(form.label, event.target.value)}
              />
            </div>;
          })}
        </form>
      )}
      {this.props.modalOption.forms.length > 0 && <input type="submit" value="submit" />}
    </div>
  );
};
