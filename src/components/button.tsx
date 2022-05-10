import { Attributes, Component, ComponentChildren, Ref, h } from "preact";

const baseClasses = "rounded-md p-2 flex flex-row gap-2 items-center transition-colors";
const primaryFilledClasses = " bg-primary-3 hover:bg-primary-5 text-onprimary-3 active:bg-primary-2";
const primaryUnfilledClasses = " text-primary-4 dark:text-primary-3 hover:text-primary-2 hover:bg-primary-2/25 active:bg-primary-2/10";
const secondaryUnfilledClasses = " bg-transparent text-onscheme-2 hover:bg-onscheme-2/25 active:bg-onscheme-2/10";

export class Button extends Component<Readonly<Attributes & h.JSX.HTMLAttributes & {
  children?: ComponentChildren;
  ref?: Ref<any>;
  class?: string;
  primary?: boolean;
  filled?: boolean;
  static?: boolean;
}>> {

  baseClasses = baseClasses;
  primaryFilledClasses = primaryFilledClasses;
  primaryUnfilledClasses = primaryUnfilledClasses;
  secondaryUnfilledClasses = secondaryUnfilledClasses;

  componentWillMount(): void {
    if (this.props.static) {
      console.log("This is static.");
      this.baseClasses = baseClasses.replace(/(?:^|\s)(?:hover|active)\:\S*/g, "") + " cursor-[inherit]";
      this.primaryFilledClasses = primaryFilledClasses.replace(/(?:^|\s)(?:hover|active)\:\S*/g, "");
      this.primaryUnfilledClasses = primaryUnfilledClasses.replace(/(?:^|\s)(?:hover|active)\:\S*/g, "");
      this.secondaryUnfilledClasses = secondaryUnfilledClasses.replace(/(?:^|\s)(?:hover|active)\:\S*/g, "");
    }
  }

  render() {
    return h(this.props.href ? 'a' : 'button', {
      ...this.props,
      class: this.baseClasses + (this.props.primary ? this.props.filled ? this.primaryFilledClasses : this.primaryUnfilledClasses : this.secondaryUnfilledClasses)+" "+this.props.class,
    }, this.props.children);
  }
}