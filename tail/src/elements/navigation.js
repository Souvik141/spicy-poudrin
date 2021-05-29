const Navigation = ({ history, match }) => {
  const tabs = ["cover", "transaction", "asset", "liability", "savings"];
  return (
    <div className="navigation">
      <ul>
        {tabs.map(function (each) {
          return (
            <li key={each}>
              <input
                className={match.params.scene === each ? "active" : "inactive"}
                type="button"
                value={each}
                onClick={() => history.push(`/nav/${each}`)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navigation;
