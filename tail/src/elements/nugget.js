import { isObject } from "../utils";
const Nugget = ({ nugget }) => {
  const values = []
  for(var key in nugget) {
    values.push({ label: key, value: nugget[key]})
  }
  return (
    <div class="nugget">
      {values.map((each) => {
        return (
          <>
            <div>
              <h5>{each.label}: </h5>
            </div>
            <div>
              {isObject(each.value)
              ? (<span>{each.value.label}</span>)
              : (<span>{each.value}</span>)}
            </div>
          </>
        )
      })}
    </div>
  );
}

export default Nugget;