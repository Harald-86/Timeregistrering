import PropTypes from "prop-types";

export default function Heading({ size = "1", title }) {
  const VariableHeading = `h${size}`;
  return <VariableHeading>{title}</VariableHeading>;
}

Heading.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
};
