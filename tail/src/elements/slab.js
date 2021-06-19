import { View, ControlDrawer } from "../elements/input-fields.js";

const Slab = ({ values }) => {
  return (
    <div class="slab">
      {values.map((each) => {
        if(each.class === "control-drawer-div")
          return (
            <div class={each.class + " content"}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center"
              }}>
              <ControlDrawer actionSet={each.value} />
            </div>
          )
        else
          return (
            <div class={each.class + " content"}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center"
              }}>
              <View value={each.value} />
            </div>
          )
      })}
    </div>
  );
}

export default Slab;