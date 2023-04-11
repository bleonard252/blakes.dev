import { Component, Ref, h } from "htm/preact";

const baseClasses = "rounded-md p-2 inline-block items-center transition-colors";
const flexClasses = " flex flex-row gap-2";
const primaryFilledClasses = " bg-primary-3 hover:bg-primary-5 text-onprimary-3 enabled:active:bg-primary-2 disabled:bg-primary-2/50 disabled:text-onprimary-2/50";
const primaryUnfilledClasses = " text-primary-4 dark:text-primary-3 enabled:hover:text-primary-2 enabled:hover:bg-primary-2/25 enabled:active:bg-primary-2/10 disabled:text-primary-2/50";
const secondaryUnfilledClasses = " bg-transparent text-onscheme-2 enabled:hover:bg-onscheme-2/25 enabled:active:bg-onscheme-2/10 disabled:text-onscheme-2/50";

export class Button extends Component<h.JSX.HTMLAttributes & {
  children?: Array<any>;
  ref?: Ref<any>;
  class?: string;
  primary?: boolean;
  filled?: boolean;
  static?: boolean;
  flex?: boolean
}> {

  primaryFilledClasses = primaryFilledClasses;
  primaryUnfilledClasses = primaryUnfilledClasses;
  secondaryUnfilledClasses = secondaryUnfilledClasses;

  componentWillMount(): void {
    if (this.props.static) {
      //console.log("This is static.");
      this.primaryFilledClasses = primaryFilledClasses.replace(/(?:^|\s)(?:hover|active)\:\S*/g, "");
      this.primaryUnfilledClasses = primaryUnfilledClasses.replace(/(?:^|\s)(?:hover|active)\:\S*/g, "");
      this.secondaryUnfilledClasses = secondaryUnfilledClasses.replace(/(?:^|\s)(?:hover|active)\:\S*/g, "");
    }
  }

  render() {
    return h(this.props.href ? 'a' : 'button', {
      ...this.props,
      class: baseClasses + (this.props.flex ? flexClasses : "") + (this.props.primary ? this.props.filled ? this.primaryFilledClasses : this.primaryUnfilledClasses : this.secondaryUnfilledClasses)+" "+(this.props.class??""),
    }, this.props.children);
  }
}