const ListItem = ({ value }) => {
  return <li>{value}</li>;
};
const List = ({ values }) => {
  const listItems = values.map((each) => (
    <ListItem key={each.toString()} value={each} />
  ));
  return <ul>{listItems}</ul>;
};

export { List, ListItem };
