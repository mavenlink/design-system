const allSvgsContext = require.context('../svgs/', true, /svg$/);

const getIconsFromContext = (context) => {
  return context.keys().reduce((acc, file) => {
    const icon = context(file).default;
    const iconName = file.slice(2, -4); // strip './' and '.svg'
    acc[iconName] = icon;
    return acc;
  }, {});
};

export default function frontendSvgs() {
  return getIconsFromContext(allSvgsContext);
}
