import { useEffect, useState } from "react";
import { DoGet } from "../helpers/DoGet";
import type { ParcelMachine } from "../models/parcelMachine";

interface ParcelMachineInterface {
  setSelectedPM: (arg: string) => void;
}

function ParcelMachines(props: ParcelMachineInterface) {
  const [parcelMachines, setParcelMachines] = useState<ParcelMachine[]>([]);

  useEffect(() => {
    DoGet(
      import.meta.env.VITE_HOST_URL + `/parcel-machines`,
      1,
      setParcelMachines,
      "GET PARCEL MACHINES: "
    );
  }, []);

  return (
    <div>
      <select
        defaultValue={""}
        onChange={(e) => {
          props.setSelectedPM(e.target.value);
          console.log("selected: " + e.target.value);
        }}
      >
        {parcelMachines.map((machine, index: number) => (
          <option key={index} value={machine.NAME}>
            {machine.NAME}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ParcelMachines;
