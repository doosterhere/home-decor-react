import {ActiveParamsType} from "./active-params.type";

export interface IActiveParams {
    activeParams: ActiveParamsType;
    setParams: (state: ActiveParamsType | ((prevState: ActiveParamsType) => ActiveParamsType)) => void;
}