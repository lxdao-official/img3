declare global {
  namespace JSX {
    interface IconifyIconAttributes extends HTMLAttributes {
      icon: string;
    }

    interface IntrinsicElements {
      ['iconify-icon']: IconifyIconAttributes;
    }
  }
}
