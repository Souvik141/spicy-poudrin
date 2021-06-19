const Navigation = ({ history, match }) => {
  const tabs = [{
    label: "cover",
    value: "cover",
    ref: "/nav/cover"
  }, {
    label: "deals",
    value: "deal",
    ref: "/nav/deal"
  }, {
    label: "assets",
    value: "asset",
    ref: "/nav/asset"
  }, {
    label: "liabilities",
    value: "liability",
    ref: "/nav/liability"
  }, {
    label: "reserves",
    value: "reserve",
    ref: "/nav/reserve"
  }];
  return (
    <div className="navigation">
      <ul>
        {tabs.map(function (each) {
          return (
            <li key={each}>
              <input
                className={match.params.scene === each.value ? "active" : "inactive"}
                type="button"
                value={each.label}
                onClick={() => history.push(each.ref)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navigation;
