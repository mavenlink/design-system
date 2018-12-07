export default function labelPropType(props) {
  if (!props['aria-labelledby'] && !props.id) {
    return new Error("One of props 'aria-labelledby' or 'id' must be provided.");
  }
  return null;
}
