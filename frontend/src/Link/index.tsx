import React from "react";
import type { RelativeRoutingType, To } from "react-router";
import {
  useHref,
  useLocation,
  useNavigate,
  useResolvedPath,
  createPath,
  UNSAFE_NavigationContext as NavigationContext,
} from "react-router";
import { stripBasename } from "@remix-run/router";
const isBrowser =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined";

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  reloadDocument?: boolean;
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
  to: To;
  unstable_viewTransition?: boolean;
}
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkWithRef(
    {
      onClick,
      relative,
      reloadDocument,
      replace,
      state,
      target,
      to,
      preventScrollReset,
      ...rest
    },
    ref,
  ) {
    // check if this is existing
    // globalThis.props[window.location.pathname]
    //
    let { basename } = React.useContext(NavigationContext);

    // Rendered into <a href> for absolute URLs
    let absoluteHref;
    let isExternal = false;

    if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
      // Render the absolute href server- and client-side
      absoluteHref = to;

      // Only check for external origins client-side
      if (isBrowser) {
        try {
          let currentUrl = new URL(window.location.href);
          let targetUrl = to.startsWith("//")
            ? new URL(currentUrl.protocol + to)
            : new URL(to);
          let path = stripBasename(targetUrl.pathname, basename);

          if (targetUrl.origin === currentUrl.origin && path != null) {
            // Strip the protocol/origin/basename for same-origin absolute URLs
            to = path + targetUrl.search + targetUrl.hash;
          } else {
            isExternal = true;
          }
        } catch (e) {
          // We can't do external URL detection without a valid URL
          return null;
        }
      }
    }

    // Rendered into <a href> for relative URLs
    let href = useHref(to, { relative });

    let internalOnClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
      preventScrollReset,
      relative,
    });
    function handleClick(
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }

    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        {...rest}
        href={absoluteHref || href}
        onClick={isExternal || reloadDocument ? onClick : handleClick}
        ref={ref}
        target={target}
      />
    );
  },
);

let ppProps: any = {};
export function useLinkClickHandler<E extends Element = HTMLAnchorElement>(
  to: To,
  {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    unstable_viewTransition,
  }: {
    target?: React.HTMLAttributeAnchorTarget;
    replace?: boolean;
    state?: any;
    preventScrollReset?: boolean;
    relative?: RelativeRoutingType;
    unstable_viewTransition?: boolean;
  } = {},
): (event: React.MouseEvent<E, MouseEvent>) => void {
  // check if props exist for this page
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, { relative });

  return React.useCallback(
    (event: React.MouseEvent<E, MouseEvent>) => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault();

        // If the URL hasn't changed, a regular <a> will do a replace instead of
        // a push, so do the same here unless the replace prop is explicitly set
        let replace =
          replaceProp !== undefined
            ? replaceProp
            : createPath(location) === createPath(path);
        // fetch the page props
        fetch("/navigate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path: to }),
        })
          .then((res) => {
            if (res.redirected) {
              window.location.href = res.url;
              navigate(res.url);
              return;
            }
            return res.json();
          })
          .then((data: any) => {
            // change title only client side
            if (window.document) {
              window.document.title = data.title;
            }
            ppProps = {
              ...ppProps,
              ...data.props[to],
            };

            props = ppProps;
            navigate(to, {
              replace,
              state,
              preventScrollReset,
              relative,
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    [
      location,
      navigate,
      path,
      replaceProp,
      state,
      target,
      to,
      preventScrollReset,
      relative,
      unstable_viewTransition,
    ],
  );
}
type LimitedMouseEvent = Pick<
  MouseEvent,
  "button" | "metaKey" | "altKey" | "ctrlKey" | "shiftKey"
>;
export function shouldProcessLinkClick(
  event: LimitedMouseEvent,
  target?: string,
) {
  return (
    event.button === 0 && // Ignore everything but left clicks
    (!target || target === "_self") && // Let browser handle "target=_blank" etc.
    !isModifiedEvent(event) // Ignore clicks with modifier keys
  );
}
function isModifiedEvent(event: LimitedMouseEvent) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
