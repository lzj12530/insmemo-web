type MemoFilterRalation = "AND" | "OR";

interface BaseFilter {
  type: FilterType;
  value: {
    operator: string;
    value: string;
  };
  relation: MemoFilterRalation;
}

interface TagFilter extends BaseFilter {
  type: "TAG";
  value: {
    operator: "CONTAIN" | "NOT_CONTAIN";
    value: string;
  };
}

interface TypeFilter extends BaseFilter {
  type: "TYPE";
  value: {
    operator: "IS" | "IS_NOT";
    value: MemoSpecType;
  };
}

interface TextFilter extends BaseFilter {
  type: "TEXT";
  value: {
    operator: "CONTAIN" | "NOT_CONTAIN";
    value: string;
  };
}
type DateSpecType = "THIS_WEEK" | "THIS_MONTH" | "LAST_MONTH" | "THIS_YEAR" | "TODAY"
interface DateFilter extends BaseFilter {
  type: "DATE";
  value: {
    operator: "CONTAIN" | "NOT_CONTAIN";
    value: DateSpecType;
  }
}
type FilterType = "TEXT" | "TYPE" | "TAG" | "DATE";

type Filter = BaseFilter | TagFilter | TypeFilter | TextFilter;
