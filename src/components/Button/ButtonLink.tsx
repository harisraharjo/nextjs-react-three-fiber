import Link, { LinkProps } from "next/link";
import { Button, type ButtonProps } from "./Button";

type Props = Omit<LinkProps, "passHref"> & ButtonProps;
export const ButtonLink = ({
  children,
  replace,
  href,
  as,
  scroll,
  shallow,
  prefetch,
  locale,
  ...props
}: Props) => (
  <Link
    replace={replace}
    href={href}
    as={as}
    scroll={scroll}
    shallow={shallow}
    prefetch={prefetch}
    locale={locale}
    passHref
  >
    <Button {...props}>{children}</Button>
  </Link>
);
