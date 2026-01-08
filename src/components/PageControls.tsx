import type { PageInfo } from "../models/pageInfo";

interface PageControlsInterface {
  pageInfo: PageInfo;
  totalPages: number;
  pageIncrement: (arg: number) => void;
  setPageInfo: (arg: PageInfo) => void;
}

function PageControls(props: PageControlsInterface) {
  //TODO: write a proper type in the future
  return (
    <div>
      <button
        disabled={props.pageInfo.page <= 0}
        onClick={() => props.pageIncrement(-1)}
      >
        Last
      </button>
      <span>{props.pageInfo.page + 1}</span>
      <button
        disabled={props.pageInfo.page >= props.totalPages - 1}
        onClick={() => props.pageIncrement(1)}
      >
        Next
      </button>

      <label>Page size</label>
      <select
        defaultValue={5}
        onChange={(e) =>
          props.setPageInfo({ ...props.pageInfo, size: Number(e.target.value) })
        }
      >
        <option>2</option>
        <option>5</option>
        <option>10</option>
      </select>
    </div>
  );
}

export default PageControls;
