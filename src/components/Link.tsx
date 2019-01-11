import React, { useCallback } from "react";
import { History } from "history";

const Link = (props: { history: History; href: string }) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      props.history.push(props.href);
    },
    [props.history, props.href]
  );
  return <a onClick={handleClick} {...props} />;
};

export { Link };
