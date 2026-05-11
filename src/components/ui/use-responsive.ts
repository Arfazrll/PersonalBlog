import { useEffect, useState } from "react";

const BREAKPOINTS = {
  SM: 0,
  MD: 600,
  LG: 960,
  XL: 1200
};

export const useResponsive = (styles: any) => {
  const [responsiveStyles, setResponsiveStyles] = useState<any>(
    typeof styles === "object" ? styles.sm || styles.md || styles.lg || styles.xl : styles
  );

  useEffect(() => {
    const getResponsive = (styles: any) => {
      let current;
      if (typeof styles === "object") {
        if (styles.sm && window.innerWidth >= BREAKPOINTS.SM) {
          current = styles.sm;
        }
        if (styles.md && window.innerWidth >= BREAKPOINTS.MD) {
          current = styles.md;
        }
        if (styles.lg && window.innerWidth >= BREAKPOINTS.LG) {
          current = styles.lg;
        }
        if (styles.xl && window.innerWidth >= BREAKPOINTS.XL) {
          current = styles.xl;
        }
      } else {
        current = styles;
      }
      return current;
    };

    const listener = () => {
      setResponsiveStyles(getResponsive(styles));
    };

    listener();

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [JSON.stringify(styles)]);

  return responsiveStyles;
};
