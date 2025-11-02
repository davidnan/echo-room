import {minidenticon } from 'minidenticons';
import React from "react";
const { useMemo } = React;

export const MinidenticonImg = ({ username, saturation, lightness, ...props }) => {
  const svgURI = useMemo(
      () =>
          "data:image/svg+xml;utf8," +
          encodeURIComponent(minidenticon("cafdaew" + username, saturation, lightness)),
      [username, saturation, lightness]
  );
  return <img src={svgURI} alt={username} {...props} />;
};
